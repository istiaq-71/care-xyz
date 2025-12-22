import nodemailer from 'nodemailer'
import { Booking, Service } from './models'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendBookingInvoice(
  userEmail: string,
  userName: string,
  booking: Booking,
  service: Service
) {
  const durationText = booking.durationType === 'hours' 
    ? `${booking.duration} hours` 
    : `${booking.duration} days`

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0ea5e9; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9fafb; }
        .invoice-details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
        .total { font-size: 20px; font-weight: bold; color: #0ea5e9; margin-top: 10px; }
        .footer { text-align: center; padding: 20px; color: #6b7280; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Care.xyz - Booking Invoice</h1>
        </div>
        <div class="content">
          <p>Dear ${userName},</p>
          <p>Thank you for booking with Care.xyz! Your booking has been received and is currently <strong>${booking.status.toUpperCase()}</strong>.</p>
          
          <div class="invoice-details">
            <h2>Booking Details</h2>
            <div class="detail-row">
              <span><strong>Service:</strong></span>
              <span>${service.name}</span>
            </div>
            <div class="detail-row">
              <span><strong>Duration:</strong></span>
              <span>${durationText}</span>
            </div>
            <div class="detail-row">
              <span><strong>Location:</strong></span>
              <span>${booking.location.area}, ${booking.location.city}, ${booking.location.district}</span>
            </div>
            <div class="detail-row">
              <span><strong>Address:</strong></span>
              <span>${booking.location.address}</span>
            </div>
            <div class="detail-row">
              <span><strong>Service Charge:</strong></span>
              <span>৳${service.serviceCharge}/${booking.durationType === 'hours' ? 'hour' : 'day'}</span>
            </div>
            <div class="total">
              <span>Total Cost: ৳${booking.totalCost}</span>
            </div>
          </div>
          
          <p>We will contact you shortly to confirm your booking. You can track your booking status in your account.</p>
        </div>
        <div class="footer">
          <p>© 2024 Care.xyz - Trusted Care Services</p>
          <p>This is an automated email. Please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
  `

  const mailOptions = {
    from: `Care.xyz <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: `Booking Confirmation - ${service.name} | Care.xyz`,
    html: htmlContent,
  }

  try {
    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}

