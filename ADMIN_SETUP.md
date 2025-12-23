# Admin Panel Setup Guide

## How to Make a User Admin

### Method 1: Using API Route (Recommended for Development)

1. Make sure you have a user account registered
2. Note down the user's email address
3. Call the API endpoint:

```bash
# Using curl
curl -X POST http://localhost:3000/api/admin/make-admin \
  -H "Content-Type: application/json" \
  -d '{"email": "your-email@example.com"}'
```

Or use Postman/Thunder Client:
- Method: POST
- URL: `http://localhost:3000/api/admin/make-admin`
- Body (JSON):
```json
{
  "email": "your-email@example.com"
}
```

### Method 2: Direct Database Update (Advanced)

1. Connect to your MongoDB database
2. Find your user document in the `users` collection
3. Update the document:
```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

## Accessing Admin Panel

1. Make sure you're logged in with an admin account
2. Navigate to: `http://localhost:3000/admin`
3. You'll see:
   - Dashboard with statistics
   - All bookings with payment history
   - Ability to update booking statuses

## Admin Features

- **View All Bookings**: See all bookings from all users
- **Payment History**: View total revenue and payment details
- **Manage Bookings**: Update booking status (Pending → Confirmed → Completed)
- **Statistics**: View total bookings, revenue, and status breakdown

## Security Note

⚠️ In production, you should:
- Protect the `/api/admin/make-admin` route with additional authentication
- Use environment variables to restrict admin creation
- Implement proper role-based access control (RBAC)


