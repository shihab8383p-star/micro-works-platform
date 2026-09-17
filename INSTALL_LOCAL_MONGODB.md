# 🗄️ Install Local MongoDB - Simplest Method

## Why Local MongoDB?

- ✅ No account needed
- ✅ No configuration
- ✅ Works offline
- ✅ Your .env file is already configured for it!

---

## 📥 Download MongoDB

1. Go to: **https://www.mongodb.com/try/download/community**

2. You'll see:
   - Version: (Keep default - latest)
   - Platform: **Windows**
   - Package: **msi**

3. Click the green **"Download"** button

4. Save the file (mongodb-windows-x86_64-X.X.X.msi)

---

## 📦 Install MongoDB

1. **Run the downloaded .msi file**

2. Click **"Next"** on welcome screen

3. Accept license agreement → Click **"Next"**

4. Choose **"Complete"** installation → Click **"Next"**

5. **IMPORTANT:** On "Service Configuration" screen:
   - ✅ Keep "Install MongoDB as a Service" CHECKED
   - ✅ Keep "Run service as Network Service user" selected
   - Click **"Next"**

6. **Install MongoDB Compass:** 
   - You can UNCHECK this (we don't need it)
   - Click **"Next"**

7. Click **"Install"** button

8. Wait for installation to complete (2-3 minutes)

9. Click **"Finish"**

---

## ✅ Verify Installation

1. Open **Command Prompt**

2. Type:
   ```bash
   mongod --version
   ```

3. If you see version info → MongoDB is installed! ✅

---

## 🚀 Your .env File is Already Ready!

Good news! Your `.env` file already has the correct settings for local MongoDB:

```
MONGODB_URI=mongodb://localhost:27017/microjob-platform
```

**No changes needed!**

---

## 🎯 Start Testing Your Project

Now just run these commands:

```bash
cd "C:\Users\Shihab\Documents\Rockstar Games\Social Club\microjob-platform"
npm run init-db
npm run dev
```

Then open: **http://localhost:5000**

---

## 🐛 If MongoDB Service Doesn't Start

1. Open **Windows Services**:
   - Press `Windows + R`
   - Type: `services.msc`
   - Press Enter

2. Find **"MongoDB Server"** in the list

3. Right-click → **"Start"**

4. Right-click → **"Properties"** → Set Startup type to **"Automatic"**

---

## ✅ That's It!

Much simpler than MongoDB Atlas! Your local database is ready.

**Next:** Run `npm run init-db` to create categories and admin user.
