# MicroJob Platform - Complete Freelance Marketplace

A full-featured microjob/freelance marketplace platform similar to kajpoka.com, built with Node.js, Express, MongoDB, and vanilla JavaScript.

## 🌟 Features

### For Workers
- Browse thousands of microjobs across 19+ categories
- Apply for jobs with one click
- Submit completed work
- Track earnings and completed jobs
- Withdraw money via bKash, Nagad, Rocket
- View transaction history
- Rating system

### For Employers
- Post unlimited jobs
- Manage job applications
- Review and approve submitted work
- Pay workers automatically
- Track spending and active jobs
- Rating and review system

### For Admins
- Manage all users and jobs
- Process withdrawal requests
- View platform statistics
- Manage job categories
- Monitor transactions

### General Features
- User authentication with JWT
- Role-based access control (Worker, Employer, Admin)
- Responsive design for mobile and desktop
- Real-time job search and filtering
- Pagination for all listings
- Secure payment processing structure
- Email notifications (configurable)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
\`\`\`bash
git clone <repository-url>
cd microjob-platform
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Configure environment variables**
\`\`\`bash
cp .env.example .env
\`\`\`

Edit `.env` file and set your values:
\`\`\`env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/microjob-platform
JWT_SECRET=your_super_secret_jwt_key_here
\`\`\`

4. **Initialize the database**
\`\`\`bash
npm run init-db
\`\`\`

This will:
- Create 19 job categories
- Create an admin user (admin@example.com / admin123)

5. **Start the server**
\`\`\`bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
\`\`\`

6. **Open your browser**
\`\`\`
http://localhost:5000
\`\`\`

## 📁 Project Structure

\`\`\`
microjob-platform/
├── config/
│   ├── database.js          # MongoDB connection
│   └── initDatabase.js      # Database initialization script
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── jobController.js     # Job management
│   ├── applicationController.js  # Job applications
│   ├── categoryController.js     # Categories
│   ├── withdrawalController.js   # Withdrawals
│   └── transactionController.js  # Transactions
├── middleware/
│   ├── auth.js              # JWT authentication
│   └── errorHandler.js      # Error handling
├── models/
│   ├── User.js              # User schema
│   ├── Job.js               # Job schema
│   ├── Application.js       # Application schema
│   ├── Category.js          # Category schema
│   ├── Transaction.js       # Transaction schema
│   └── Withdrawal.js        # Withdrawal schema
├── public/
│   ├── css/
│   │   └── style.css        # Main stylesheet
│   ├── js/
│   │   ├── config.js        # API configuration
│   │   └── dashboard.js     # Dashboard logic
│   ├── index.html           # Homepage
│   ├── jobs.html            # Job listings
│   ├── dashboard.html       # User dashboard
│   ├── login.html           # Login page
│   ├── register.html        # Registration page
│   └── admin-withdrawals.html  # Admin withdrawal management
├── routes/
│   ├── auth.js              # Auth routes
│   ├── jobs.js              # Job routes
│   ├── applications.js      # Application routes
│   ├── categories.js        # Category routes
│   ├── withdrawals.js       # Withdrawal routes
│   └── transactions.js      # Transaction routes
├── .env.example             # Environment variables template
├── .gitignore
├── package.json
├── README.md
└── server.js                # Main server file
\`\`\`

## 🔐 Default Login Credentials

**Admin Account:**
- Email: admin@example.com
- Password: admin123

**Worker/Employer Accounts:**
- Create new accounts via the Sign Up page

## 📊 Database Schema

### Users
- Authentication and profile information
- Balance and earnings tracking
- Rating and review system
- Role-based access (worker, employer, admin)

### Jobs
- Title, description, category
- Price, duration, requirements
- Worker limits and current count
- Status tracking (active, paused, completed)

### Applications
- Job-worker relationship
- Status tracking (pending, accepted, submitted, completed)
- Work submission and review
- Payment processing

### Transactions
- Complete transaction history
- Multiple transaction types (earning, withdrawal, payment, etc.)
- Balance tracking

### Withdrawals
- Withdrawal requests
- Payment method details (bKash, Nagad, Rocket)
- Processing status and admin approval

### Categories
- 19 pre-configured job categories
- Job count tracking
- Icon and description support

## 🛠️ API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login
- GET `/api/auth/me` - Get current user
- PUT `/api/auth/profile` - Update profile
- PUT `/api/auth/change-password` - Change password

### Jobs
- GET `/api/jobs` - Get all jobs (with filters)
- GET `/api/jobs/:id` - Get single job
- POST `/api/jobs` - Create job (employer/admin)
- PUT `/api/jobs/:id` - Update job
- DELETE `/api/jobs/:id` - Delete job
- GET `/api/jobs/my-jobs` - Get my posted jobs

### Applications
- POST `/api/applications` - Apply for job
- GET `/api/applications/my-applications` - Get my applications
- GET `/api/applications/job/:jobId` - Get job applications
- PUT `/api/applications/:id/status` - Accept/reject application
- PUT `/api/applications/:id/submit` - Submit work
- PUT `/api/applications/:id/review` - Review and complete

### Categories
- GET `/api/categories` - Get all categories
- GET `/api/categories/:slug` - Get single category
- POST `/api/categories` - Create category (admin)
- PUT `/api/categories/:id` - Update category (admin)
- DELETE `/api/categories/:id` - Delete category (admin)

### Withdrawals
- POST `/api/withdrawals` - Request withdrawal
- GET `/api/withdrawals/my-withdrawals` - Get my withdrawals
- GET `/api/withdrawals` - Get all withdrawals (admin)
- PUT `/api/withdrawals/:id/process` - Process withdrawal (admin)

### Transactions
- GET `/api/transactions` - Get my transactions
- GET `/api/transactions/all` - Get all transactions (admin)

## 🎨 Customization

### Adding Your Microjob Links

To add your microjob links, you can either:

1. **Manual Entry:** Login as employer and post jobs through the dashboard
2. **Bulk Import:** Create a script to import jobs via the API
3. **Database Seed:** Modify `config/initDatabase.js` to include your jobs

Example bulk import script:
\`\`\`javascript
const jobs = [
  {
    title: "Your Job Title",
    description: "Job description",
    category: "category_id_here",
    price: 100,
    // ... other fields
  }
];

// Use POST /api/jobs endpoint for each job
\`\`\`

### Changing Colors and Styling

Edit `public/css/style.css` and modify the CSS variables:
\`\`\`css
:root {
  --primary-color: #4f46e5;  /* Change primary color */
  --secondary-color: #06b6d4; /* Change secondary color */
  /* ... other variables */
}
\`\`\`

### Payment Gateway Integration

To integrate real payment gateways (bKash, Nagad, Rocket):

1. Get API credentials from the payment gateway
2. Add credentials to `.env` file
3. Update withdrawal processing in `controllers/withdrawalController.js`
4. Implement the payment gateway SDK calls

## 📱 Mobile Responsiveness

The platform is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (below 768px)

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Input validation
- XSS protection
- SQL injection prevention (NoSQL)
- CORS configuration

## 🚀 Deployment

### Deploy to Production

1. **Set up MongoDB Atlas** (free tier available)
2. **Update environment variables** for production
3. **Deploy to hosting service** (Heroku, DigitalOcean, AWS, etc.)

Example for Heroku:
\`\`\`bash
# Install Heroku CLI
heroku create your-app-name
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
git push heroku main
\`\`\`

## 📈 Future Enhancements

- Real-time notifications with Socket.io
- Advanced search with Elasticsearch
- File upload for proof of work
- Chat system between workers and employers
- Email notifications
- SMS notifications (for Bangladesh)
- Advanced analytics dashboard
- Mobile apps (React Native)
- API rate limiting
- Two-factor authentication

## 🤝 Support

For support, email support@microjob.com or create an issue in the repository.

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🙏 Credits

Inspired by kajpoka.com and other popular freelance marketplaces.

---

**Happy Earning! 💰**
