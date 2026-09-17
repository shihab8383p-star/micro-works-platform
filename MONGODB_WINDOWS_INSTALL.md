# 🗄️ MongoDB Installation Guide for Windows

## Step-by-Step Installation (5 minutes)

### Step 1: Download MongoDB (1 minute)

1. **Go to MongoDB Download Page:**
   ```
   https://www.mongodb.com/try/download/community
   ```

2. **Select these options:**
   - **Version:** 7.0.x (Current)
   - **Platform:** Windows
   - **Package:** msi

3. **Click the green "Download" button**
   - File name: `mongodb-windows-x86_64-7.0.x-signed.msi`
   - Size: ~300-400 MB
   - Wait for download to complete

---

### Step 2: Run the Installer (2 minutes)

1. **Double-click the downloaded .msi file**

2. **Setup Wizard - Click "Next"**

3. **License Agreement:**
   - ✅ Check "I accept the terms..."
   - Click "Next"

4. **Choose Setup Type:**
   - Select **"Complete"** (recommended)
   - Click "Next"

5. **Service Configuration (IMPORTANT):**
   ```
   ✅ Install MongoDB as a Service
   ✅ Run service as Network Service user
   
   Service Name: MongoDB
   Data Directory: C:\Program Files\MongoDB\Server\7.0\data\
   Log Directory: C:\Program Files\MongoDB\Server\7.0\log\
   ```
   - **Keep all defaults checked**
   - Click "Next"

6. **MongoDB Compass:**
   - ✅ Keep "Install MongoDB Compass" checked (optional but useful)
   - Click "Next"

7. **Ready to Install:**
   - Click **"Install"**
   - Wait 1-2 minutes for installation

8. **User Account Control:**
   - Click "Yes" to allow changes

9. **Installation Complete:**
   - Click "Finish"

---

### Step 3: Verify Installation (1 minute)

**Open Command Prompt and test:**

```bash
mongod --version
```

**Expected output:**
```
db version v7.0.x
Build Info: ...
```

**Test MongoDB connection:**
```bash
mongosh --version
```

**Expected output:**
```
2.x.x
```

---

### Step 4: Check MongoDB Service (30 seconds)

1. **Press Windows + R**
2. **Type:** `services.msc`
3. **Press Enter**
4. **Find "MongoDB" in the list**
5. **Status should be:** "Running"

✅ If running, you're all set!

❌ If not running:
   - Right-click "MongoDB"
   - Click "Start"

---

## 🎉 Installation Complete!

MongoDB is now:
- ✅ Installed on your computer
- ✅ Running as a Windows service
- ✅ Auto-starts when Windows boots
- ✅ Ready to use at: `mongodb://localhost:27017`

---

## 🚀 Next Steps - Test Your Platform

Now that MongoDB is installed, run:

```bash
cd C:\Users\Shihab\Documents\Rockstar Games\Social Club\microjob-platform
start-testing.bat
```

Or manually:
```bash
npm run init-db
npm run dev
```

Then open: **http://localhost:5000**

---

## 🐛 Troubleshooting

### Problem: "mongod is not recognized"

**Solution:** Add MongoDB to system PATH

1. Press Windows + R
2. Type: `sysdm.cpl` and press Enter
3. Click "Advanced" tab
4. Click "Environment Variables"
5. Under "System Variables", find "Path"
6. Click "Edit"
7. Click "New"
8. Add: `C:\Program Files\MongoDB\Server\7.0\bin`
9. Click "OK" on all windows
10. **Close and reopen Command Prompt**

### Problem: MongoDB service won't start

**Solution 1:** Run as administrator
```bash
net start MongoDB
```

**Solution 2:** Check if port 27017 is in use
```bash
netstat -ano | findstr :27017
```

If something is using it, either:
- Stop that service
- Or change MongoDB port in `.env` file

### Problem: "Access Denied" during installation

**Solution:** Right-click the installer → "Run as administrator"

---

## 📱 MongoDB Compass (Optional GUI)

If you installed MongoDB Compass, you can:

1. **Open MongoDB Compass**
2. **Connection String:** `mongodb://localhost:27017`
3. **Click "Connect"**
4. **View your databases visually**

This is useful for:
- Viewing data in tables
- Running queries
- Managing databases
- Debugging

---

## 🔧 Alternative: MongoDB Atlas (Cloud)

If you don't want to install MongoDB locally:

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Create free cluster (M0 - Free Forever)
4. Get connection string
5. Update `.env` file:
   ```
   MONGODB_URI=your_atlas_connection_string
   ```

See `MONGODB_ATLAS_SETUP.md` for detailed cloud setup.

---

## ✅ Quick Verification Commands

**Check MongoDB is running:**
```bash
mongosh
```

Should connect and show:
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017
Using MongoDB: 7.0.x
```

**Exit mongosh:**
```
exit
```

---

## 📊 What MongoDB Does for Your Platform

MongoDB stores:
- 👥 User accounts (workers, employers, admins)
- 💼 Job listings
- 📝 Applications
- 💰 Transactions
- 💳 Withdrawal requests
- 📂 19 Job categories

---

## 🎯 Summary

✅ Downloaded MongoDB installer  
✅ Ran installer with default settings  
✅ Installed as Windows service  
✅ Verified installation  
✅ Ready to use  

**Total time:** 5 minutes

---

## 📞 Need Help?

- **Official Docs:** https://docs.mongodb.com/manual/installation/
- **Community:** https://community.mongodb.com/
- **YouTube:** Search "install mongodb windows"

---

**Your MongoDB is ready! Now run `start-testing.bat` to test your platform! 🚀**
