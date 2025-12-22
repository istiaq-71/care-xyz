# Care.xyz - Baby Sitting & Elderly Care Service Platform

A modern web application for booking reliable and trusted care services for children, elderly, and other family members.

## Features

- 🔐 User Authentication (Email/Password + Google OAuth)
- 📅 Dynamic Booking System with Duration & Location Selection
- 💰 Automatic Cost Calculation
- 📊 Booking Status Tracking (Pending/Confirmed/Completed/Cancelled)
- 📧 Email Invoice on Booking
- 📱 Fully Responsive Design
- 🎨 Modern UI/UX

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (or MongoDB Atlas)
- Email service credentials (Gmail or other SMTP)
- Google OAuth credentials (for social login)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd care
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Stripe (Optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
care/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── (auth)/            # Authentication pages
│   ├── booking/           # Booking pages
│   ├── service/           # Service detail pages
│   └── my-bookings/       # User bookings page
├── components/            # Reusable components
├── lib/                   # Utility functions
├── types/                 # TypeScript types
└── public/                # Static assets
```

## Key Pages

- `/` - Homepage
- `/login` - Login page
- `/register` - Registration page
- `/service/[id]` - Service detail page
- `/booking/[id]` - Booking page (Private)
- `/my-bookings` - My bookings page (Private)

## Technologies Used

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- NextAuth.js
- MongoDB
- Nodemailer
- React Hook Form
- Zod

## Deployment

The application can be deployed on Vercel, Netlify, or any Node.js hosting platform.

## License

MIT

