# 🧪 Complete Local Testing Guide

## ✅ Prerequisites Status

Based on your system:
- ✅ **Node.js v26.4.0** - Installed
- ✅ **npm v11.17.0** - Installed
- ✅ **Project files** - All present
- ✅ **Dependencies** - Installed (155 packages)
- ⚠️ **MongoDB** - Needs setup

---

## 🗄️ MongoDB Setup (Choose One Option)

### Option A: MongoDB Atlas (Recommended - Free Cloud Database)

**Advantages:** No installation, free, always online, automatic backups

#### Steps:

1. **Create Account**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up with email or Google

2. **Create Free Cluster** (Takes 3-5 minutes)
   - Choose "Free" tier (M0)
   - Select closest region (e.g., AWS Singapore)
   - Click "Create Cluster"

3. **Set Up Database Access**
   - Click "Database Access" in left menu
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `admin`
   - Password: `admin123` (or your choice)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Set Up Network Access**
   - Click "Network Access" in left menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for testing)
   - Click "Confirm"

5. **Get Connection String**
   - Click "Database" in left menu
   - Click "Connect" button on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/`

6. **Update .env File**
   - Open: `microjob-platform/.env`
   - Replace the MONGODB_URI line with:
   ```
   MONGODB_URI=mongodb+srv://admin:admin123@cluster0.xxxxx.mongodb.net/microjob-platform?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your actual password
   - Replace `cluster0.xxxxx` with your actual cluster name

---

### Option B: Local MongoDB Installation

**Advantages:** Works offline, faster for development

#### Steps:

1. **Download MongoDB**
   - Go to: https://www.mongodb.com/try/download/community
   - Choose Windows version
   - Download MSI installer

2. **Install MongoDB**
   - Run the installer
   - Choose "Complete" installation
   - Install as Windows Service (checkbox)
   - Keep default settings

3. **Verify Installation**
   ```bash
   mongod --version
   ```

4. **Keep Default .env Settings**
   - The `.env` file is already configured for local MongoDB:
   ```
   MONGODB_URI=mongodb://localhost:27017/microjob-platform
   ```

---

## 🚀 Testing Steps (After MongoDB Setup)

### Step 1: Initialize Database

This creates categories and admin user:

```bash
cd microjob-platform
npm run init-db
```

**Expected Output:**
```
MongoDB Connected: localhost (or Atlas URL)
✓ Categories initialized
✓ Admin user created (email: admin@example.com, password: admin123)
✓ Database initialization complete!
```

### Step 2: Start the Server

```bash
npm run dev
```

**Expected Output:**
```
MongoDB Connected: localhost
Server running on port 5000
```

**Keep this terminal window open!**

### Step 3: Open Browser

Open your web browser and go to:
```
http://localhost:5000
```

You should see the homepage! 🎉

---

## 🧪 Complete Testing Checklist

### Test 1: Homepage ✅

**URL:** http://localhost:5000

**What to Check:**
- [ ] Page loads successfully
- [ ] Navigation bar appears
- [ ] Hero section with title
- [ ] Features grid displays
- [ ] Categories load (should show 19 categories)
- [ ] Footer appears

**Screenshot:** Homepage with features and categories

---

### Test 2: User Registration ✅

**URL:** http://localhost:5000/register.html

**Steps:**
1. Click "Sign Up" in navigation
2. Fill in the form:
   - Name: `Test Worker`
   - Email: `worker@test.com`
   - Phone: `+8801234567890` (optional)
   - Password: `test123`
   - Confirm Password: `test123`
   - Role: `Find Jobs & Earn Money (Worker)`
3. Click "Create Account"

**Expected:**
- ✅ Success notification appears
- ✅ Redirects to dashboard
- ✅ Shows worker dashboard

**Repeat for Employer:**
- Name: `Test Employer`
- Email: `employer@test.com`
- Password: `test123`
- Role: `Post Jobs & Hire Workers (Employer)`

---

### Test 3: User Login ✅

**URL:** http://localhost:5000/login.html

**Test 3.1: Admin Login**
- Email: `admin@example.com`
- Password: `admin123`
- Click "Login"

**Expected:**
- ✅ Success notification
- ✅ Redirects to dashboard
- ✅ Shows "Admin Panel" with links

**Test 3.2: Worker Login**
- Logout (if needed)
- Email: `worker@test.com`
- Password: `test123`

**Expected:**
- ✅ Shows worker dashboard
- ✅ Displays balance (৳0.00)
- ✅ Shows "My Applications" section

**Test 3.3: Employer Login**
- Email: `employer@test.com`
- Password: `test123`

**Expected:**
- ✅ Shows employer dashboard
- ✅ Shows "Post New Job" button
- ✅ Shows "My Posted Jobs" section

---

### Test 4: Job Posting (Employer) ✅

**Login as:** Employer (`employer@test.com`)

**Steps:**
1. Go to Dashboard
2. Click "Post New Job" button
3. Fill in the form:
   - Job Title: `Facebook Page Like`
   - Category: Select `Social Media`
   - Description: `Like our Facebook page and provide screenshot proof`
   - Price per Worker: `50`
   - Number of Workers: `10`
   - Duration: `1 hour`
   - Requirements: `Must have Facebook account`
4. Click "Post Job"

**Expected:**
- ✅ Success notification
- ✅ Modal closes
- ✅ Job appears in "My Posted Jobs" table

**Post 2-3 more jobs for variety!**

---

### Test 5: Browse Jobs ✅

**URL:** http://localhost:5000/jobs.html

**What to Check:**
- [ ] All posted jobs appear
- [ ] Category filter works
- [ ] Search functionality works
- [ ] Sort options work
- [ ] Price filters work
- [ ] Job cards show correct information
- [ ] Click on job card opens modal

**Test Filters:**
1. Select "Social Media" category → Should filter
2. Enter "Facebook" in search → Should filter
3. Change sort to "Price: High to Low" → Should reorder
4. Set Min Price: 40, Max Price: 100 → Should filter

---

### Test 6: Job Application (Worker) ✅

**Login as:** Worker (`worker@test.com`)

**Steps:**
1. Go to http://localhost:5000/jobs.html
2. Click on any job card
3. Read job details in modal
4. Click "Apply for this Job"

**Expected:**
- ✅ Success notification: "Application submitted successfully!"
- ✅ Modal closes
- ✅ Go to Dashboard → Application appears in "My Applications"

**Apply for 2-3 different jobs**

---

### Test 7: Application Management (Employer) ✅

**Login as:** Employer (`employer@test.com`)

**Steps:**
1. Go to Dashboard
2. Find your posted job with applications
3. Click "View Applications"
4. See the application from worker
5. Click "Accept" button

**Expected:**
- ✅ Success notification
- ✅ Application status changes to "accepted"
- ✅ Worker count increases

---

### Test 8: Submit Work (Worker) ✅

**Login as:** Worker (`worker@test.com`)

**Steps:**
1. Go to Dashboard
2. Find accepted application
3. Click "Submit Work" button
4. Enter description: `I have completed the task. Screenshot attached.`
5. Click OK

**Expected:**
- ✅ Success notification
- ✅ Status changes to "submitted"

---

### Test 9: Review & Pay (Employer) ✅

**Login as:** Employer (`employer@test.com`)

**Steps:**
1. Go to Dashboard
2. Click "View Applications" on job
3. Find submitted work
4. Click "Approve" button
5. Enter rating: `5`
6. Enter comment: `Great work! Thank you.`
7. Confirm

**Expected:**
- ✅ Success notification
- ✅ Status changes to "completed"
- ✅ Worker receives payment

---

### Test 10: Check Payment (Worker) ✅

**Login as:** Worker (`worker@test.com`)

**Steps:**
1. Go to Dashboard
2. Check balance

**Expected:**
- ✅ Balance shows payment amount (e.g., ৳50.00)
- ✅ Total Earned updated
- ✅ Completed Jobs count increased
- ✅ Transaction appears in "Recent Transactions"

---

### Test 11: Withdrawal Request (Worker) ✅

**Steps:**
1. While logged in as Worker
2. Click "Withdraw Money" button
3. Fill form:
   - Amount: `100` (Note: Min is 100)
   - Payment Method: `bKash`
   - Account Number: `01712345678`
   - Account Name: `Test Worker`
4. Click "Request Withdrawal"

**Expected:**
- ✅ Success notification
- ✅ Balance deducted
- ✅ Withdrawal appears in transactions

**Note:** If balance is less than 100, complete more jobs first!

---

### Test 12: Process Withdrawal (Admin) ✅

**Login as:** Admin (`admin@example.com` / `admin123`)

**Steps:**
1. Go to Dashboard
2. Click "Manage Withdrawals"
3. See pending withdrawal request
4. Click "Approve" button
5. Enter transaction ID: `TXN123456`
6. Enter notes: `Payment sent via bKash`
7. Confirm

**Expected:**
- ✅ Success notification
- ✅ Status changes to "completed"
- ✅ Transaction ID saved

---

### Test 13: Search & Filter Jobs ✅

**URL:** http://localhost:5000/jobs.html

**Test Cases:**
1. **Search by keyword:**
   - Enter "Facebook" → Shows matching jobs

2. **Filter by category:**
   - Select "Social Media" → Shows only social media jobs

3. **Filter by price:**
   - Min: 40, Max: 100 → Shows jobs in range

4. **Sort:**
   - Select "Price: High to Low" → Reorders correctly

5. **Combined filters:**
   - Category + Search + Price → All filters work together

---

### Test 14: Profile Update ✅

**Steps:**
1. Login as any user
2. Click on your name in navigation
3. Update:
   - Name
   - Phone
   - Bio
4. Save changes

**Expected:**
- ✅ Success notification
- ✅ Changes saved
- ✅ Updated name appears in navigation

---

### Test 15: Responsive Design ✅

**Test on Different Screen Sizes:**

1. **Desktop (>1200px):**
   - Open browser in full screen
   - Check layout looks good

2. **Tablet (768-1199px):**
   - Resize browser window
   - Check responsive grid

3. **Mobile (<768px):**
   - Resize to mobile size
   - Check navigation adapts
   - Check cards stack vertically
   - Check buttons are touch-friendly

---

## 🐛 Troubleshooting Common Issues

### Issue 1: "Cannot connect to MongoDB"

**Symptoms:**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**
1. If using local MongoDB:
   - Make sure MongoDB service is running
   - Check Windows Services for "MongoDB"
   - Restart if needed

2. If using MongoDB Atlas:
   - Check internet connection
   - Verify connection string in .env
   - Check password doesn't have special characters
   - Make sure IP is whitelisted (0.0.0.0/0 for testing)

---

### Issue 2: "Port 5000 already in use"

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution 1:** Stop the other process
```bash
# Find process using port 5000
netstat -ano | findstr :5000
# Kill the process (replace PID)
taskkill /PID <PID> /F
```

**Solution 2:** Change port in .env
```
PORT=3000
```

---

### Issue 3: "Cannot find module"

**Solution:**
```bash
npm install
```

---

### Issue 4: "JWT malformed" or "Unauthorized"

**Solution:**
- Clear browser localStorage
- Logout and login again
- Or open browser DevTools (F12) → Application → Local Storage → Delete all

---

### Issue 5: Jobs not appearing

**Possible Causes:**
1. Not logged in as employer when posting
2. Job status is not "active"
3. Database not initialized

**Solution:**
```bash
npm run init-db
```

---

## 📊 Testing Checklist Summary

| Test | Status |
|------|--------|
| 1. Homepage loads | ⬜ |
| 2. Register worker account | ⬜ |
| 3. Register employer account | ⬜ |
| 4. Login as admin | ⬜ |
| 5. Login as worker | ⬜ |
| 6. Login as employer | ⬜ |
| 7. Post a job (employer) | ⬜ |
| 8. Browse jobs | ⬜ |
| 9. Apply for job (worker) | ⬜ |
| 10. Accept application (employer) | ⬜ |
| 11. Submit work (worker) | ⬜ |
| 12. Approve work (employer) | ⬜ |
| 13. Check payment received (worker) | ⬜ |
| 14. Request withdrawal (worker) | ⬜ |
| 15. Approve withdrawal (admin) | ⬜ |
| 16. Search & filter jobs | ⬜ |
| 17. Update profile | ⬜ |
| 18. Responsive design | ⬜ |

---

## 🎯 Expected Test Results

After completing all tests, you should have:

- ✅ 3 user accounts (admin, worker, employer)
- ✅ 3-5 posted jobs
- ✅ Several applications
- ✅ Completed jobs with payments
- ✅ Transactions logged
- ✅ Withdrawal requests processed
- ✅ All features working

---

## 📸 What Success Looks Like

### Homepage
- Navigation bar with logo and links
- Hero section with title and buttons
- Features grid (6 cards)
- Categories section (19 categories)
- Footer

### Dashboard (Worker)
- Balance card showing ৳0.00 (or earned amount)
- My Applications table
- Recent Transactions table
- Withdraw Money button

### Dashboard (Employer)
- Balance and stats cards
- My Posted Jobs table
- Post New Job button
- View Applications button

### Dashboard (Admin)
- Admin Panel links
- Manage Withdrawals
- Manage Users
- Manage Jobs
- Manage Categories

---

## 🚀 Performance Benchmarks

Expected load times (on localhost):
- Homepage: < 100ms
- Job listings: < 200ms
- Dashboard: < 300ms
- API calls: < 50ms

---

## 📝 Testing Notes

### Test Data Setup

For comprehensive testing, create:
- 2 worker accounts
- 2 employer accounts
- 5-10 different jobs
- Various job categories
- Multiple applications
- Different job statuses

### Testing Scenarios

1. **Happy Path:** Everything works perfectly
2. **Error Cases:** Invalid inputs, insufficient balance
3. **Edge Cases:** Max workers reached, expired jobs
4. **Security:** Unauthorized access attempts

---

## ✅ All Tests Passed?

Congratulations! 🎉

Your microjob platform is fully functional and ready for:
- Customization (colors, content, branding)
- Adding your real job listings
- Deployment to production
- Launch to users!

---

## 📞 Need Help?

If any test fails:
1. Check the error message in browser console (F12)
2. Check terminal for server errors
3. Review this guide's troubleshooting section
4. Check SETUP_GUIDE.md for detailed steps
5. Verify MongoDB connection

---

**Happy Testing! 🧪**
