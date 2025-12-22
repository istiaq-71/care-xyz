import { ObjectId } from 'mongodb'

// Lazy import to avoid build-time errors
async function getDb() {
  const dbModule = await import('./db')
  const clientPromise = dbModule.default
  const client = await clientPromise
  return client
}

export interface User {
  _id?: ObjectId
  nid?: string
  name: string
  email: string
  contact?: string
  password?: string
  image?: string
  createdAt?: Date
}

export interface Service {
  _id?: ObjectId
  name: string
  nameBn?: string
  description: string
  descriptionBn?: string
  serviceCharge: number
  image?: string
  category: 'baby-care' | 'elderly-care' | 'sick-care'
  createdAt?: Date
}

export interface Booking {
  _id?: ObjectId
  userId: ObjectId | string
  serviceId: ObjectId | string
  serviceName: string
  duration: number
  durationType: 'hours' | 'days'
  location: {
    division: string
    district: string
    city: string
    area: string
    address: string
  }
  totalCost: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt?: Date
  updatedAt?: Date
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const client = await getDb()
  const db = client.db('care')
  return await db.collection<User>('users').findOne({ email })
}

export async function createUser(user: Omit<User, '_id'>): Promise<User> {
  const client = await getDb()
  const db = client.db('care')
  const result = await db.collection<User>('users').insertOne(user as any)
  return { ...user, _id: result.insertedId }
}

export async function getServiceById(id: string): Promise<Service | null> {
  const client = await getDb()
  const db = client.db('care')
  return await db.collection<Service>('services').findOne({ _id: new ObjectId(id) })
}

export async function getAllServices(): Promise<Service[]> {
  const client = await getDb()
  const db = client.db('care')
  return await db.collection<Service>('services').find({}).toArray()
}

export async function createBooking(booking: Omit<Booking, '_id'>): Promise<Booking> {
  const client = await getDb()
  const db = client.db('care')
  const bookingData = {
    ...booking,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  const result = await db.collection<Booking>('bookings').insertOne(bookingData as any)
  return { ...bookingData, _id: result.insertedId }
}

export async function getBookingsByUserId(userId: string): Promise<Booking[]> {
  const client = await getDb()
  const db = client.db('care')
  return await db.collection<Booking>('bookings')
    .find({ userId: new ObjectId(userId) })
    .sort({ createdAt: -1 })
    .toArray()
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const client = await getDb()
  const db = client.db('care')
  return await db.collection<Booking>('bookings').findOne({ _id: new ObjectId(id) })
}

export async function updateBookingStatus(
  id: string,
  status: Booking['status']
): Promise<boolean> {
  const client = await getDb()
  const db = client.db('care')
  const result = await db.collection<Booking>('bookings').updateOne(
    { _id: new ObjectId(id) },
    { $set: { status, updatedAt: new Date() } }
  )
  return result.modifiedCount > 0
}

