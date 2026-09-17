# 🚀 DEPLOY YOUR SITE NOW - Step by Step

## ⚡ FASTEST METHOD: Render.com (15 minutes)

Follow these exact steps to deploy your Micro Works platform for FREE:

---

## 📦 STEP 1: Push to GitHub (5 minutes)

### 1.1 Open Command Prompt in your project folder:
```bash
cd "c:\Users\Shihab\Documents\Rockstar Games\Social Club\microjob-platform"
```

### 1.2 Check if Git is installed:
```bash
git --version
```

**If not installed**: Download from https://git-scm.com/downloads

### 1.3 Configure Git (first time only):
```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@gmail.com"
```

### 1.4 Initialize Git repository:
```bash
git init
git add .
git commit -m "Initial commit - Micro Works Platform"
```

### 1.5 Create GitHub repository:
1. Go to: https://github.com/new
2. Repository name: `microjob-platform`
3. Make it **Public**
4. Don't add README, .gitignore, or license
5. Click **"Create repository"**

### 1.6 Push your code:
```bash
# Replace YOUR_GITHUB_USERNAME with your actual username
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/microjob-platform.git
git branch -M main
git push -u origin main
```

**Note**: You may need to login to GitHub. Use your username and Personal Access Token (not password).

**To create token**: https://github.com/settings/tokens/new
- Select: `repo` (full control)
- Generate token
- Copy and save it (you won't see it again!)
- Use token as password when pushing

---

## 🌐 STEP 2: Setup MongoDB Atlas (5 minutes)

### 2.1 Create Account:
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google/GitHub (easiest)
3. Choose **"Free"** option

### 2.2 Create Free Cluster:
1. Click **"Build a Database"**
2. Choose **"M0 Free"** tier
3. Provider: **AWS**
4. Region: Choose closest (e.g., **Singapore** for Bangladesh)
5. Cluster Name: `MicroWorks`
6. Click **"Create"** (wait 3-5 minutes)

### 2.3 Create Database User:
1. Click **"Database Access"** (left menu)
2. Click **"ADD NEW DATABASE USER"**
3. Authentication: **Password**
4. Username: `microworks`
5. Password: Click **"Autogenerate Secure Password"** → **COPY IT!**
6. Database User Privileges: **"Atlas admin"**
7. Click **"Add User"**

**SAVE THIS PASSWORD!** You'll need it in next step.

### 2.4 Allow Network Access:
1. Click **"Network Access"** (left menu)
2. Click **"ADD IP ADDRESS"**
3. Click **"ALLOW ACCESS FROM ANYWHERE"**
4. Click **"Confirm"**

### 2.5 Get Connection String:
1. Click **"Database"** (left menu)
2. Click **"Connect"** button (on your cluster)
3. Choose **"Connect your application"**
4. Driver: **Node.js**, Version: **5.5 or later**
5. Copy the connection string
6. It looks like: `mongodb+srv://microworks:<password>@microworks.xxxxx.mongodb.net/?retryWrites=true&w=majority`

**IMPORTANT**: 
- Replace `<password>` with the password you copied earlier
- Add `/microjob-platform` before the `?` 
- Final format: `mongodb+srv://microworks:YOUR_PASSWORD@microworks.xxxxx.mongodb.net/microjob-platform?retryWrites=true&w=majority`

**SAVE THIS CONNECTION STRING!**

---

## 🚀 STEP 3: Deploy to Render.com (5 minutes)

### 3.1 Create Render Account:
1. Go to: https://render.com
2. Click **"Get Started for Free"**
3. **Sign up with GitHub** (easiest)
4. Authorize Render to access your repositories

### 3.2 Create New Web Service:
1. Click **"New +"** (top right)
2. Select **"Web Service"**
3. Click **"Connect"** next to your `microjob-platform` repository
4. If repo not visible, click **"Configure account"** and give access

### 3.3 Configure Service:
- **Name**: `micro-works` (your URL will be micro-works.onrender.com)
- **Region**: Choose closest
- **Branch**: `main`
- **Root Directory**: (leave empty)
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Select **"Free"** (at bottom)

### 3.4 Add Environment Variables:
Click **"Advanced"** → Scroll to **"Environment Variables"**

Add these one by one (click "Add Environment Variable" for each):

| Key | Value |
|-----|-------|
| `PORT` | `5000` |
| `NODE_ENV` | `production` |
| `MONGODB_URI` | `YOUR_MONGODB_CONNECTION_STRING_FROM_STEP_2` |
| `JWT_SECRET` | `microworks_super_secret_jwt_key_2024_CHANGE_THIS_IN_PROD` |
| `SITE_NAME` | `Micro Works` |
| `SITE_URL` | `https://micro-works.onrender.com` |
| `ADMIN_EMAIL` | `admin@example.com` |
| `MINIMUM_WITHDRAWAL` | `500` |
| `CURRENCY` | `BDT` |

**CRITICAL**: Make sure `MONGODB_URI` is your FULL connection string with password!

### 3.5 Deploy:
1. Click **"Create Web Service"** (at bottom)
2. Wait 5-10 minutes for deployment
3. Watch the logs (you'll see npm install, then server starting)
4. When you see **"Live"** badge → your site is ready!

**Your URL**: https://micro-works.onrender.com (or whatever name you chose)

---

## ✅ STEP 4: Initialize Database (2 minutes)

### 4.1 Open these URLs in your browser (one by one):

**Check Status**:
```
https://micro-works.onrender.com/api/setup/status
```

**Initialize Database** (create admin & category):
```
https://micro-works.onrender.com/api/setup/init-db
```

**Seed Jobs** (add 50 jobs):
```
https://micro-works.onrender.com/api/setup/seed-jobs
```

You should see success messages for each!

---

## 🎉 STEP 5: Test Your Live Site!

### 5.1 Visit your homepage:
```
https://micro-works.onrender.com
```

### 5.2 Test everything:
1. **Register**: https://micro-works.onrender.com/register.html
   - Create a new account
   - Use real email format

2. **Login**: https://micro-works.onrender.com/login.html
   - Use your new account

3. **Dashboard**: https://micro-works.onrender.com/dashboard.html
   - Check balance (should show ৳0.00)

4. **Jobs**: https://micro-works.onrender.com/jobs.html
   - Should see 20/15/15 jobs (based on day)
   - All prices in ৳5-10 TK

5. **Complete Task**:
   - Click "Start Task"
   - Wait 10 seconds
   - Check balance increased!

6. **Referrals**: https://micro-works.onrender.com/referrals.html
   - Copy your referral link
   - Share with friends!

7. **Admin Panel**: https://micro-works.onrender.com/admin-withdrawals.html
   - Login: admin@example.com / admin123
   - Approve withdrawal requests

---

## 🔧 Troubleshooting

### Site shows "Application Error"?
1. Go to Render dashboard
2. Click on your service
3. Click "Logs" tab
4. Check for errors
5. Common issue: Wrong MongoDB connection string

### Can't see jobs?
1. Visit: `https://your-site.onrender.com/api/setup/seed-jobs`
2. Check if it says "success"

### Database connection error?
1. Check MongoDB Atlas cluster is running
2. Verify IP whitelist includes 0.0.0.0/0
3. Check username/password in connection string
4. Make sure database name is in the URI

### "Service Unavailable" on first visit?
- Render free tier sleeps after 15 minutes of inactivity
- First request wakes it up (takes 30-60 seconds)
- Subsequent requests are fast

---

## 📱 Share Your Site!

Your live URLs:
- **Homepage**: https://micro-works.onrender.com
- **Register**: https://micro-works.onrender.com/register.html
- **Jobs**: https://micro-works.onrender.com/jobs.html

Share these with:
- ✅ Friends and family
- ✅ Social media
- ✅ WhatsApp groups
- ✅ Facebook
- ✅ Reddit

---

## 🎯 Important Notes

### Free Tier Limitations:
- ✅ Site sleeps after 15 min inactivity (wakes on first request)
- ✅ 750 hours/month free (enough for 1 site running 24/7)
- ✅ Custom domains supported
- ✅ Automatic HTTPS

### Keep Site Awake (Optional):
Use **UptimeRobot**: https://uptimerobot.com
- Free monitoring service
- Pings your site every 5 minutes
- Keeps site from sleeping
- Sends alerts if site goes down

---

## 🔐 Security Checklist

After deployment:
- ✅ Change admin password (login and update in dashboard)
- ✅ Update JWT_SECRET to a random string
- ✅ Monitor your MongoDB Atlas for unusual activity
- ✅ Set up email notifications in Render

---

## 📊 Monitor Your Site

### Render Dashboard:
- View logs: Real-time server logs
- Metrics: CPU, memory usage
- Deployments: History of all deploys

### MongoDB Atlas:
- Cluster metrics: Database performance
- Data Explorer: View/edit data directly
- Monitoring: Query performance

---

## 🚀 Future Updates

To update your live site:

```bash
# Make changes to your code
git add .
git commit -m "Updated feature X"
git push origin main
```

**Render will automatically re-deploy!** (takes 2-3 minutes)

---

## 💡 Pro Tips

1. **Custom Domain**: 
   - Buy domain from Namecheap/GoDaddy
   - Add to Render → Settings → Custom Domain
   - Update DNS records

2. **Environment Variables**:
   - Never commit `.env` file to GitHub
   - Always use Render's environment variables

3. **Database Backups**:
   - MongoDB Atlas auto-backups (free tier)
   - Download backups regularly

4. **Performance**:
   - Render free tier: 512MB RAM
   - Upgrade to paid tier if site gets popular

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string saved
- [ ] Render account created
- [ ] Web service created
- [ ] Environment variables added
- [ ] Site deployed successfully
- [ ] Database initialized (/api/setup/init-db)
- [ ] Jobs seeded (/api/setup/seed-jobs)
- [ ] Tested registration
- [ ] Tested job completion
- [ ] Tested payment system
- [ ] Admin login works

---

## 🎉 CONGRATULATIONS!

Your Micro Works platform is now LIVE and accessible worldwide!

**Share your site**: https://micro-works.onrender.com

**Next Steps**:
1. Share with friends to test
2. Monitor for any issues
3. Collect feedback
4. Add more features
5. Scale up when needed!

---

Need help? Check Render documentation: https://render.com/docs
