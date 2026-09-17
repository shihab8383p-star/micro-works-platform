# 🗄️ MongoDB Atlas Setup Guide (Free Cloud Database)

## Why MongoDB Atlas?

✅ **Free forever** - No credit card required  
✅ **No installation** - Works immediately  
✅ **Always online** - Cloud-based  
✅ **Automatic backups** - Data is safe  
✅ **Easy to use** - Simple setup  

Perfect for testing and even production use!

---

## 📋 Step-by-Step Setup (10 minutes)

### Step 1: Create Account

1. Go to: **https://www.mongodb.com/cloud/atlas/register**

2. Sign up using:
   - Email and password, OR
   - Sign in with Google

3. Fill in basic information:
   - First name
   - Last name
   - Organization name: `Personal` or `Your Name`

4. Click **"Create Account"** or **"Sign Up"**

---

### Step 2: Create Free Cluster

1. You'll see **"Deploy a cloud database"** page

2. Choose the **FREE** option:
   - Look for **"Shared"** (M0 - Free tier)
   - Click **"Create"**

3. Configure cluster:
   - **Cloud Provider:** AWS (recommended)
   - **Region:** Choose closest to you
     - Asia: Singapore, Mumbai, Tokyo
     - Europe: Frankfurt, Ireland, London
     - Americas: Virginia, Oregon, São Paulo
   - **Cluster Name:** Keep default or name it `Cluster0`

4. Click **"Create Cluster"**

5. Wait 3-5 minutes for cluster to be created ☕

---

### Step 3: Create Database User

1. On the left sidebar, click **"Database Access"**

2. Click **"Add New Database User"**

3. Choose **"Password"** authentication

4. Fill in:
   - **Username:** `admin`
   - **Password:** `admin123` (or click "Autogenerate Secure Password")
   - ⚠️ **Remember these credentials!**

5. Database User Privileges:
   - Select: **"Read and write to any database"**

6. Click **"Add User"**

---

### Step 4: Set Network Access

1. On the left sidebar, click **"Network Access"**

2. Click **"Add IP Address"**

3. For testing, choose:
   - Click **"Allow Access from Anywhere"**
   - This adds `0.0.0.0/0` to whitelist

4. Click **"Confirm"**

⚠️ **Note:** For production, you should whitelist only your server's IP.

---

### Step 5: Get Connection String

1. On the left sidebar, click **"Database"**

2. Find your cluster (Cluster0)

3. Click the **"Connect"** button

4. Choose **"Connect your application"**

5. Settings:
   - Driver: **Node.js**
   - Version: **5.5 or later** (default)

6. **Copy the connection string** - it looks like:
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

---

### Step 6: Update Your .env File

1. Open your project folder: `microjob-platform`

2. Open the file: `.env`

3. Find the line:
   ```
   MONGODB_URI=mongodb://localhost:27017/microjob-platform
   ```

4. Replace it with your connection string:
   ```
   MONGODB_URI=mongodb+srv://admin:admin123@cluster0.xxxxx.mongodb.net/microjob-platform?retryWrites=true&w=majority
   ```

5. **Important changes:**
   - Replace `<password>` with your actual password (`admin123`)
   - Replace `cluster0.xxxxx` with your actual cluster details
   - Add `/microjob-platform` before the `?` to specify database name

**Example:**
```
MONGODB_URI=mongodb+srv://admin:admin123@cluster0.abc123.mongodb.net/microjob-platform?retryWrites=true&w=majority
```

6. **Save the file**

---

### Step 7: Test Connection

1. Open terminal in project folder

2. Run:
   ```bash
   npm run init-db
   ```

3. **Expected output:**
   ```
   MongoDB Connected: cluster0.xxxxx.mongodb.net
   ✓ Categories initialized
   ✓ Admin user created (email: admin@example.com, password: admin123)
   ✓ Database initialization complete!
   ```

4. If you see errors, check Step 8 below!

---

## ✅ Success Checklist

After setup, verify:

- [ ] Account created on MongoDB Atlas
- [ ] Free cluster created (M0 tier)
- [ ] Database user created (admin/admin123)
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string copied
- [ ] .env file updated
- [ ] npm run init-db successful
- [ ] Database shows in Atlas

---

## 🔍 Verify in MongoDB Atlas

1. Go to **"Database"** in left sidebar

2. Click **"Browse Collections"** on your cluster

3. You should see:
   - Database: `microjob-platform`
   - Collections:
     - `users` (1 document - admin)
     - `categories` (19 documents)

---

## 🐛 Troubleshooting

### Error: "Authentication failed"

**Cause:** Wrong username or password

**Solution:**
1. Go to "Database Access" in Atlas
2. Click "Edit" on your user
3. Reset password
4. Update .env file with new password

---

### Error: "Connection timeout"

**Cause:** IP not whitelisted

**Solution:**
1. Go to "Network Access" in Atlas
2. Check if 0.0.0.0/0 is listed
3. If not, add it
4. Wait 2 minutes for changes to apply

---

### Error: "User not found"

**Cause:** Special characters in password

**Solution:**
1. Use simple password (letters and numbers only)
2. Or URL-encode special characters:
   - `@` becomes `%40`
   - `#` becomes `%23`
   - `$` becomes `%24`

Example:
```
Password: Pass@123
In .env: mongodb+srv://admin:Pass%40123@...
```

---

### Error: "Invalid connection string"

**Solution:**
Make sure your connection string has:
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE_NAME?retryWrites=true&w=majority
```

Parts:
- `USERNAME`: Your database username (admin)
- `PASSWORD`: Your database password (admin123)
- `CLUSTER`: Your cluster address (cluster0.xxxxx.mongodb.net)
- `DATABASE_NAME`: microjob-platform

---

## 📊 Free Tier Limits

MongoDB Atlas Free Tier (M0) includes:

- ✅ **Storage:** 512 MB
- ✅ **RAM:** Shared
- ✅ **Connections:** 500
- ✅ **Backups:** No automatic backups
- ✅ **Cost:** $0 forever!

**Perfect for:**
- Development and testing
- Small applications
- Learning and prototyping
- Low-traffic production sites

**When to upgrade:**
- Need more than 512 MB storage
- Need automatic backups
- High traffic (>500 concurrent connections)
- Need dedicated resources

---

## 🎯 Quick Reference

### Your Credentials

Store these safely:

```
MongoDB Atlas URL: https://cloud.mongodb.com
Email: [your-email]
Password: [your-atlas-password]

Database User: admin
Database Password: admin123

Connection String:
mongodb+srv://admin:admin123@cluster0.xxxxx.mongodb.net/microjob-platform?retryWrites=true&w=majority
```

---

## 🔒 Security Best Practices

### For Production:

1. **Use strong passwords:**
   - Minimum 16 characters
   - Mix of letters, numbers, symbols
   - Use password generator

2. **Whitelist specific IPs:**
   - Remove 0.0.0.0/0
   - Add only your server's IP

3. **Create limited users:**
   - Read-only user for analytics
   - Write-only user for backups

4. **Enable monitoring:**
   - Set up alerts in Atlas
   - Monitor connection counts
   - Track query performance

5. **Regular backups:**
   - Upgrade to M2 or higher for automatic backups
   - Or export data manually

---

## 💡 Pro Tips

1. **Multiple environments:**
   Create separate databases for dev/staging/production:
   ```
   Development: microjob-platform-dev
   Staging: microjob-platform-staging
   Production: microjob-platform
   ```

2. **Monitor usage:**
   - Check "Metrics" in Atlas dashboard
   - Track storage and connections
   - Plan upgrade before hitting limits

3. **Use MongoDB Compass:**
   - Download free GUI tool
   - Connect using same connection string
   - Browse and edit data visually

4. **Enable alerts:**
   - Go to "Alerts" in Atlas
   - Set up email notifications
   - Monitor connection spikes

---

## 🚀 Next Steps

After MongoDB Atlas is set up:

1. ✅ Run `npm run init-db`
2. ✅ Start server `npm run dev`
3. ✅ Test your application
4. ✅ Deploy to production

---

## 📞 Need Help?

### Official Resources:
- Documentation: https://docs.atlas.mongodb.com/
- Video Tutorials: https://www.mongodb.com/docs/atlas/tutorial/
- Support: https://support.mongodb.com/

### Common Issues:
1. Can't create account? → Check email for verification
2. Can't create cluster? → Clear browser cache, try again
3. Connection fails? → Check credentials and network access
4. Cluster slow? → Free tier has shared resources, normal

---

## 🎉 You're All Set!

MongoDB Atlas is now configured and your application can connect to it!

This setup works for both local development and when you deploy to production.

**Happy Coding! 💻**

---

**Last Updated:** Created for your microjob platform
**Free Tier:** Forever free, no credit card needed
**Support:** Available 24/7 via MongoDB documentation
