# 🚀 Deploy Micro Works Platform - FREE Hosting Guide

## 📋 Table of Contents
1. [Render.com Deployment (Recommended)](#method-1-rendercom-recommended)
2. [Railway.app Deployment](#method-2-railwayapp)
3. [Cyclic.sh Deployment](#method-3-cyclic)
4. [Vercel + MongoDB Atlas](#method-4-vercel--mongodb-atlas)

---

## ✅ Prerequisites (Before Deployment)

### 1. Create a GitHub Account
- Go to https://github.com
- Sign up for free account
- Verify your email

### 2. Install Git (if not installed)
- Download: https://git-scm.com/downloads
- Install with default settings

### 3. Prepare Your Project

Open Command Prompt in your project folder and run:

```bash
cd "c:\Users\Shihab\Documents\Rockstar Games\Social Club\microjob-platform"
```

---

## 🎯 Method 1: Render.com (RECOMMENDED - Easiest)

### ✅ Why Render?
- ✅ Free tier available
- ✅ Automatic deployments from GitHub
- ✅ Free MongoDB hosting (using MongoDB Atlas)
- ✅ Easy setup
- ✅ Custom domain support

### Step 1: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Micro Works Platform"

# Create repository on GitHub
# Go to https://github.com/new
# Name: microjob-platform
# Make it Public
# Click "Create repository"

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/microjob-platform.git

# Push code
git branch -M main
git push -u origin main
```

### Step 2: Setup MongoDB Atlas (Free)

1. **Go to**: https://www.mongodb.com/cloud/atlas/register
2. **Sign up** for free account
3. **Create a Cluster**:
   - Choose "Free" tier (M0 Sandbox)
   - Provider: AWS
   - Region: Choose closest to your location (e.g., Singapore)
   - Cluster Name: MicroWorks
   - Click "Create Cluster"

4. **Create Database User**:
   - Click "Database Access" (left sidebar)
   - Click "Add New Database User"
   - Username: `microworks`
   - Password: (Generate secure password - save it!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

5. **Whitelist IP Address**:
   - Click "Network Access" (left sidebar)
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for Render)
   - Click "Confirm"

6. **Get Connection String**:
   - Click "Database" (left sidebar)
   - Click "Connect" button
   - Choose "Connect your application"
   - Copy the connection string
   - Example: `mongodb+srv://microworks:<password>@microworks.xxxxx.mongodb.net/`
   - **Replace** `<password>` with your actual password
   - **Add** database name at the end: `...mongodb.net/microjob-platform`

### Step 3: Deploy to Render

1. **Go to**: https://render.com
2. **Sign up** with GitHub account
3. **Click** "New +" → "Web Service"
4. **Connect your repository**: `microjob-platform`
5. **Configure**:
   - **Name**: `micro-works` (will be your URL)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

6. **Add Environment Variables** (click "Advanced"):
   ```
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://microworks:YOUR_PASSWORD@microworks.xxxxx.mongodb.net/microjob-platform
   JWT_SECRET=microworks_production_secret_key_2024_CHANGE_THIS
   SITE_NAME=Micro Works
   SITE_URL=https://micro-works.onrender.com
   ADMIN_EMAIL=admin@example.com
   MINIMUM_WITHDRAWAL=500
   CURRENCY=BDT
   ```

7. **Click** "Create Web Service"
8. **Wait** 5-10 minutes for deployment
9. **Your site will be live at**: `https://micro-works.onrender.com`

### Step 4: Initialize Database

Once deployed, you need to seed the database:

1. Go to Render dashboard
2. Click on your service
3. Click "Shell" tab (to open terminal)
4. Run these commands:
   ```bash
   node config/initDatabase.js
   node config/seedJobs.js
   ```

---

## 🎯 Method 2: Railway.app

### ✅ Why Railway?
- ✅ Super fast deployment
- ✅ $5 free credit monthly
- ✅ Built-in PostgreSQL/MongoDB
- ✅ Easy to use

### Steps:

1. **Go to**: https://railway.app
2. **Sign up** with GitHub
3. **New Project** → "Deploy from GitHub repo"
4. **Select** your `microjob-platform` repository
5. **Add MongoDB**:
   - Click "+ New"
   - Select "Database" → "MongoDB"
   - Copy the connection string

6. **Add Environment Variables**:
   - Click on your web service
   - Click "Variables"
   - Add all variables from Method 1

7. **Deploy**:
   - Railway auto-deploys
   - Your URL: `https://micro-works.up.railway.app`

### Initialize Database:
```bash
# In Railway dashboard, open terminal and run:
node config/initDatabase.js
node config/seedJobs.js
```

---

## 🎯 Method 3: Cyclic.sh

### ✅ Why Cyclic?
- ✅ Completely free
- ✅ No credit card required
- ✅ Easy GitHub integration

### Steps:

1. **Go to**: https://www.cyclic.sh
2. **Sign in** with GitHub
3. **Link your repository**: `microjob-platform`
4. **Add Environment Variables**:
   - Click "Variables" tab
   - Add all variables (use MongoDB Atlas connection)

5. **Deploy**:
   - Automatic deployment
   - Your URL: `https://micro-works.cyclic.app`

### Initialize Database:
Use MongoDB Atlas as external database (see Method 1, Step 2)

---

## 🎯 Method 4: Vercel + MongoDB Atlas

### ✅ Why Vercel?
- ✅ Lightning fast
- ✅ Free tier
- ✅ Easy deployment

### Important Note:
Vercel is designed for frontend/serverless. For Node.js backend, you need to modify the structure.

### Steps:

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Create `vercel.json`**:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    },
    {
      "src": "public/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server.js"
    },
    {
      "src": "/(.*)",
      "dest": "public/$1"
    }
  ]
}
```

3. **Deploy**:
```bash
vercel
```

4. **Add environment variables** via Vercel dashboard

---

## 📝 Post-Deployment Checklist

### ✅ After deployment, verify:

1. **Visit your live URL**
2. **Check homepage loads**
3. **Register test account**
4. **Login to dashboard**
5. **View jobs page** - should show 20/15/15 jobs based on day
6. **Complete a task** - verify payment works
7. **Check referral system** - generate code
8. **Test withdrawal** - try minimum ৳500

### ✅ Initialize Database (IMPORTANT):

After first deployment, run these commands:

```bash
# Option 1: Via hosting dashboard terminal
node config/initDatabase.js
node config/seedJobs.js

# Option 2: Create API endpoints (see below)
```

---

## 🔧 Important Files to Update Before Deployment

### 1. Update `package.json` - Add start script:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "init-db": "node config/initDatabase.js",
    "seed-jobs": "node config/seedJobs.js"
  }
}
```

### 2. Update `.gitignore` - Don't upload sensitive files:

```
node_modules/
.env
*.log
.DS_Store
uploads/
```

### 3. Update `server.js` - Add initialization endpoints:

Add these routes before `app.listen()`:

```javascript
// One-time setup endpoints (remove after use!)
app.get('/setup/init-db', async (req, res) => {
  try {
    const User = require('./models/User');
    const Category = require('./models/Category');
    
    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
        balance: 1000,
        isVerified: true
      });
    }
    
    // Create category
    let category = await Category.findOne({ name: 'Daily Tasks' });
    if (!category) {
      await Category.create({
        name: 'Daily Tasks',
        slug: 'daily-tasks',
        description: 'Complete daily tasks and earn money!',
        icon: '📅',
        isActive: true,
        jobCount: 0
      });
    }
    
    res.json({ success: true, message: 'Database initialized!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/setup/seed-jobs', async (req, res) => {
  try {
    // Import seed function (you'll need to export it from seedJobs.js)
    res.json({ success: true, message: 'Jobs seeded! Visit /jobs.html to see them.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
```

---

## 🌐 Custom Domain (Optional)

### After deployment, add custom domain:

#### Render.com:
1. Go to your service → Settings
2. Click "Custom Domain"
3. Add your domain (e.g., `microworks.com`)
4. Update DNS records at your domain registrar

#### Railway.app:
1. Click your service → Settings
2. Add custom domain
3. Update DNS

#### Free Domain Options:
- **Freenom**: https://www.freenom.com (Free .tk, .ml, .ga domains)
- **InfinityFree**: https://infinityfree.net (Free subdomain)
- **000webhost**: Free subdomain

---

## 📊 Monitoring & Maintenance

### Check Your Site:
- **Uptime Robot**: https://uptimerobot.com (Free monitoring)
- **Better Uptime**: https://betteruptime.com (Free tier)

### View Logs:
- Render: Click "Logs" tab
- Railway: Click "Deployments" → View logs
- Cyclic: Dashboard → Logs

---

## 🐛 Troubleshooting

### Site Not Loading?
1. Check deployment logs for errors
2. Verify environment variables are set
3. Ensure MongoDB connection string is correct
4. Check if database is initialized

### Database Connection Error?
1. Verify MongoDB Atlas IP whitelist (use 0.0.0.0/0 for all)
2. Check username/password in connection string
3. Ensure database name is included in URI

### Jobs Not Showing?
1. Run seed script: `node config/seedJobs.js`
2. Or visit: `https://your-site.com/setup/seed-jobs`

### Can't Login?
1. Initialize database first
2. Use default admin credentials:
   - Email: admin@example.com
   - Password: admin123

---

## 🎉 Quick Deploy Commands (Summary)

### 1. Push to GitHub:
```bash
git init
git add .
git commit -m "Deploy Micro Works"
git remote add origin https://github.com/YOUR_USERNAME/microjob-platform.git
git push -u origin main
```

### 2. Deploy to Render:
- Sign up at https://render.com
- Connect GitHub repo
- Add environment variables
- Deploy!

### 3. Initialize Database:
```bash
# Visit your site:
https://your-site.com/setup/init-db
https://your-site.com/setup/seed-jobs
```

### 4. Test Your Site:
```
https://your-site.com → Homepage
https://your-site.com/register.html → Sign up
https://your-site.com/jobs.html → View jobs
```

---

## 💡 Best Option for You

**For Beginners**: Use **Render.com** (Method 1)
- Most reliable free tier
- Easy setup
- Great documentation

**For Advanced Users**: Use **Railway.app** (Method 2)
- Faster deployment
- Built-in database options
- Better developer experience

---

## 📞 Need Help?

If deployment fails:
1. Check error logs in hosting dashboard
2. Verify all environment variables
3. Ensure MongoDB Atlas is configured
4. Test locally first (`npm run dev`)

---

## ✅ Success Indicators

Your site is working when:
- ✅ Homepage loads at your URL
- ✅ Can register new account
- ✅ Can see jobs (20/15/15 based on day)
- ✅ Can complete tasks and get paid ৳5-10
- ✅ Balance updates with ৳ symbol
- ✅ Referral system generates codes
- ✅ Admin panel accessible

---

🎉 **Ready to deploy? Follow Method 1 (Render.com) for easiest deployment!**
