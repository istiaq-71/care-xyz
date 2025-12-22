import { NextResponse } from 'next/server'
import { getServiceById } from '@/lib/models'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const service = await getServiceById(id)
    
    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(service)
  } catch (error: any) {
    console.error('Error fetching service:', error)
    console.error('Error details:', {
      message: error?.message,
      name: error?.name,
      code: error?.code,
      stack: error?.stack,
    })
    
    const errorMessage = process.env.NODE_ENV === 'development'
      ? `Error: ${error?.message || 'Internal server error'}`
      : 'Internal server error'
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? {
          name: error?.name,
          code: error?.code,
        } : undefined,
      },
      { status: 500 }
    )
  }
}

