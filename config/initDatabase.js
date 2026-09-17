require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');
const User = require('../models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

const initCategories = async () => {
  try {
    const categories = [
      { name: 'Data Entry', slug: 'data-entry', icon: '⌨️', description: 'Data entry and typing jobs', order: 1 },
      { name: 'Social Media', slug: 'social-media', icon: '📱', description: 'Social media likes, shares, follows', order: 2 },
      { name: 'Content Writing', slug: 'content-writing', icon: '✍️', description: 'Article writing, blog posts', order: 3 },
      { name: 'Surveys', slug: 'surveys', icon: '📊', description: 'Online surveys and forms', order: 4 },
      { name: 'Video & Audio', slug: 'video-audio', icon: '🎥', description: 'Video watching, audio transcription', order: 5 },
      { name: 'App Testing', slug: 'app-testing', icon: '📲', description: 'Test mobile apps and websites', order: 6 },
      { name: 'Reviews', slug: 'reviews', icon: '⭐', description: 'Write product or service reviews', order: 7 },
      { name: 'Translation', slug: 'translation', icon: '🌐', description: 'Translate text between languages', order: 8 },
      { name: 'Research', slug: 'research', icon: '🔍', description: 'Online research tasks', order: 9 },
      { name: 'Design', slug: 'design', icon: '🎨', description: 'Simple graphic design tasks', order: 10 },
      { name: 'Photo Editing', slug: 'photo-editing', icon: '📷', description: 'Basic photo editing', order: 11 },
      { name: 'Web Scraping', slug: 'web-scraping', icon: '🕸️', description: 'Data collection from websites', order: 12 },
      { name: 'Email Handling', slug: 'email-handling', icon: '📧', description: 'Email management tasks', order: 13 },
      { name: 'Virtual Assistant', slug: 'virtual-assistant', icon: '👔', description: 'Administrative support tasks', order: 14 },
      { name: 'Ad Posting', slug: 'ad-posting', icon: '📢', description: 'Post ads on classified sites', order: 15 },
      { name: 'SEO Tasks', slug: 'seo-tasks', icon: '🔝', description: 'Simple SEO related tasks', order: 16 },
      { name: 'Customer Support', slug: 'customer-support', icon: '💬', description: 'Customer service tasks', order: 17 },
      { name: 'Captcha Entry', slug: 'captcha-entry', icon: '🔐', description: 'Solve captchas', order: 18 },
      { name: 'Other', slug: 'other', icon: '📁', description: 'Miscellaneous tasks', order: 19 }
    ];

    await Category.deleteMany({});
    await Category.insertMany(categories);
    console.log('✓ Categories initialized');
  } catch (error) {
    console.error('Error initializing categories:', error.message);
  }
};

const initAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        phone: '+8801234567890',
        role: 'admin',
        isVerified: true,
        emailVerified: true
      });
      console.log('✓ Admin user created (email: admin@example.com, password: admin123)');
    } else {
      console.log('✓ Admin user already exists');
    }
  } catch (error) {
    console.error('Error creating admin:', error.message);
  }
};

const initDatabase = async () => {
  await connectDB();
  await initCategories();
  await initAdmin();
  console.log('\n✓ Database initialization complete!');
  process.exit(0);
};

initDatabase();
