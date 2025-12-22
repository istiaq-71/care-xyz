import { NextResponse } from 'next/server'
import clientPromise from '@/lib/db'
import { Service } from '@/lib/models'

export const dynamic = 'force-dynamic'

// This is a utility route to seed initial services
// You can call this once to populate your database
export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('care')
    const servicesCollection = db.collection<Service>('services')

    // Check if services already exist
    const existingServices = await servicesCollection.countDocuments()
    if (existingServices > 0) {
      return NextResponse.json({ message: 'Services already exist' })
    }

    const services: Omit<Service, '_id'>[] = [
      {
        name: 'Baby Care',
        nameBn: 'শিশু যত্ন',
        description: 'Professional babysitting services for your children. Experienced and caring babysitters available for day and night care.',
        descriptionBn: 'আপনার সন্তানদের জন্য পেশাদার বেবিসিটারিং সেবা। দিন ও রাতের যত্নের জন্য অভিজ্ঞ এবং যত্নশীল বেবিসিটার উপলব্ধ।',
        serviceCharge: 500,
        category: 'baby-care',
        createdAt: new Date(),
      },
      {
        name: 'Elderly Care',
        nameBn: 'বৃদ্ধ যত্ন',
        description: 'Compassionate care services for elderly family members. Trained caregivers for daily assistance, medication management, and companionship.',
        descriptionBn: 'বৃদ্ধ পরিবারের সদস্যদের জন্য সহানুভূতিশীল যত্ন সেবা। দৈনন্দিন সহায়তা, ওষুধ ব্যবস্থাপনা এবং সঙ্গের জন্য প্রশিক্ষিত যত্নকারী।',
        serviceCharge: 800,
        category: 'elderly-care',
        createdAt: new Date(),
      },
      {
        name: 'Special Care',
        nameBn: 'বিশেষ যত্ন',
        description: 'Specialized care services for sick or disabled family members. Medical assistance, physical therapy support, and round-the-clock care available.',
        descriptionBn: 'অসুস্থ বা প্রতিবন্ধী পরিবারের সদস্যদের জন্য বিশেষায়িত যত্ন সেবা। চিকিৎসা সহায়তা, ফিজিওথেরাপি সহায়তা এবং চব্বিশ ঘণ্টা যত্ন উপলব্ধ।',
        serviceCharge: 1000,
        category: 'sick-care',
        createdAt: new Date(),
      },
    ]

    await servicesCollection.insertMany(services as any)

    return NextResponse.json({ message: 'Services seeded successfully', count: services.length })
  } catch (error) {
    console.error('Error seeding services:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

