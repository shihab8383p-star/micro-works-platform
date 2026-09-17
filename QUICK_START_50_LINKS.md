# 🚀 DEPLOY IN 5 STEPS - COPY & PASTE COMMANDS

## ✅ Your 50 Links Are Already Added!

All 50 signup links are in the database, rotating across 3 days:
- **Day 1**: Links 1-20 (20 jobs)
- **Day 2**: Links 21-35 (15 jobs)  
- **Day 3**: Links 36-50 (15 jobs)

---

## 🎯 STEP-BY-STEP: Deploy to Render.com (FREE)

### STEP 1: Push to GitHub (Copy-Paste These Commands)

Open **Command Prompt** and paste these commands ONE BY ONE:

```bash
cd "c:\Users\Shihab\Documents\Rockstar Games\Social Club\microjob-platform"
```

```bash
git config --global user.name "Your Name"
```

```bash
git config --global user.email "your-email@gmail.com"
```

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "Deploy Micro Works Platform"
```

**Now create GitHub repository:**

1. Go to: https://github.com/new
2. Repository name: `microjob-platform`
3. Select: **Public**
4. Click: **"Create repository"**

**Then push your code** (replace YOUR_USERNAME with your GitHub username):

```bash
git remote add origin https://github.com/YOUR_USERNAME/microjob-platform.git
```

```bash
git branch -M main
```

```bash
git push -u origin main
```

**Login when prompted:**
- Username: your GitHub username
- Password: Create a Personal Access Token here → https://github.com/settings/tokens/new
  - Check: `repo` (Full control of private repositories)
  - Generate token
  - Copy and use as password

---

### STEP 2: Setup Free MongoDB (3 minutes)

1. **Go to**: https://www.mongodb.com/cloud/atlas/register
2. **Sign up** with Google (easiest)
3. **Create Free Cluster**:
   - Click "Build a Database"
   - Choose **"M0 FREE"**
   - Provider: AWS
   - Region: Singapore (closest to Bangladesh)
   - Click **"Create"**

4. **Create Database User**:
   - Username: `microworks`
   - Password: Click "Autogenerate" → **COPY THE PASSWORD!**
   - Click "Create User"

5. **Allow Network Access**:
   - Click "Network Access"
   - Click "Add IP Address"
   - Select **"Allow Access from Anywhere"**
   - Confirm

6. **Get Connection String**:
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - **COPY** the connection string
   - Replace `<password>` with your actual password
   - Add `/microjob-platform` before the `?`
   - Example: `mongodb+srv://microworks:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/microjob-platform?retryWrites=true&w=majority`

**SAVE THIS CONNECTION STRING!** You'll need it in next step.

---

### STEP 3: Deploy to Render.com (FREE)

1. **Go to**: https://render.com
2. **Sign up** with GitHub
3. **New Web Service**:
   - Click "New +" → "Web Service"
   - Select your `microjob-platform` repository
   - Click "Connect"

4. **Configure**:
   - **Name**: `micro-works` (your URL)
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. **Add Environment Variables** (Click "Advanced"):

Add these:

| Key | Value |
|-----|-------|
| `PORT` | `5000` |
| `NODE_ENV` | `production` |
| `MONGODB_URI` | `[PASTE YOUR CONNECTION STRING FROM STEP 2]` |
| `JWT_SECRET` | `microworks_jwt_secret_key_2024` |
| `SITE_NAME` | `Micro Works` |
| `MINIMUM_WITHDRAWAL` | `500` |
| `CURRENCY` | `BDT` |

6. **Click "Create Web Service"**

Wait 5-10 minutes for deployment...

---

### STEP 4: Initialize Database

Once deployed, visit these URLs in your browser:

**1. Check Status:**
```
https://micro-works.onrender.com/api/setup/status
```

**2. Create Admin & Category:**
```
https://micro-works.onrender.com/api/setup/init-db
```

**3. Add 50 Jobs:**
```
https://micro-works.onrender.com/api/setup/seed-jobs
```

---

### STEP 5: Test Your Live Site! 🎉

**Your site is live at**: https://micro-works.onrender.com

**Test these pages:**

1. **Homepage**: https://micro-works.onrender.com
2. **Register**: https://micro-works.onrender.com/register.html
3. **Login**: https://micro-works.onrender.com/login.html
4. **Jobs**: https://micro-works.onrender.com/jobs.html
5. **Dashboard**: https://micro-works.onrender.com/dashboard.html

**Admin Login:**
- Email: `admin@example.com`
- Password: `admin123`

---

## 🎯 What You Get (FREE):

✅ **50 Jobs** - All your signup links added
✅ **3-Day Rotation** - Day 1, 2, 3 system working
✅ **Auto Payment** - ৳5-10 TK per task
✅ **10-Second Timer** - Automatic completion
✅ **Referral System** - 10% commission
✅ **Withdrawal System** - ৳500 minimum
✅ **Admin Panel** - Approve withdrawals
✅ **HTTPS** - Secure connection
✅ **Custom Domain** - Can add your own domain

---

## 📱 Share Your Site:

Your live URL: **https://micro-works.onrender.com**

Share on:
- WhatsApp
- Facebook
- Twitter
- Instagram
- Email

---

## ⚠️ Important Notes:

1. **Free Tier Limitation**: Site sleeps after 15 min of inactivity
   - First request takes 30-60 seconds to wake up
   - After that, it's fast!

2. **Keep Site Awake** (Optional):
   - Use UptimeRobot: https://uptimerobot.com
   - Pings your site every 5 minutes
   - Keeps it from sleeping

3. **Update Your Site**:
   ```bash
   git add .
   git commit -m "Updated feature"
   git push origin main
   ```
   Render auto-deploys in 2-3 minutes!

---

## 🐛 Troubleshooting:

### Can't push to GitHub?
- Create Personal Access Token: https://github.com/settings/tokens/new
- Use token as password when pushing

### Site shows error?
- Check Render logs: Dashboard → Logs tab
- Verify MongoDB connection string is correct

### Jobs not showing?
- Visit: `https://your-site.onrender.com/api/setup/seed-jobs`
- Refresh jobs page

### Database connection failed?
- MongoDB Atlas → Network Access → Add 0.0.0.0/0
- Check username/password in connection string

---

## ✅ Deployment Checklist:

- [ ] Git installed
- [ ] GitHub account created
- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas account created
- [ ] Free cluster created
- [ ] Database user created
- [ ] Connection string copied
- [ ] Render account created
- [ ] Web service created
- [ ] Environment variables added
- [ ] Site deployed (shows "Live")
- [ ] Database initialized
- [ ] 50 jobs seeded
- [ ] Tested registration
- [ ] Tested job completion

---

## 🎉 SUCCESS!

Your Micro Works platform is now **LIVE** and accessible worldwide!

**Next Steps:**
1. Change admin password
2. Test all features
3. Share with friends
4. Start earning! 💰

Need help? Reply with any errors you see!
