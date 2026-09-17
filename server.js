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
        message: `Database already has ${existingJobs} jobs!` 
      });
    }
    
    // Get admin and category
    const admin = await User.findOne({ role: 'admin' });
    const category = await Category.findOne({ name: 'Daily Tasks' });
    
    if (!admin || !category) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please run /api/setup/init-db first!' 
      });
    }
    
    // Import jobsByDay data (you'll need to require the seed file)
    const { execSync } = require('child_process');
    execSync('node config/seedJobs.js');
    
    res.json({ 
      success: true, 
      message: '50 jobs seeded successfully! Visit /jobs.html to see them.',
      totalJobs: 50
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
