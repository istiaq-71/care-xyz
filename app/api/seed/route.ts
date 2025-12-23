import { NextResponse } from 'next/server'
import { Service } from '@/lib/models'

export const dynamic = 'force-dynamic'

// This is a utility route to seed initial services
// You can call this once to populate your database
export async function GET() {
  try {
    // Check MongoDB URI
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { 
          error: 'MONGODB_URI is not configured',
          message: 'Please set MONGODB_URI in your .env.local file'
        },
        { status: 500 }
      )
    }

    const { default: clientPromise } = await import('@/lib/db')
    const client = await clientPromise
    const db = client.db('care')
    const servicesCollection = db.collection<Service>('services')

    // Always update services with images
    const existingServices = await servicesCollection.countDocuments()
    
    const services: Omit<Service, '_id'>[] = [
      {
        name: 'Baby Care',
        nameBn: 'শিশু যত্ন',
        description: 'Professional babysitting services for your children. Experienced and caring babysitters available for day and night care.',
        descriptionBn: 'আপনার সন্তানদের জন্য পেশাদার বেবিসিটারিং সেবা। দিন ও রাতের যত্নের জন্য অভিজ্ঞ এবং যত্নশীল বেবিসিটার উপলব্ধ।',
        serviceCharge: 500,
        image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop',
        category: 'baby-care',
        createdAt: new Date(),
      },
      {
        name: 'Elderly Care',
        nameBn: 'বৃদ্ধ যত্ন',
        description: 'Compassionate care services for elderly family members. Trained caregivers for daily assistance, medication management, and companionship.',
        descriptionBn: 'বৃদ্ধ পরিবারের সদস্যদের জন্য সহানুভূতিশীল যত্ন সেবা। দৈনন্দিন সহায়তা, ওষুধ ব্যবস্থাপনা এবং সঙ্গের জন্য প্রশিক্ষিত যত্নকারী।',
        serviceCharge: 800,
        image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop',
        category: 'elderly-care',
        createdAt: new Date(),
      },
      {
        name: 'Special Care',
        nameBn: 'বিশেষ যত্ন',
        description: 'Specialized care services for sick or disabled family members. Medical assistance, physical therapy support, and round-the-clock care available.',
        descriptionBn: 'অসুস্থ বা প্রতিবন্ধী পরিবারের সদস্যদের জন্য বিশেষায়িত যত্ন সেবা। চিকিৎসা সহায়তা, ফিজিওথেরাপি সহায়তা এবং চব্বিশ ঘণ্টা যত্ন উপলব্ধ।',
        serviceCharge: 1000,
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
        category: 'sick-care',
        createdAt: new Date(),
      },
    ]

    if (existingServices > 0) {
      // Update existing services with images
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
          },
          { upsert: false }
        )
        if (result.modifiedCount > 0) updated++
      }
      return NextResponse.json({ 
        success: true,
        message: 'Services updated with images', 
        existing: existingServices,
        updated: updated 
      })
    }

    // Insert new services
    await servicesCollection.insertMany(services as any)

    return NextResponse.json({ 
      success: true,
      message: 'Services seeded successfully', 
      count: services.length 
    })
  } catch (error: any) {
    console.error('Error seeding services:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        message: error?.message || 'Unknown error',
        details: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      },
      { status: 500 }
    )
  }
}
