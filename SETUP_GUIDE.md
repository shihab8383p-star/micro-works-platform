# Setup Guide - MicroJob Platform

## Step-by-Step Installation Instructions

### Step 1: Install Prerequisites

#### Install Node.js
1. Go to https://nodejs.org/
2. Download and install the LTS version (v18 or higher)
3. Verify installation:
\`\`\`bash
node --version
npm --version
\`\`\`

#### Install MongoDB
**Option A: Local Installation (Windows)**
1. Go to https://www.mongodb.com/try/download/community
2. Download MongoDB Community Server
3. Install and start MongoDB service
4. Default connection: `mongodb://localhost:27017`

**Option B: MongoDB Atlas (Cloud - Free)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a free cluster
4. Get connection string
5. Update `.env` file with your connection string

### Step 2: Download and Setup Project

1. **Extract project files** to your desired location
2. **Open terminal/command prompt** in project folder
3. **Install dependencies:**
\`\`\`bash
npm install
\`\`\`

### Step 3: Configure Environment

The `.env` file is already created. You can use it as-is for local development, or update:

- `MONGODB_URI` - if using MongoDB Atlas
- `JWT_SECRET` - change to a random string for production
- Payment gateway keys - when you're ready to integrate

### Step 4: Initialize Database

Run the initialization script to create categories and admin user:

\`\`\`bash
npm run init-db
\`\`\`

You should see:
\`\`\`
MongoDB Connected
✓ Categories initialized
✓ Admin user created (email: admin@example.com, password: admin123)
✓ Database initialization complete!
\`\`\`

### Step 5: Start the Server

**Development mode (with auto-reload):**
\`\`\`bash
npm run dev
\`\`\`

**Production mode:**
\`\`\`bash
npm start
\`\`\`

You should see:
\`\`\`
MongoDB Connected: localhost
Server running on port 5000
\`\`\`

### Step 6: Access the Platform

Open your web browser and go to:
\`\`\`
http://localhost:5000
\`\`\`

### Step 7: Test the Platform

1. **Homepage** - View features and categories
2. **Sign Up** - Create a worker account
3. **Browse Jobs** - View available jobs
4. **Login as Admin:**
   - Email: `admin@example.com`
   - Password: `admin123`
5. **Create Employer Account** - Sign up again with employer role
6. **Post a Job** - As employer, post a test job
7. **Apply for Job** - As worker, apply for the job
8. **Manage Applications** - As employer, review applications

## Adding Your Microjob Links

### Method 1: Manual Entry (Recommended for Small Numbers)
1. Login as employer
2. Go to Dashboard
3. Click "Post New Job"
4. Fill in job details
5. Submit

### Method 2: Bulk Import via API (For Many Jobs)

Create a file `import-jobs.js`:

\`\`\`javascript
require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('./models/Job');

const jobs = [
  {
    title: "Facebook Page Like",
    description: "Like our Facebook page and provide screenshot",
    category: "social-media-category-id", // Get from database
    employer: "your-employer-user-id", // Get from database
    price: 5,
    maxWorkers: 100,
    duration: "1 hour",
    requirements: "Must have Facebook account"
  },
  // Add more jobs...
];

async function importJobs() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Job.insertMany(jobs);
  console.log('Jobs imported!');
  process.exit(0);
}

importJobs();
\`\`\`

Run: `node import-jobs.js`

### Method 3: API Endpoint (Programmatic)

Use the API endpoint with your employer token:

\`\`\`javascript
fetch('http://localhost:5000/api/jobs', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_EMPLOYER_JWT_TOKEN'
  },
  body: JSON.stringify({
    title: "Your Job Title",
    category: "category-id",
    description: "Job description",
    price: 100,
    maxWorkers: 10,
    duration: "1-3 days",
    requirements: "Requirements here"
  })
});
\`\`\`

## Common Issues and Solutions

### Issue: "npm: command not found"
**Solution:** Install Node.js from https://nodejs.org/

### Issue: "MongoDB connection failed"
**Solution:** 
- Make sure MongoDB is running
- Check MONGODB_URI in .env file
- Use MongoDB Atlas if local installation fails

### Issue: "Port 5000 already in use"
**Solution:** 
- Change PORT in .env to 3000 or another available port
- Or stop the process using port 5000

### Issue: "Cannot find module"
**Solution:** Run `npm install` again

### Issue: "JWT malformed"
**Solution:** 
- Clear browser localStorage
- Login again

## Getting Category IDs

To get category IDs for job posting:

1. **Via Browser:**
   - Go to http://localhost:5000/api/categories
   - Copy the `_id` of desired category

2. **Via MongoDB Compass:**
   - Connect to your database
   - Browse `categories` collection
   - Copy `_id` field

## Payment Gateway Integration

### bKash Integration (Bangladesh)
1. Sign up for bKash merchant account
2. Get API credentials (API Key, API Secret)
3. Add to .env file
4. Update `controllers/withdrawalController.js` with bKash SDK

### Nagad Integration
1. Contact Nagad for merchant account
2. Get API credentials
3. Follow similar process as bKash

### Rocket Integration
1. Contact Dutch-Bangla Bank for Rocket merchant
2. Get API credentials
3. Integrate as per their documentation

## Production Deployment

### Heroku Deployment
\`\`\`bash
# Install Heroku CLI
heroku login
heroku create your-app-name
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=random_secret_here
git push heroku main
heroku open
\`\`\`

### DigitalOcean/VPS Deployment
1. Get a VPS server
2. Install Node.js and MongoDB
3. Clone repository
4. Set up nginx as reverse proxy
5. Use PM2 to run Node.js app
6. Set up SSL with Let's Encrypt

## Support

If you encounter any issues:
1. Check the error message in terminal
2. Review the setup steps
3. Check if MongoDB is running
4. Verify .env configuration
5. Try deleting node_modules and running `npm install` again

## Next Steps

After setup is complete:
1. Customize the design (edit `public/css/style.css`)
2. Add your logo and branding
3. Configure payment gateways
4. Add your microjob links
5. Test all features thoroughly
6. Deploy to production
7. Set up domain name and SSL

**Congratulations! Your microjob platform is ready! 🎉**
