require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/withdrawals', require('./routes/withdrawals'));
app.use('/api/transactions', require('./routes/transactions'));

// One-time setup endpoints (for deployment initialization)
app.get('/api/setup/init-db', async (req, res) => {
  try {
    const User = require('./models/User');
    const Category = require('./models/Category');
    
    // Check if already initialized
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (adminExists) {
      return res.json({ success: true, message: 'Database already initialized!' });
    }
    
    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin123',
      phone: '01700000000',
      role: 'admin',
      balance: 1000,
      isVerified: true
    });
    
    // Create category
    const category = await Category.create({
      name: 'Daily Tasks',
      slug: 'daily-tasks',
      description: 'Complete daily tasks and earn money - New tasks every day!',
      icon: '📅',
      isActive: true,
      jobCount: 0
    });
    
    res.json({ 
      success: true, 
      message: 'Database initialized successfully!',
      admin: { email: admin.email, password: 'admin123' },
      category: category.name
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/setup/seed-jobs', async (req, res) => {
  try {
    const Job = require('./models/Job');
    const Category = require('./models/Category');
    const User = require('./models/User');
    
    // Check if jobs already exist
    const existingJobs = await Job.countDocuments();
    if (existingJobs > 0) {
      return res.json({ 
        success: true, 
        message: `Database already has ${existingJobs} jobs!`,
        totalJobs: existingJobs
      });
    }
    
    // Get admin and category
    const admin = await User.findOne({ role: 'admin' });
    let category = await Category.findOne({ name: 'Daily Tasks' });
    
    if (!admin) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please run /api/setup/init-db first!' 
      });
    }

    // Create category if it doesn't exist
    if (!category) {
      category = await Category.create({
        name: 'Daily Tasks',
        slug: 'daily-tasks',
        description: 'Complete daily tasks and earn money',
        icon: '📅',
        isActive: true,
        jobCount: 0
      });
    }
    
    // Define jobs data directly
    const jobsByDay = {
      day1: [
        { url: 'https://oatstuckalfred.com/pgghjpvahq?key=b54923b02bad9ca5d730e2f7fcf10256', title: 'Complete Quick Survey #1', price: 7 },
        { url: 'https://oatstuckalfred.com/b1k0d8tddz?key=63f2065791683072cc66284d81040d48', title: 'View Sponsored Content #2', price: 5 },
        { url: 'https://oatstuckalfred.com/dezve607v?key=dae92055ba934a0b1f1ae2bbf3fce04b', title: 'Sign Up to Platform #3', price: 10 },
        { url: 'https://oatstuckalfred.com/dg9iw5tsi?key=9162bc93e5de0dd48e6b1ff9a528b9bf', title: 'Complete Registration #4', price: 8 },
        { url: 'https://oatstuckalfred.com/s9qy86wuv?key=5866d801ba0b0d1939d8ea5291b950b2', title: 'Visit Partner Site #5', price: 6 },
        { url: 'https://oatstuckalfred.com/ehdpwzd6d?key=9144e2cfb748f43ed5f5dd9a5abe6515', title: 'View Advertisement #6', price: 5 },
        { url: 'https://oatstuckalfred.com/seqfpnze?key=0a1b7a741eed1ebc9c4ebfb5f40cf22b', title: 'Complete Offer #7', price: 9 },
        { url: 'https://oatstuckalfred.com/atyif8gaj?key=cb8ed3d99895db00fba72f8fd966ea82', title: 'Sign Up & Verify #8', price: 10 },
        { url: 'https://oatstuckalfred.com/b17n6rap?key=295811eb8b88a8d25a1a5deaee5c99c6', title: 'Visit Sponsored Page #9', price: 6 },
        { url: 'https://oatstuckalfred.com/drzf5dy91y?key=6909a80cfc1e2bcdd6c991aa2833ed10', title: 'Complete Quick Task #10', price: 7 },
        { url: 'https://oatstuckalfred.com/nxmrwrjs?key=fa537072a3815a9bec380af2583f1e4c', title: 'View Partner Offer #11', price: 8 },
        { url: 'https://oatstuckalfred.com/jxbuk1vh8?key=e6ef7a45cdb8eef24a13ec59c744bd8d', title: 'Sign Up Bonus #12', price: 9 },
        { url: 'https://oatstuckalfred.com/ktbrc64dws?key=401d80d2a5aeca9e75df30db85697bd4', title: 'Complete Registration Form #13', price: 10 },
        { url: 'https://oatstuckalfred.com/x8eah0ndk?key=e49738daa6b9f712cd3d8168bae63a48', title: 'Visit & Stay 10 Seconds #14', price: 5 },
        { url: 'https://oatstuckalfred.com/mg54f0a09i?key=5ca855f37a2473501cb3cb9553a7b6f5', title: 'View Sponsored Ad #15', price: 7 },
        { url: 'https://oatstuckalfred.com/j0q3a31b?key=f3f1645a5d2708cbea7f2621e20b905e', title: 'Complete Simple Survey #16', price: 8 },
        { url: 'https://oatstuckalfred.com/j0q3a31b?key=f3f1645a5d2708cbea7f2621e20b905e', title: 'Quick Sign Up Task #17', price: 6 },
        { url: 'https://oatstuckalfred.com/tcqpm5v0?key=d086697f9bf74759986636de80c07a7c', title: 'Visit Partner Website #18', price: 9 },
        { url: 'https://oatstuckalfred.com/ssnsfvrn?key=f6331be8ccd9f81b65881a997303784c', title: 'Complete Offer Page #19', price: 10 },
        { url: 'https://oatstuckalfred.com/pgghjpvahq?key=b54923b02bad9ca5d730e2f7fcf10256', title: 'Easy Registration #20', price: 7 }
      ],
      day2: [
        { url: 'https://oatstuckalfred.com/veexw05vi8?key=2f182b2b209afa7e55578cb3ef97a842', title: 'Premium Survey Task #21', price: 8 },
        { url: 'https://oatstuckalfred.com/a7hv3uiiwu?key=2fe7a610094c1357597abbe00d622619', title: 'Register on Rewards Site #22', price: 7 },
        { url: 'https://oatstuckalfred.com/ngxhacpwi9?key=0ae1a954689a7d2cf6f8673e4b538c71', title: 'Complete Partner Signup #23', price: 9 },
        { url: 'https://oatstuckalfred.com/wjbry3kg3e?key=374c42b88902ead82ed9e03241046a09', title: 'Join Affiliate Network #24', price: 6 },
        { url: 'https://oatstuckalfred.com/kz1j8b5my?key=89b0c12d2684a58b841c16caca573f78', title: 'Special Offer Registration #25', price: 10 },
        { url: 'https://oatstuckalfred.com/pyerzgmv90?key=830a7905bfd5a58a8839639451bac300', title: 'Quick Cash Task #26', price: 8 },
        { url: 'https://oatstuckalfred.com/q4eynhey?key=d6aa29a0dca97a18e1b12f0a6cfa59a2', title: 'Visit Premium Site #27', price: 7 },
        { url: 'https://oatstuckalfred.com/qngwdi6178?key=e17eb4f986cf8c18327cfdf206246ca8', title: 'Complete Easy Survey #28', price: 5 },
        { url: 'https://oatstuckalfred.com/sp5bcwr5cm?key=f43fbeb8cb051f745a2434c9a165fcbb', title: 'Partner Platform Signup #29', price: 9 },
        { url: 'https://oatstuckalfred.com/v6kwpkhkng?key=fdd0f8f9d35088d96920de3a9d93c4ca', title: 'View Sponsored Content #30', price: 6 },
        { url: 'https://oatstuckalfred.com/qqx0hqyyq?key=3db7eb25b180efca39eda55bbcbe8fda', title: 'Register & Earn #31', price: 8 },
        { url: 'https://oatstuckalfred.com/kxqiiwd4t?key=535f235d8b45edff32f536792aed8afb', title: 'Complete Online Form #32', price: 7 },
        { url: 'https://oatstuckalfred.com/rtuz48zm?key=45b8e60265a8f0189a3c869d0dad2fa9', title: 'Quick Signup Bonus #33', price: 10 },
        { url: 'https://oatstuckalfred.com/xighsptb6j?key=dff7a2bf3f4172a6ae3a9fd934b4e9a7', title: 'Visit Partner Network #34', price: 6 },
        { url: 'https://oatstuckalfred.com/ze4j7ir73?key=aaed0edb5194db8f0b76a0a0f13eaf8b', title: 'Complete Registration #35', price: 8 }
      ],
      day3: [
        { url: 'https://oatstuckalfred.com/yri3yiy3s9?key=bc7427773d6987eed590f78a719b58ee', title: 'Premium Offer Task #36', price: 9 },
        { url: 'https://oatstuckalfred.com/tzetzusy9?key=3074afee8f823787b93ccf1b0faf6738', title: 'Register on Survey Site #37', price: 7 },
        { url: 'https://oatstuckalfred.com/h9shmd7iz?key=211a5b5c71efbc3d80cbc2e23902b425', title: 'Complete Quick Offer #38', price: 8 },
        { url: 'https://oatstuckalfred.com/h9shmd7iz?key=211a5b5c71efbc3d80cbc2e23902b425', title: 'Partner Site Visit #39', price: 6 },
        { url: 'https://oatstuckalfred.com/h9shmd7iz?key=211a5b5c71efbc3d80cbc2e23902b425', title: 'Sign Up Task #40', price: 10 },
        { url: 'https://oatstuckalfred.com/h9shmd7iz?key=211a5b5c71efbc3d80cbc2e23902b425', title: 'Complete Survey #41', price: 7 },
        { url: 'https://oatstuckalfred.com/h9shmd7iz?key=211a5b5c71efbc3d80cbc2e23902b425', title: 'View Ads #42', price: 5 },
        { url: 'https://oatstuckalfred.com/h9shmd7iz?key=211a5b5c71efbc3d80cbc2e23902b425', title: 'Registration Bonus #43', price: 9 },
        { url: 'https://oatstuckalfred.com/h9shmd7iz?key=211a5b5c71efbc3d80cbc2e23902b425', title: 'Quick Task #44', price: 8 },
        { url: 'https://oatstuckalfred.com/h9shmd7iz?key=211a5b5c71efbc3d80cbc2e23902b425', title: 'Sponsored Content #45', price: 6 },
        { url: 'https://oatstuckalfred.com/h9shmd7iz?key=211a5b5c71efbc3d80cbc2e23902b425', title: 'Partner Offer #46', price: 10 },
        { url: 'https://oatstuckalfred.com/h9shmd7iz?key=211a5b5c71efbc3d80cbc2e23902b425', title: 'Easy Sign Up #47', price: 7 },
        { url: 'https://oatstuckalfred.com/h9shmd7iz?key=211a5b5c71efbc3d80cbc2e23902b425', title: 'Complete Form #48', price: 8 },
        { url: 'https://oatstuckalfred.com/h9shmd7iz?key=211a5b5c71efbc3d80cbc2e23902b425', title: 'View Partner Site #49', price: 9 },
        { url: 'https://oatstuckalfred.com/h9shmd7iz?key=211a5b5c71efbc3d80cbc2e23902b425', title: 'Final Day Task #50', price: 10 }
      ]
    };

    // Create all jobs
    const allJobs = [];
    
    console.log('Starting to seed 50 jobs with 3-day rotation...');
    
    // Day 1 jobs
    for (const job of jobsByDay.day1) {
      allJobs.push({
        title: job.title,
        description: `Visit the signup link and stay for 10 seconds. You'll be paid ৳${job.price} automatically!\n\nSignup URL: ${job.url}\n\nSteps:\n1. Click "Start Task" button\n2. Visit the signup link\n3. Stay on the page for 10 seconds\n4. Automatic payment of ৳${job.price} will be added to your balance!`,
        category: category._id,
        employer: admin._id,
        price: job.price,
        maxWorkers: 1000,
        duration: '10 seconds',
        status: 'active',
        autoComplete: true,
        taskUrl: job.url,
        isDailyRepeatable: true,
        dayRotation: 1
      });
    }

    // Day 2 jobs
    for (const job of jobsByDay.day2) {
      allJobs.push({
        title: job.title,
        description: `Visit the signup link and stay for 10 seconds. You'll be paid ৳${job.price} automatically!\n\nSignup URL: ${job.url}\n\nSteps:\n1. Click "Start Task" button\n2. Visit the signup link\n3. Stay on the page for 10 seconds\n4. Automatic payment of ৳${job.price} will be added to your balance!`,
        category: category._id,
        employer: admin._id,
        price: job.price,
        maxWorkers: 1000,
        duration: '10 seconds',
        status: 'active',
        autoComplete: true,
        taskUrl: job.url,
        isDailyRepeatable: true,
        dayRotation: 2
      });
    }

    // Day 3 jobs
    for (const job of jobsByDay.day3) {
      allJobs.push({
        title: job.title,
        description: `Visit the signup link and stay for 10 seconds. You'll be paid ৳${job.price} automatically!\n\nSignup URL: ${job.url}\n\nSteps:\n1. Click "Start Task" button\n2. Visit the signup link\n3. Stay on the page for 10 seconds\n4. Automatic payment of ৳${job.price} will be added to your balance!`,
        category: category._id,
        employer: admin._id,
        price: job.price,
        maxWorkers: 1000,
        duration: '10 seconds',
        status: 'active',
        autoComplete: true,
        taskUrl: job.url,
        isDailyRepeatable: true,
        dayRotation: 3
      });
    }

    // Insert all jobs
    await Job.insertMany(allJobs);

    // Update category job count
    category.jobCount = allJobs.length;
    await category.save();
    
    res.json({ 
      success: true, 
      message: '50 jobs seeded successfully! Visit /jobs.html to see them.',
      totalJobs: allJobs.length,
      day1: jobsByDay.day1.length,
      day2: jobsByDay.day2.length,
      day3: jobsByDay.day3.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/setup/status', async (req, res) => {
  try {
    const User = require('./models/User');
    const Job = require('./models/Job');
    const Category = require('./models/Category');
    
    const userCount = await User.countDocuments();
    const jobCount = await Job.countDocuments();
    const categoryCount = await Category.countDocuments();
    const adminExists = await User.findOne({ role: 'admin' });
    
    res.json({
      success: true,
      status: {
        database: 'Connected',
        users: userCount,
        jobs: jobCount,
        categories: categoryCount,
        adminCreated: !!adminExists,
        setupComplete: adminExists && jobCount > 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
