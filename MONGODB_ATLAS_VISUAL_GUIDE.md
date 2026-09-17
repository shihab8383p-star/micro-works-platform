# 🗄️ MongoDB Atlas - Step-by-Step Visual Guide

## 🎯 What We're Doing

Setting up a free cloud database for your microjob platform.

---

## 📋 PART 1: Create Account & Cluster

### Step 1: Create Account

1. Go to: **https://www.mongodb.com/cloud/atlas/register**

2. You'll see a signup form with options:
   - **Option A:** Email signup
   - **Option B:** Sign up with Google
   
3. Choose one and create your account

4. Verify your email if required

---

### Step 2: Choose Deployment Type

After login, you'll see: **"Deploy a cloud database"**

You'll see 3 options:

```
┌─────────────────────┐
│   SERVERLESS        │  (Skip this)
└─────────────────────┘

┌─────────────────────┐
│   SHARED            │  ← CHOOSE THIS (FREE)
│   M0 - FREE        │
│   [CREATE] button   │
└─────────────────────┘

┌─────────────────────┐
│   DEDICATED         │  (Skip this)
└─────────────────────┘
```

**Click the green "CREATE" button under SHARED (M0 - FREE)**

---

### Step 3: Configure Your Cluster

You'll see a configuration page:

1. **Cloud Provider:** 
   - AWS (selected by default) ✓
   - Keep this

2. **Region:**
   - Choose closest to you
   - Asia options: Singapore, Mumbai, Tokyo
   - Keep the one with "FREE TIER AVAILABLE" label

3. **Cluster Name:**
   - Default: "Cluster0"
   - You can keep it or change to "microjob-cluster"

4. **Click: "Create Deployment"** (green button at bottom)

5. **Wait 3-5 minutes** while cluster is created ☕

---

## 📋 PART 2: Security Setup (THIS IS WHERE YOU'RE STUCK!)

After cluster creation, you'll see a **"Security Quickstart"** popup:

```
┌────────────────────────────────────────────┐
│  Security Quickstart                       │
│                                            │
│  Step 1: How would you like to            │
│  authenticate your connection?             │
│                                            │
│  ○ Username and Password  ← SELECT THIS   │
│  ○ Certificate                             │
│                                            │
│  Username: [admin      ]                   │
│  Password: [••••••••••]  [Autogenerate]   │
│                                            │
│  [Create User] button                      │
└────────────────────────────────────────────┘
```

### Step 4: Create Database User (FIRST SECURITY STEP)

**On this popup:**

1. Select: **"Username and Password"** (radio button)

2. Enter credentials:
   - **Username:** `admin`
   - **Password:** `admin123`
   
   OR click "Autogenerate Secure Password" (save it!)

3. **Click: "Create User"** button

**✅ First security step done!**

---

### Step 5: Network Access (SECOND SECURITY STEP)

**Still on the same popup, scroll down:**

```
┌────────────────────────────────────────────┐
│  Step 2: Where would you like to          │
│  connect from?                             │
│                                            │
│  ○ My Local Environment  ← SELECT THIS    │
│  ○ Cloud Environment                       │
│                                            │
│  IP Address: [            ]                │
│                                            │
│  Or choose from:                           │
│  • Add My Current IP Address              │
│  • Allow Access from Anywhere  ← CLICK!   │
│                                            │
│  [Add Entry] or [Finish and Close]        │
└────────────────────────────────────────────┘
```

1. Select: **"My Local Environment"** (radio button)

2. **Click: "Allow Access from Anywhere"** link

3. This will automatically add: `0.0.0.0/0`

4. **Click: "Finish and Close"** button

**✅ Network access configured!**

---

## 📋 PART 3: Alternative Method (If You Missed the Popup)

### If You Already Closed the Popup:

Look at the **LEFT SIDEBAR** in MongoDB Atlas:

```
┌─────────────────────┐
│  DEPLOYMENT         │
│  • Overview         │
│  • Database    ←──┐ │
│  • Clusters        │ │
│                    │ │
│  SECURITY          │ │
│  • Database Access ←┼─── TO CREATE USER
│  • Network Access  ←┼─── TO ALLOW ACCESS
│  • Encryption      │ │
│                    │ │
│  DATA SERVICES     │ │
│  • Charts          │ │
└─────────────────────┘
```

---

### Step 6A: Create User (Manual Method)

**If you need to create user manually:**

1. Click **"Database Access"** in left sidebar (under SECURITY section)

2. You'll see a page titled: **"Database Access"**

3. Click green button: **"+ ADD NEW DATABASE USER"** (top right)

4. A form will appear:

```
┌────────────────────────────────────────────┐
│  Add New Database User                     │
│                                            │
│  Authentication Method:                    │
│  • Password  ← SELECT THIS                │
│  • Certificate                             │
│  • AWS IAM                                 │
│                                            │
│  Username: [admin          ]               │
│  Password: [admin123       ]               │
│           [Autogenerate Secure Password]   │
│                                            │
│  Database User Privileges:                 │
│  • Built-in Role                           │
│    [Read and write to any database] ↓      │
│                                            │
│  [Cancel]  [Add User]                      │
└────────────────────────────────────────────┘
```

5. Fill in:
   - **Authentication Method:** Password (already selected)
   - **Username:** `admin`
   - **Password:** `admin123`
   - **Privileges:** Keep default "Read and write to any database"

6. **Click: "Add User"** (green button at bottom)

**✅ User created!**

---

### Step 6B: Allow Network Access (Manual Method)

**If you need to configure network access manually:**

1. Click **"Network Access"** in left sidebar (under SECURITY section)

2. You'll see a page titled: **"Network Access"**

3. Click green button: **"+ ADD IP ADDRESS"** (top right)

4. A popup will appear:

```
┌────────────────────────────────────────────┐
│  Add IP Access List Entry                  │
│                                            │
│  Access List Entry:                        │
│  [0.0.0.0/0         ]                      │
│                                            │
│  Or choose from:                           │
│  [ADD CURRENT IP ADDRESS]  ← Click this   │
│  [ALLOW ACCESS FROM ANYWHERE]  ← Or this  │
│                                            │
│  Comment (optional):                       │
│  [Allow all for testing]                   │
│                                            │
│  [Cancel]  [Confirm]                       │
└────────────────────────────────────────────┘
```

5. **Click: "ALLOW ACCESS FROM ANYWHERE"** button

   This automatically fills: `0.0.0.0/0`

6. **Click: "Confirm"** (green button)

**✅ Network access configured!**

---

## 📋 PART 4: Get Connection String

### Step 7: Connect to Your Cluster

1. Go back to **"Database"** in left sidebar

2. You'll see your cluster (Cluster0 or whatever you named it)

3. Look for the **"Connect"** button and click it:

```
┌─────────────────────────────┐
│  Cluster0                   │
│  M0 Sandbox                 │
│  AWS / us-east-1            │
│                             │
│  [Connect] ← CLICK THIS     │
│  [Browse Collections]       │
│  [Metrics]                  │
│  ...                        │
└─────────────────────────────┘
```

4. A modal will appear with 3 options:

```
┌────────────────────────────────────────────┐
│  Connect to Cluster0                       │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │  Compass                             │ │
│  │  MongoDB GUI                         │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │  Drivers                             │ │ ← CLICK THIS
│  │  Connect your application            │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │  MongoDB Shell                       │ │
│  │  Connect with mongosh                │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

5. **Click: "Drivers"** (middle option)

---

### Step 8: Copy Connection String

You'll see:

```
┌────────────────────────────────────────────┐
│  Connect to Cluster0                       │
│                                            │
│  Driver: Node.js      Version: 5.5 or later│
│                                            │
│  3. Add your connection string            │
│                                            │
│  mongodb+srv://admin:<password>@cluster... │
│  [📋 Copy]  ← CLICK TO COPY               │
│                                            │
│  Replace <password> with the password     │
│  for the admin user.                      │
└────────────────────────────────────────────┘
```

1. **Click the "Copy" button** (📋 icon)

2. Your connection string looks like:
```
mongodb+srv://admin:<password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
```

---

## 📋 PART 5: Update Your Project

### Step 9: Update .env File

1. **Open:** `microjob-platform\.env` file

2. **Find this line:**
```
MONGODB_URI=mongodb://localhost:27017/microjob-platform
```

3. **Replace with your connection string:**
```
MONGODB_URI=mongodb+srv://admin:admin123@cluster0.abc123.mongodb.net/microjob-platform?retryWrites=true&w=majority
```

**Important changes:**
- Replace `<password>` with `admin123` (your actual password)
- Replace `cluster0.abc123` with your actual cluster name
- Add `/microjob-platform` before the `?` to specify database name

**Your final line should look like:**
```
MONGODB_URI=mongodb+srv://admin:admin123@cluster0.abc123.mongodb.net/microjob-platform?retryWrites=true&w=majority
```

4. **Save the file**

---

## ✅ VERIFICATION

### Step 10: Test Your Setup

1. Open Command Prompt in project folder:
```bash
cd "C:\Users\Shihab\Documents\Rockstar Games\Social Club\microjob-platform"
```

2. Run:
```bash
npm run init-db
```

3. **Expected output:**
```
MongoDB Connected: cluster0.abc123.mongodb.net
✓ Categories initialized
✓ Admin user created (email: admin@example.com, password: admin123)
✓ Database initialization complete!
```

**✅ If you see this, SUCCESS!**

---

## 🐛 If You Still Can't Find It

### Quick Navigation Help:

After logging into MongoDB Atlas, look for these sections:

**LEFT SIDEBAR:**
```
┌─────────────────────┐
│ [MongoDB Logo]      │
│                     │
│ DEPLOYMENT          │
│ ├─ Overview        │
│ ├─ Database        │  ← Start here
│ └─ Clusters        │
│                     │
│ SECURITY            │
│ ├─ Database Access │  ← Create user here
│ ├─ Network Access  │  ← Allow 0.0.0.0/0 here
│ └─ Encryption      │
└─────────────────────┘
```

### Still Stuck? Try This Order:

1. **Click "Database"** (left sidebar)
2. **Click "Connect"** on your cluster
3. If it asks for security setup → Follow the popup
4. If no popup → Go to "Database Access" manually
5. Then go to "Network Access" manually

---

## 📞 Exact Locations Summary

| What You Need | Where to Find It | Button to Click |
|---------------|------------------|-----------------|
| **Create User** | SECURITY → Database Access | "+ ADD NEW DATABASE USER" |
| **Username** | Username field | Type: `admin` |
| **Password** | Password field | Type: `admin123` |
| **Allow Access** | SECURITY → Network Access | "+ ADD IP ADDRESS" |
| **0.0.0.0/0** | IP Access modal | "ALLOW ACCESS FROM ANYWHERE" |
| **Connection String** | Database → Connect button | "Drivers" → Copy button |

---

## 🎯 Quick Checklist

After setup, verify these exist:

### In MongoDB Atlas:
- [ ] Cluster created (visible in Database page)
- [ ] User exists (check Database Access page)
- [ ] 0.0.0.0/0 exists (check Network Access page)
- [ ] Connection string copied

### In Your Project:
- [ ] .env file updated with connection string
- [ ] Password replaced in connection string
- [ ] Database name added (/microjob-platform)

---

## 🆘 Still Having Trouble?

**Take a screenshot of what you see and:**

1. Check if you're on the right page:
   - URL should be: `https://cloud.mongodb.com`
   - You should see "MongoDB Atlas" at the top

2. Look for the left sidebar with sections:
   - DEPLOYMENT
   - SECURITY ← You need this section

3. If you don't see these:
   - Try logging out and back in
   - Clear browser cache
   - Try a different browser

---

**The key locations are:**
- **User creation:** SECURITY → Database Access
- **Network access:** SECURITY → Network Access
- **Connection string:** Database → [Your Cluster] → Connect

---

Need more help? The official MongoDB Atlas tutorial is at:
https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster/

Good luck! You're almost there! 🚀
