# 🚀 DEPLOY YOUR MICRO WORKS WEBSITE - SUPER SIMPLE GUIDE

**Time needed**: 20 minutes  
**Cost**: 100% FREE (No credit card needed!)  
**Your GitHub**: https://github.com/shihab8383p-star/micro-works-platform

---

## ✅ STEP 1: Create MongoDB Atlas Account (FREE Database)

### 1.1 Go to MongoDB Atlas
- Open browser and go to: **https://www.mongodb.com/cloud/atlas/register**

### 1.2 Sign Up
- Click **"Sign up with Google"** (easiest way)
- OR use your email: shihab8383p@gmail.com (or any email)
- Create a password

### 1.3 Create Free Cluster
After signing up, you'll see "Welcome" screen:

1. **Select Plan**:
   - Choose **"M0 FREE"** (it's already selected)
   - Click **"Create"**

2. **Choose Provider & Region**:
   - Provider: AWS
   - Region: **Singapore** (closest to Bangladesh)
   - Cluster Name: Leave as "Cluster0" or change to "microworks"
   - Click **"Create Cluster"** button

3. **Security Setup** (IMPORTANT!):
   
   **a) Create Database User**:
   - You'll see "Security Quickstart"
   - Username: `microworks`
   - Password: Click **"Autogenerate Secure Password"**
   - **COPY THE PASSWORD** - Save it in Notepad! Example: `xK7pqR2mNvB9`
   - Click **"Create User"**
   
   **b) Add IP Address**:
   - Click **"Add My Current IP Address"** (adds your IP)
   - Then click **"Add Entry"** below that
   - In the popup, enter: `0.0.0.0/0` (this allows Render.com to connect)
   - Description: "Render Server"
   - Click **"Add Entry"**
   - Click **"Finish and Close"**

### 1.4 Get Connection String

1. Wait 1-2 minutes for cluster to be created (green dot appears)
2. Click **"Connect"** button on your cluster
3. Click **"Connect your application"**
4. Copy the connection string - it looks like:
   ```
   mongodb+srv://microworks:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **IMPORTANT**: Replace `<password>` with the password you saved earlier!
   
   **Example**:
   - Original: `mongodb+srv://microworks:<password>@cluster0.xxxxx.mongodb.net/`
   - Fixed: `mongodb+srv://microworks:xK7pqR2mNvB9@cluster0.xxxxx.mongodb.net/`
   
6. **Save this complete connection string in Notepad!** You'll need it for Render.

---

## ✅ STEP 2: Deploy to Render.com (FREE Hosting)

### 2.1 Create Render Account

1. Go to: **https://render.com/**
2. Click **"Get Started for Free"** (top right)
3. Click **"Sign up with GitHub"**
4. Use your GitHub account: **shihab8383p-star**
5. Click **"Authorize Render"**
6. You're now logged in to Render!

### 2.2 Deploy from GitHub

1. Click **"New +"** button (top right)
2. Select **"Blueprint"**
3. Click **"Connect account"** next to GitHub
4. You'll see your repositories
5. Find **"micro-works-platform"**
6. Click **"Connect"** next to it

### 2.3 Configure Deployment

Render will read your `render.yaml` file automatically!

1. **Service Group Name**: Leave as "micro-works" or change to anything
2. **Branch**: main (should be selected)
3. You'll see **Environment Variables** section with some pre-filled values

### 2.4 Add Your Secret Variables

Click **"Edit"** or scroll down to environment variables section.

You need to add **2 IMPORTANT VARIABLES**:

**Variable 1: MONGODB_URI**
- Key: `MONGODB_URI`
- Value: Paste your MongoDB connection string from Step 1.4
  - Example: `mongodb+srv://microworks:xK7pqR2mNvB9@cluster0.xxxxx.mongodb.net/`

**Variable 2: SITE_URL**
- Key: `SITE_URL`
- Value: Leave empty for now (we'll update it after deployment)

All other variables are already set from render.yaml:
- ✅ PORT: 5000
- ✅ NODE_ENV: production
- ✅ JWT_SECRET: (already set)
- ✅ SITE_NAME: Micro Works
- ✅ MINIMUM_WITHDRAWAL: 500
- ✅ CURRENCY: BDT

### 2.5 Start Deployment

1. Review everything
2. Click **"Apply"** button (bottom)
3. Render starts deploying!

**You'll see**:
- "Creating service..." 
- "Building..."
- "Deploying..."

**Wait 3-5 minutes** for deployment to complete.

---

## ✅ STEP 3: Initialize Your Website

### 3.1 Get Your Website URL

After deployment completes:
1. You'll see "Live" with a green dot
2. Your URL will be something like: `https://micro-works-xxxx.onrender.com`
3. **COPY THIS URL**

### 3.2 Update SITE_URL Variable

1. In Render dashboard, click on your service "micro-works"
2. Go to **"Environment"** tab (left sidebar)
3. Find `SITE_URL` variable
4. Click **"Edit"**
5. Paste your website URL (example: `https://micro-works-xxxx.onrender.com`)
6. Click **"Save Changes"**
7. Service will restart automatically (wait 30 seconds)

### 3.3 Setup Database (One-time only)

Open these 3 URLs in your browser **in order**:

**URL 1: Check Status**
```
https://YOUR-SITE-URL.onrender.com/api/setup/status
```
- You should see: `"database": "Connected"`

**URL 2: Initialize Database**
```
https://YOUR-SITE-URL.onrender.com/api/setup/init-db
```
- This creates admin account and category
- You should see: `"success": true`

**URL 3: Seed 50 Jobs**
```
https://YOUR-SITE-URL.onrender.com/api/setup/seed-jobs
```
- This adds all 50 jobs with 3-day rotation
- You should see: `"totalJobs": 50`

---

## ✅ STEP 4: TEST YOUR WEBSITE!

### 4.1 Visit Your Live Website

Open your website URL:
```
https://YOUR-SITE-URL.onrender.com
```

**You should see**: Micro Works homepage with "Start Earning Today" button!

### 4.2 Test Admin Login

1. Click **"Login"** (top right)
2. Login with:
   - Email: `admin@example.com`
   - Password: `admin123`
3. You'll see admin dashboard!

### 4.3 Test User Registration

1. Logout
2. Click **"Register"**
3. Create a test user:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
   - Phone: 01712345678
   - Bkash: 01712345678
4. Register successfully!

### 4.4 Test Job Completion

1. Click **"Browse Jobs"**
2. You should see **Day 1 jobs** (20 jobs with ৳5-10 each)
3. Click **"Start Task"** on any job
4. Wait 10 seconds on the signup page
5. You'll be redirected back and **GET PAID AUTOMATICALLY**!
6. Check your dashboard - balance increased!

---

## 🎉 CONGRATULATIONS!

### Your Website is LIVE! 🚀

**Your Live URL**: `https://micro-works-xxxx.onrender.com`

**Share this link** with users to start earning!

### What's Working:
- ✅ User registration & login
- ✅ 50 jobs with 3-day rotation
- ✅ Auto-payment after 10 seconds
- ✅ Referral system (10% commission)
- ✅ Withdrawal requests (৳500 minimum)
- ✅ Admin dashboard for managing withdrawals
- ✅ Bangladeshi Taka (৳) currency

---

## 📱 Share Your Referral Link

After registration, users get a referral link:
```
https://YOUR-SITE-URL.onrender.com/register.html?ref=USER_CODE
```

Share this to earn 10% commission on all referral earnings!

---

## 🛠️ Important Notes

### FREE Plan Limitations:
- ⚠️ **Website sleeps after 15 minutes of inactivity**
  - First visitor after sleep: waits 30-60 seconds for wake up
  - Then works normally
- ⚠️ **750 hours/month free** (enough for 24/7 if you upgrade later)

### How to Keep Website Awake:
Use a free ping service like:
- UptimeRobot: https://uptimerobot.com/
- Adds your URL and pings every 5 minutes
- Keeps website always active!

---

## ❓ TROUBLESHOOTING

### Problem 1: "Application Error" on website
**Solution**: 
- Check Render logs (click "Logs" tab)
- Most common issue: Wrong MONGODB_URI
- Make sure you replaced `<password>` in connection string!

### Problem 2: Database not connecting
**Solution**:
- Go to MongoDB Atlas
- Check IP Whitelist has `0.0.0.0/0`
- Check database user password is correct

### Problem 3: Jobs not showing
**Solution**:
- Visit: `https://YOUR-SITE-URL.onrender.com/api/setup/seed-jobs`
- This will seed the 50 jobs

### Problem 4: Website very slow
**Solution**:
- Free plan sleeps after inactivity
- Use UptimeRobot to keep it awake (see above)

---

## 🎯 NEXT STEPS

### After Deployment:

1. **Test Everything**:
   - Register users
   - Complete jobs
   - Test referrals
   - Request withdrawal
   - Test admin approval

2. **Share Your Website**:
   - Share on Facebook
   - Share on WhatsApp groups
   - Share referral links

3. **Monitor Performance**:
   - Check Render dashboard for visitors
   - Check MongoDB Atlas for database size
   - Monitor user registrations

4. **Optional Upgrades** (Later):
   - Custom domain: `www.yourname.com` (need to buy domain)
   - Email notifications: Add email config
   - Payment gateway: Add bKash/Nagad integration

---

## 📞 Need Help?

If something doesn't work:
1. Check Render logs (Logs tab in dashboard)
2. Check MongoDB Atlas (cluster is running)
3. Verify all environment variables are correct
4. Try accessing setup URLs again

---

**REMEMBER**: Save these important details in a safe place:
- ✅ MongoDB connection string
- ✅ MongoDB username & password  
- ✅ Render website URL
- ✅ Admin login: admin@example.com / admin123

---

## 🎊 DEPLOYMENT COMPLETE!

Your **Micro Works** platform is now LIVE on the internet!

**Time to start earning!** 💰💰💰
