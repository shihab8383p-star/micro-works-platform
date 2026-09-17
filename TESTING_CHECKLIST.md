# 🧪 Quick Testing Checklist

## Before You Start

### ✅ Installation Complete
- [x] Node.js installed (v26.4.0)
- [x] npm installed (v11.17.0)
- [x] All files created
- [x] Dependencies installed
- [ ] **MongoDB installed and running** ⬅️ DO THIS FIRST!

---

## 🚀 Quick Start

### Option 1: Use the Batch Script
```bash
start-testing.bat
```

### Option 2: Manual Commands
```bash
npm run init-db
npm run dev
```

Then open: **http://localhost:5000**

---

## 🧪 Essential Tests (5 minutes)

### Test 1: Homepage ✅
- [ ] Open http://localhost:5000
- [ ] See homepage with features
- [ ] See 19 job categories

### Test 2: Register Users ✅
- [ ] Click "Sign Up"
- [ ] Create worker account: `worker@test.com` / `test123`
- [ ] Create employer account: `employer@test.com` / `test123`

### Test 3: Admin Login ✅
- [ ] Go to http://localhost:5000/login.html
- [ ] Email: `admin@example.com`
- [ ] Password: `admin123`
- [ ] See admin dashboard

### Test 4: Post a Job (Employer) ✅
- [ ] Login as employer
- [ ] Click "Post New Job"
- [ ] Fill: Title, Category, Price (e.g., 50), Workers (e.g., 10)
- [ ] Click "Post Job"
- [ ] See job in "My Posted Jobs"

### Test 5: Apply for Job (Worker) ✅
- [ ] Login as worker
- [ ] Go to Jobs page
- [ ] Click on a job
- [ ] Click "Apply for this Job"
- [ ] Check dashboard - see application

### Test 6: Complete Job Flow ✅
**As Employer:**
- [ ] View applications
- [ ] Accept worker's application

**As Worker:**
- [ ] Submit work with proof
- [ ] Wait for approval

**As Employer:**
- [ ] Approve submitted work
- [ ] Give rating (1-5 stars)

**As Worker:**
- [ ] Check balance - should show payment!

---

## 🎯 Success Indicators

After testing, you should have:
- ✅ 3 accounts (admin, worker, employer)
- ✅ At least 1 posted job
- ✅ At least 1 application
- ✅ At least 1 completed job
- ✅ Worker has money in balance

---

## 🐛 Quick Troubleshooting

### MongoDB Not Connected?
```
❌ Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Install MongoDB - see `INSTALL_LOCAL_MONGODB.md`

### Port Already in Use?
```
❌ Error: Port 5000 already in use
```
**Solution:** Change PORT in `.env` to 3000 or 8000

### Can't Login?
**Solution:** 
1. Run `npm run init-db` again
2. Clear browser cache (Ctrl+Shift+Delete)
3. Try admin credentials: admin@example.com / admin123

---

## 📚 Full Testing Guide

For complete testing with all features, see:
- `LOCAL_TESTING_GUIDE.md` - Comprehensive 18-test checklist
- `QUICK_START.txt` - Quick reference guide

---

## 🎉 Next Steps After Testing

Once everything works:
1. **Customize:** Edit colors in `public/css/style.css`
2. **Add Content:** Create your real job listings
3. **Setup Payments:** Add bKash/Nagad API keys to `.env`
4. **Deploy:** Host on Heroku, VPS, or similar

---

**Ready to test? Install MongoDB first, then run `start-testing.bat`!**
