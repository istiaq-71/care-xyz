import { NextResponse } from 'next/server'
import { getServiceById } from '@/lib/models'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const service = await getServiceById(params.id)
    
    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(service)
  } catch (error) {
    console.error('Error fetching service:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

