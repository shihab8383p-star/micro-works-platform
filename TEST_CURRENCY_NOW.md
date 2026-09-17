# 🎯 Test Currency Update - Ready to Test!

## ✅ System Status

- **MongoDB**: ✅ Running
- **Server**: ✅ Running on http://localhost:5000
- **Database**: ✅ Seeded with 50 jobs (Taka currency)
- **Currency**: ✅ Changed from USD ($) to BDT (৳)

---

## 🧪 Testing Checklist

### 1. **View Homepage**
- Open: http://localhost:5000
- Check: Platform name should say "Micro Works"
- Check: Any price displays should show ৳ symbol

### 2. **Register New Account**
- Open: http://localhost:5000/register.html
- Create account with:
  - Name: Test User
  - Email: test@test.com
  - Password: test123 (minimum 6 characters)
  - Phone: 01712345678
- ✅ Should redirect to dashboard after successful registration

### 3. **Check Dashboard**
- URL: http://localhost:5000/dashboard.html
- **Verify Balance Display**: Should show ৳0.00 (with Taka symbol)
- **Verify Stats**: All amounts should display with ৳ symbol

### 4. **View Jobs Page**
- Open: http://localhost:5000/jobs.html
- **Check Day Rotation Banner**: Should show "Day 1", "Day 2", or "Day 3"
- **Check Job Prices**: Each job should show ৳5.00 to ৳10.00
- **Verify**: All tasks show Taka symbol (৳), NOT dollar ($)

### 5. **Complete a Task**
- On jobs page, click "Start Task" on any job
- New window opens with task link
- **Wait 10 seconds** - countdown should appear
- After 10 seconds, window closes automatically
- **Check Dashboard**: Your balance should increase by ৳5-10

### 6. **Test Daily Limit**
- Try to complete the SAME task again immediately
- Should show error: "You can only complete this task once per day"
- ✅ This confirms daily limit is working

### 7. **Test Referral System**
- Go to: http://localhost:5000/referrals.html
- **Check Referral Code**: Should show your unique code
- **Check Referral Link**: Should be ready to copy
- **Verify Display**: All earnings should show ৳ symbol

### 8. **Test Withdrawal (Should Fail)**
- Go to Dashboard
- Try to withdraw ৳100 (less than minimum)
- **Expected Error**: "Minimum withdrawal amount is ৳500"
- ✅ This confirms minimum withdrawal of 500 TK is working

### 9. **Complete Multiple Tasks to Reach ৳500**
- Complete different tasks throughout the day
- Each task gives ৳5-10
- Need to complete approximately 50-100 tasks to reach ৳500
- **OR** use admin panel to manually add balance for testing

### 10. **Test Successful Withdrawal**
- Once balance is ≥৳500, try withdrawal
- Fill in:
  - Method: bKash, Nagad, or Rocket
  - Account Number: 01712345678
  - Account Name: Test User
  - Amount: ৳500
- Should succeed and create withdrawal request

---

## 📊 Expected Values

### Job Prices (Random Range):
- Minimum: ৳5.00
- Maximum: ৳10.00

### Day Distribution:
- **Day 1**: 20 jobs worth ৳152 total
- **Day 2**: 15 jobs worth ৳114 total
- **Day 3**: 15 jobs worth ৳117 total

### Withdrawal Limits:
- **Minimum**: ৳500
- **Withdrawal Fee**: 2% (e.g., ৳500 → Fee ৳10 → Net ৳490)

### Referral Commission:
- **Rate**: 10% of referral earnings
- **Example**: Referral earns ৳10 → You get ৳1.00

---

## 🐛 What to Test For

### ✅ Currency Symbol Should Be ৳ (Taka) Everywhere:
- Dashboard balance
- Job prices on jobs.html
- Transaction history
- Withdrawal amounts
- Referral earnings

### ❌ Should NOT See Dollar Signs ($):
- No $5.00 or $0.05
- Only ৳ symbol should appear

### ✅ Numeric Values Should Be Correct:
- Jobs pay 5-10 (not 0.05-0.10)
- Minimum withdrawal 500 (not 5)
- Referral commission 10% (e.g., ৳1 not ৳0.01)

---

## 🔧 Quick Test Commands

### View Current Jobs in Database:
```bash
node -e "const mongoose = require('mongoose'); const Job = require('./models/Job'); mongoose.connect('mongodb://localhost:27017/microjob-platform').then(async () => { const jobs = await Job.find().limit(5).select('title price dayRotation'); console.log(jobs); process.exit(0); });"
```

### Check User Balance:
```bash
node -e "const mongoose = require('mongoose'); const User = require('./models/User'); mongoose.connect('mongodb://localhost:27017/microjob-platform').then(async () => { const user = await User.findOne({ email: 'test@test.com' }); console.log('Balance:', user.balance); process.exit(0); });"
```

### Add Test Balance (For Testing Withdrawal):
```bash
node -e "const mongoose = require('mongoose'); const User = require('./models/User'); mongoose.connect('mongodb://localhost:27017/microjob-platform').then(async () => { await User.findOneAndUpdate({ email: 'test@test.com' }, { balance: 600 }); console.log('Balance updated to 600 TK'); process.exit(0); });"
```

---

## 📱 Access URLs

- **Homepage**: http://localhost:5000
- **Login**: http://localhost:5000/login.html
- **Register**: http://localhost:5000/register.html
- **Dashboard**: http://localhost:5000/dashboard.html
- **Jobs**: http://localhost:5000/jobs.html
- **Referrals**: http://localhost:5000/referrals.html
- **Admin Withdrawals**: http://localhost:5000/admin-withdrawals.html

---

## 👤 Test Accounts

### Admin Account:
- **Email**: admin@example.com
- **Password**: admin123
- **Purpose**: Approve withdrawals, view all transactions

### Your Test Account:
- **Email**: (create new during testing)
- **Password**: (your choice, min 6 characters)

---

## ✅ Success Criteria

All tests pass when:
1. ✅ All prices display with ৳ symbol (not $)
2. ✅ Jobs pay 5-10 TK per task
3. ✅ Minimum withdrawal is 500 TK
4. ✅ Auto-payment works after 10 seconds
5. ✅ Daily task limit works (can't repeat same task)
6. ✅ Day rotation shows correct tasks (Day 1/2/3)
7. ✅ Referral commission is 10% in Taka
8. ✅ Dashboard balance updates correctly

---

## 🚀 Ready to Start Testing!

**Current Status**: Server is running at http://localhost:5000

**Start Here**: Open http://localhost:5000 in your browser and follow the checklist above!
