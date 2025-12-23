import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
import { getUserByEmail, createUser } from './models'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null
          }

          const user = await getUserByEmail(credentials.email)
          if (!user || !user.password) {
            return null
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
          if (!isPasswordValid) {
            return null
          }

          return {
            id: user._id?.toString() || '',
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role || 'user',
          }
        } catch (error) {
          console.error('Authorization error:', error)
          return null
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === 'google') {
          const existingUser = await getUserByEmail(user.email || '')
          if (!existingUser) {
            await createUser({
              name: user.name || '',
              email: user.email || '',
              image: user.image || undefined,
            })
          }
        }
        return true
      } catch (error) {
        console.error('SignIn callback error:', error)
        // Don't block sign in if database error occurs
        return true
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role || 'user'
      }
      return token
    },
    async session({ session, token }) {
      try {
        if (session.user && token) {
          session.user.id = token.id as string
          session.user.role = (token.role as string) || 'user'
          try {
            const user = await getUserByEmail(session.user.email || '')
            if (user) {
              session.user.id = user._id?.toString() || ''
              session.user.role = user.role || 'user'
            }
          } catch (error) {
            console.error('Error fetching user in session callback:', error)
            // Keep the token id if database lookup fails
          }
        }
        return session
      } catch (error) {
        console.error('Session callback error:', error)
        return session
      }
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-key-change-in-production',
  debug: process.env.NODE_ENV === 'development',
}

