# 🚀 DEPLOY YOUR WEBSITE - Complete Guide with New GitHub Account

## Total Time: 20 Minutes
## Cost: $0 (100% FREE)

---

## 📋 PART 1: CREATE NEW GITHUB ACCOUNT (5 minutes)

### STEP 1.1: Create New Email (if you don't have one)

**Option A: Gmail**
1. Go to: https://accounts.google.com/signup
2. Fill in details (use different name than before)
3. Choose username (e.g., microworks2024@gmail.com)
4. Verify phone number
5. Done!

**Option B: Use existing email**
- If you have Yahoo, Outlook, or any other email, use that!

---

### STEP 1.2: Create GitHub Account

1. Go to: https://github.com/join

2. Fill in the form:
   ```
   Email: [Your NEW email address]
   Password: [Create strong password - save it!]
   Username: [Choose unique username, e.g., microworks2024]
   ```

3. Verify you're human (solve puzzle)

4. Click "Create account"

5. **Verify your email**:
   - Check your email inbox
   - Click verification link from GitHub
   - Important: Do this immediately!

6. **Complete your profile** (prevents flagging):
   - Add profile picture (any image)
   - Add a short bio: "Web developer"
   - Save profile

✅ **GitHub account ready!**

---

## 📋 PART 2: PUSH CODE TO GITHUB (3 minutes)

### STEP 2.1: Create Repository

1. Go to: https://github.com/new

2. Fill in:
   ```
   Repository name: micro-works-platform
   Description: Micro Works - Earning platform with 50 tasks
   Public: ✅ (select this)
   ```

3. **DO NOT check**:
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license

4. Click: **"Create repository"**

5. **Keep this page open** - you'll need the URL!

---

### STEP 2.2: Create Personal Access Token

1. Go to: https://github.com/settings/tokens/new

2. Fill in:
   ```
   Note: Micro Works Deployment
   Expiration: No expiration
   ```

3. Select scopes:
   - ✅ **repo** (check the main "repo" box - this checks all sub-boxes)

4. Scroll down and click: **"Generate token"**

5. **COPY THE TOKEN IMMEDIATELY!**
   - It starts with: `ghp_...`
   - You won't see it again!
   - Save it in a text file temporarily

---

### STEP 2.3: Push Your Code

Open **Command Prompt** and run these commands ONE BY ONE:

**Command 1: Navigate to project**
```bash
cd "c:\Users\Shihab\Documents\Rockstar Games\Social Club\microjob-platform"
```

**Command 2: Initialize Git (fresh start)**
```bash
git init
```

**Command 3: Add all files**
```bash
git add .
```

**Command 4: Commit files**
```bash
git commit -m "Initial deployment of Micro Works platform"
```

**Command 5: Add remote (replace YOUR_USERNAME with your new GitHub username)**
```bash
git remote add origin https://github.com/YOUR_USERNAME/micro-works-platform.git
```

**Example:** If your username is `microworks2024`, then:
```bash
git remote add origin https://github.com/microworks2024/micro-works-platform.git
```

**Command 6: Rename branch to main**
```bash
git branch -M main
```

**Command 7: Push to GitHub**
```bash
git push -u origin main
```

**When it asks for credentials:**
```
Username for 'https://github.com': [YOUR NEW GITHUB USERNAME]
Password for 'https://[username]@github.com': [PASTE YOUR TOKEN]
```

⚠️ **Important Notes:**
- Username = Your new GitHub username (e.g., microworks2024)
- Password = Your Personal Access Token (the ghp_... token you copied)
- When you paste the token, you won't see any characters (that's normal for security)
- Just paste and press Enter!

---

### STEP 2.4: Verify Upload

After successful push, you'll see:
```
Enumerating objects: 84, done.
Counting objects: 100% (84/84), done.
Writing objects: 100% (84/84), done.
Total 84 (delta 3), reused 0 (delta 0)
To https://github.com/YOUR_USERNAME/micro-works-platform.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

✅ **Code is now on GitHub!**

Visit your repository:
```
https://github.com/YOUR_USERNAME/micro-works-platform
```

---

## 📋 PART 3: SETUP MONGODB ATLAS (5 minutes)

### STEP 3.1: Create MongoDB Account

1. Go to: https://www.mongodb.com/cloud/atlas/register

2. Sign up options:
   - Use Google (easiest)
   - Or use your email

3. Choose: **"I'm learning MongoDB"**

4. Complete survey (any answers)

---

### STEP 3.2: Create FREE Cluster

1. Click: **"Build a Database"**

2. Choose: **"M0 FREE"** tier (the free one on the left)

3. Cloud Provider: **AWS**

4. Region: **ap-south-1 (Mumbai)** or **ap-southeast-1 (Singapore)**
   - Closest to Bangladesh for better speed

5. Cluster Name: `MicroWorks`

6. Click: **"Create"**

7. Wait 2-3 minutes for cluster creation

---

### STEP 3.3: Create Database User

1. In the Security Quickstart screen:
   - Username: `microworks`
   - Password: Click **"Autogenerate Secure Password"**
   - **COPY AND SAVE THIS PASSWORD!** (you'll need it soon)
   - Click **"Create User"**

2. If you don't see this screen:
   - Click "Database Access" on left menu
   - Click "Add New Database User"
   - Fill in username and password
   - Database User Privileges: **"Atlas admin"**
   - Click "Add User"

---

### STEP 3.4: Setup Network Access

1. Click: **"Network Access"** (left sidebar)

2. Click: **"Add IP Address"**

3. Select: **"Allow Access from Anywhere"**
   - This adds: 0.0.0.0/0

4. Click: **"Confirm"**

---

### STEP 3.5: Get Connection String

1. Click: **"Database"** (left sidebar)

2. Click: **"Connect"** button (on your cluster)

3. Choose: **"Connect your application"**

4. Driver: **Node.js**

5. Version: **5.5 or later**

6. **COPY the connection string**

It looks like:
```
mongodb+srv://microworks:<password>@microworks.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

7. **MODIFY the connection string:**

   **Original:**
   ```
   mongodb+srv://microworks:<password>@microworks.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

   **Replace:**
   - `<password>` with your actual password from Step 3.3
   - Add `/microjob-platform` after `.net`

   **Final format:**
   ```
   mongodb+srv://microworks:YOUR_ACTUAL_PASSWORD@microworks.xxxxx.mongodb.net/microjob-platform?retryWrites=true&w=majority
   ```

8. **SAVE THIS COMPLETE STRING!** You'll need it in the next step.

---

## 📋 PART 4: DEPLOY TO RENDER.COM (7 minutes)

### STEP 4.1: Create Render Account

1. Go to: https://render.com

2. Click: **"Get Started for Free"**

3. Click: **"Sign Up with GitHub"**

4. Login with your **NEW GitHub account**

5. Authorize Render to access your repositories

---

### STEP 4.2: Create Web Service

1. In Render dashboard, click: **"New +"** (top right)

2. Select: **"Web Service"**

3. Click: **"Connect"** next to your `micro-works-platform` repository
   - If you don't see it, click "Configure account" and give Render access

4. Fill in the deployment form:

   **Name:** `micro-works`
   - This will be your URL: micro-works.onrender.com

   **Region:** Singapore (closest to you)

   **Branch:** `main`

   **Root Directory:** (leave empty)

   **Runtime:** `Node`

   **Build Command:** `npm install`

   **Start Command:** `npm start`

   **Instance Type:** Select **"Free"** (at the bottom)

---

### STEP 4.3: Add Environment Variables

1. Click: **"Advanced"** button (scroll down)

2. Find: **"Environment Variables"** section

3. Click: **"Add Environment Variable"** for each of these:

   | Key | Value |
   |-----|-------|
   | `PORT` | `5000` |
   | `NODE_ENV` | `production` |
   | `MONGODB_URI` | `[Your complete MongoDB connection string]` |
   | `JWT_SECRET` | `microworks_super_secret_jwt_key_2024_production` |
   | `SITE_NAME` | `Micro Works` |
   | `SITE_URL` | `https://micro-works.onrender.com` |
   | `ADMIN_EMAIL` | `admin@example.com` |
   | `MINIMUM_WITHDRAWAL` | `500` |
   | `CURRENCY` | `BDT` |

   **CRITICAL:** For `MONGODB_URI`, paste your COMPLETE connection string from Part 3, Step 3.5!

4. Double-check all variables are correct!

---

### STEP 4.4: Deploy!

1. Scroll down and click: **"Create Web Service"**

2. **Wait 5-10 minutes** for deployment

3. Watch the logs - you'll see:
   ```
   ==> Building...
   ==> Installing dependencies...
   ==> Build successful!
   ==> Deploying...
   ==> Your service is live!
   ```

4. When you see **"Live"** badge (green) → Your site is ready!

---

## 📋 PART 5: INITIALIZE DATABASE (2 minutes)

Your site is deployed but the database is empty. Let's add the admin account and 50 jobs!

### STEP 5.1: Initialize Database

Visit these URLs in your browser (one by one):

**1. Check Status:**
```
https://micro-works.onrender.com/api/setup/status
```

You should see:
```json
{
  "success": true,
  "status": {
    "database": "Connected",
    "users": 0,
    "jobs": 0,
    ...
  }
}
```

**2. Create Admin & Category:**
```
https://micro-works.onrender.com/api/setup/init-db
```

You should see:
```json
{
  "success": true,
  "message": "Database initialized successfully!",
  "admin": {
    "email": "admin@example.com",
    "password": "admin123"
  }
}
```

**3. Add 50 Jobs:**
```
https://micro-works.onrender.com/api/setup/seed-jobs
```

You should see:
```json
{
  "success": true,
  "message": "50 jobs seeded successfully!",
  "totalJobs": 50
}
```

✅ **Database is ready!**

---

## 📋 PART 6: TEST YOUR LIVE SITE! 🎉

### Your Site URLs:

**Homepage:**
```
https://micro-works.onrender.com
```

**Register:**
```
https://micro-works.onrender.com/register.html
```

**Login:**
```
https://micro-works.onrender.com/login.html
```

**Jobs:**
```
https://micro-works.onrender.com/jobs.html
```

**Dashboard:**
```
https://micro-works.onrender.com/dashboard.html
```

**Referrals:**
```
https://micro-works.onrender.com/referrals.html
```

**Admin Panel:**
```
https://micro-works.onrender.com/admin-withdrawals.html
```

---

### STEP 6.1: Test Everything

1. **Visit homepage** - should load properly

2. **Register account:**
   - Name: Test User
   - Email: test@test.com
   - Password: test123
   - Phone: 01712345678

3. **Login** with your new account

4. **Check dashboard:**
   - Balance should show: ৳0.00

5. **View jobs:**
   - Should see 20/15/15 jobs (based on current day)
   - All prices: ৳5-10 TK

6. **Complete a task:**
   - Click "Start Task"
   - Wait 10 seconds
   - Check balance increased!

7. **Check referral code:**
   - Go to Referrals page
   - Copy your referral link

8. **Test admin panel:**
   - Logout
   - Login with: admin@example.com / admin123
   - Access admin withdrawals page

---

## 🎉 SUCCESS! YOUR SITE IS LIVE!

### Site Information:

**Your Live URL:** `https://micro-works.onrender.com`

**Admin Login:**
- Email: `admin@example.com`
- Password: `admin123`
- ⚠️ Change this password after first login!

**Features Working:**
- ✅ 50 jobs with 3-day rotation
- ✅ Auto-payment system (10 seconds)
- ✅ ৳5-10 TK per task
- ✅ ৳500 minimum withdrawal
- ✅ 10% referral commission
- ✅ Admin panel
- ✅ All features working!

---

## 📱 SHARE YOUR SITE

Share these links:

**For Users:**
- Homepage: https://micro-works.onrender.com
- Register: https://micro-works.onrender.com/register.html
- Jobs: https://micro-works.onrender.com/jobs.html

**Share on:**
- WhatsApp groups
- Facebook
- Twitter
- Instagram
- Reddit
- Email

---

## ⚠️ IMPORTANT NOTES

### Free Tier Limitations:

1. **Site sleeps after 15 min of inactivity**
   - First request takes 30-60 seconds to wake up
   - After that, it's fast!

2. **Keep site awake (Optional):**
   - Use UptimeRobot: https://uptimerobot.com
   - Add your site URL
   - Pings every 5 minutes (keeps site awake)

3. **750 hours/month free**
   - Enough for 24/7 uptime for one site

---

## 🔄 UPDATE YOUR SITE LATER

To update your site with new features:

```bash
cd "c:\Users\Shihab\Documents\Rockstar Games\Social Club\microjob-platform"
git add .
git commit -m "Updated features"
git push origin main
```

Render will automatically redeploy in 2-3 minutes!

---

## 🐛 TROUBLESHOOTING

### Site shows "Application failed to respond"
- Check Render logs: Dashboard → Logs
- Verify MongoDB connection string is correct
- Make sure all environment variables are set

### Database connection error
- MongoDB Atlas → Network Access → Verify 0.0.0.0/0 is added
- Check connection string has correct password
- Verify `/microjob-platform` is in the connection string

### Jobs not showing
- Visit: https://micro-works.onrender.com/api/setup/seed-jobs
- Check response for success message
- Refresh jobs page

### Can't login
- Run init-db again: https://micro-works.onrender.com/api/setup/init-db
- Use admin credentials: admin@example.com / admin123

---

## 📊 MONITOR YOUR SITE

### Render Dashboard:
- View real-time logs
- Check metrics (CPU, memory)
- See deployment history

### MongoDB Atlas:
- Monitor database size
- View query performance
- Check connection stats

---

## ✅ DEPLOYMENT CHECKLIST

- [ ] New GitHub account created
- [ ] Personal access token generated
- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Network access configured
- [ ] Connection string obtained
- [ ] Render account created
- [ ] Web service created
- [ ] Environment variables added
- [ ] Site deployed successfully
- [ ] Database initialized
- [ ] 50 jobs seeded
- [ ] Tested registration
- [ ] Tested job completion
- [ ] Tested admin login
- [ ] Shared site with friends!

---

## 🎯 CONGRATULATIONS!

Your Micro Works platform is now LIVE and accessible worldwide! 🌍

**Your achievement:**
- ✅ Built complete earning platform
- ✅ 50 signup links with 3-day rotation
- ✅ Auto-payment system
- ✅ Referral system
- ✅ Admin panel
- ✅ Deployed to internet
- ✅ 100% FREE hosting

**Start earning users now!** 💰

Share your site and watch your platform grow! 🚀

---

## 📞 NEED HELP?

If you encounter any issues:
1. Check Render logs
2. Verify MongoDB connection
3. Check environment variables
4. Re-run setup endpoints

**All documentation is in your project folder!**

---

**GOOD LUCK WITH YOUR MICRO WORKS PLATFORM! 🎉**
