# 🚀 START HERE - Test Your Microjob Platform

## ⚡ 3-Step Quick Test

### Step 1: Install MongoDB (One-time, 5 minutes)

**Why?** Your platform needs a database to store jobs, users, and transactions.

**How?**
1. Click this link: **https://www.mongodb.com/try/download/community**
2. Download the Windows installer (the big green button)
3. Run the installer
   - Choose "Complete"
   - ✅ Keep "Install as Windows Service" checked
   - Click "Install"
4. Done! MongoDB is now running in the background

**Need help?** See `INSTALL_LOCAL_MONGODB.md` for screenshots

---

### Step 2: Run the Test Script (30 seconds)

**Option A: Double-click this file:**
```
start-testing.bat
```

**Option B: Or run these commands:**
```bash
npm run init-db
npm run dev
```

**What this does:**
- ✅ Creates database tables
- ✅ Creates admin account
- ✅ Creates 19 job categories
- ✅ Starts the web server

---

### Step 3: Open Your Browser

Go to: **http://localhost:5000**

**🎉 You should see your homepage!**

---

## 🔐 Login Credentials

### Admin Account (Full Access)
- **Email:** admin@example.com
- **Password:** admin123

### Test It:
1. Click "Login" button
2. Enter admin credentials
3. You'll see the admin dashboard

---

## 🧪 Quick 3-Minute Test

### Create Test Accounts:

**1. Create Worker Account:**
- Click "Sign Up"
- Name: Test Worker
- Email: worker@test.com
- Password: test123
- Role: "Find Jobs & Earn Money"
- Click "Create Account"

**2. Create Employer Account:**
- Logout (click your name → Logout)
- Click "Sign Up"
- Name: Test Employer
- Email: employer@test.com
- Password: test123
- Role: "Post Jobs & Hire Workers"
- Click "Create Account"

### Test the Job Flow:

**3. Post a Job (as Employer):**
- Login as: employer@test.com / test123
- Click "Post New Job"
- Title: "Like Facebook Page"
- Category: Social Media
- Price: 50
- Workers: 10
- Click "Post Job"

**4. Apply for Job (as Worker):**
- Logout and login as: worker@test.com / test123
- Go to "Browse Jobs"
- Click on your job
- Click "Apply for this Job"
- Check your dashboard - see your application!

**5. Accept Application (as Employer):**
- Logout and login as: employer@test.com / test123
- Go to Dashboard
- Click "View Applications"
- Click "Accept" on worker's application

**6. Submit Work (as Worker):**
- Login as: worker@test.com / test123
- Go to Dashboard
- Find accepted job
- Click "Submit Work"
- Enter: "Task completed!"
- Submit

**7. Approve & Pay (as Employer):**
- Login as: employer@test.com / test123
- Click "View Applications"
- Click "Approve" on submitted work
- Rating: 5 stars
- Comment: "Great work!"
- Confirm

**8. Check Payment (as Worker):**
- Login as: worker@test.com / test123
- Look at your balance
- **Should show ৳50.00!** 🎉

---

## ✅ Success!

If you got this far, **everything is working perfectly!**

Your platform has:
- ✅ User registration and login
- ✅ Job posting system
- ✅ Application workflow
- ✅ Payment system
- ✅ Complete job lifecycle

---

## 📋 Full Feature Testing

Want to test everything? Use this checklist:

**Quick Test (above):** ⬜ 5 minutes
**Full Test:** See `TESTING_CHECKLIST.md` ⬜ 15 minutes
**Comprehensive Test:** See `LOCAL_TESTING_GUIDE.md` ⬜ 30 minutes

---

## 🎨 Next Steps

### Customize Your Platform:
1. **Change Colors:** Edit `public/css/style.css`
2. **Change Logo/Name:** Edit `public/index.html`
3. **Add Real Jobs:** Post them via employer dashboard

### Add Payment Integration:
1. Get bKash/Nagad API keys
2. Add them to `.env` file
3. Update withdrawal controller

### Deploy to Internet:
- **Heroku:** Free hosting (see README.md)
- **VPS:** Full control (see SETUP_GUIDE.md)
- **Vercel/Netlify:** Frontend only

---

## 🐛 Problems?

### "MongoDB connection failed"
- **Solution:** Install MongoDB first (Step 1 above)
- **Help:** See `INSTALL_LOCAL_MONGODB.md`

### "Port 5000 already in use"
- **Solution:** Edit `.env` file, change `PORT=5000` to `PORT=3000`

### "Can't login"
- **Solution:** Run `npm run init-db` again

### Other Issues?
- Check `LOCAL_TESTING_GUIDE.md` → Troubleshooting section
- Check terminal for error messages

---

## 📞 Support Files

- `START_HERE_TEST.md` ← You are here
- `TESTING_CHECKLIST.md` ← Quick checklist
- `LOCAL_TESTING_GUIDE.md` ← Complete guide with 18 tests
- `INSTALL_LOCAL_MONGODB.md` ← MongoDB installation help
- `QUICK_START.txt` ← Quick reference
- `SETUP_GUIDE.md` ← Full documentation
- `README.md` ← Project overview

---

## 🎉 Ready?

1. Install MongoDB (5 minutes)
2. Run `start-testing.bat`
3. Open http://localhost:5000
4. Follow the 8-step test above

**Your microjob platform will be running in under 10 minutes!**

---

**Happy Testing! 🚀**
