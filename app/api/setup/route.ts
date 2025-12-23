import { NextResponse } from 'next/server'
import { getAllServices, getUserByEmail } from '@/lib/models'
import clientPromise from '@/lib/db'

export const dynamic = 'force-dynamic'

// This route helps with initial setup:
// 1. Seeds services with images
// 2. Makes first user admin (if no admin exists)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const makeAdmin = searchParams.get('makeAdmin') === 'true'

    const client = await clientPromise
    const db = client.db('care')
    
    const results: any = {
      services: {},
      admin: {},
    }

    // 1. Update services with images
    const servicesCollection = db.collection('services')
    const services = [
      {
        name: 'Baby Care',
        image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop',
        serviceCharge: 500,
        description: 'Professional babysitting services for your children. Experienced and caring babysitters available for day and night care.',
        descriptionBn: 'আপনার সন্তানদের জন্য পেশাদার বেবিসিটারিং সেবা। দিন ও রাতের যত্নের জন্য অভিজ্ঞ এবং যত্নশীল বেবিসিটার উপলব্ধ।',
      },
      {
        name: 'Elderly Care',
        image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop',
        serviceCharge: 800,
        description: 'Compassionate care services for elderly family members. Trained caregivers for daily assistance, medication management, and companionship.',
        descriptionBn: 'বৃদ্ধ পরিবারের সদস্যদের জন্য সহানুভূতিশীল যত্ন সেবা। দৈনন্দিন সহায়তা, ওষুধ ব্যবস্থাপনা এবং সঙ্গের জন্য প্রশিক্ষিত যত্নকারী।',
      },
      {
        name: 'Special Care',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
        serviceCharge: 1000,
        description: 'Specialized care services for sick or disabled family members. Medical assistance, physical therapy support, and round-the-clock care available.',
        descriptionBn: 'অসুস্থ বা প্রতিবন্ধী পরিবারের সদস্যদের জন্য বিশেষায়িত যত্ন সেবা। চিকিৎসা সহায়তা, ফিজিওথেরাপি সহায়তা এবং চব্বিশ ঘণ্টা যত্ন উপলব্ধ।',
      },
    ]

    let updated = 0
    for (const service of services) {
      const result = await servicesCollection.updateOne(
        { name: service.name },
        { 
          $set: { 
            image: service.image,
            serviceCharge: service.serviceCharge,
            description: service.description,
            descriptionBn: service.descriptionBn,
          } 
        }
      )
      if (result.modifiedCount > 0) updated++
    }

    const totalServices = await servicesCollection.countDocuments()
    results.services = {
      total: totalServices,
      updated: updated,
      message: updated > 0 ? 'Services updated with images' : 'All services already have images',
    }

    // 2. Make user admin if requested
    if (makeAdmin && email) {
      const usersCollection = db.collection('users')
      
      // Check admin password if provided
      const adminPassword = searchParams.get('adminPassword')
      const requiredPassword = process.env.ADMIN_PASSWORD || 'admin123'
      
      if (adminPassword && adminPassword !== requiredPassword) {
        results.admin = {
          message: 'Invalid admin password',
          error: true,
        }
      } else {
        // Check if any admin exists
        const existingAdmin = await usersCollection.findOne({ role: 'admin' })
        
        if (existingAdmin) {
          results.admin = {
            message: 'Admin already exists',
            existingAdminEmail: existingAdmin.email,
          }
        } else {
          const user = await getUserByEmail(email)
          if (user) {
            await usersCollection.updateOne(
              { email },
              { $set: { role: 'admin' } }
            )
            results.admin = {
              message: 'User is now admin',
              email: email,
            }
          } else {
            results.admin = {
              message: 'User not found',
              email: email,
            }
          }
        }
      }
    } else if (makeAdmin) {
      results.admin = {
        message: 'Email parameter required for makeAdmin',
      }
    }

    return NextResponse.json({
      success: true,
      ...results,
      message: 'Setup completed successfully',
    })
  } catch (error: any) {
    console.error('Setup error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        details: error.message 
      },
      { status: 500 }
    )
  }
}


