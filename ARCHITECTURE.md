# 🏗️ System Architecture - MicroJob Platform

## 📐 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐  ┌───────────┐ │
│  │ Browser  │  │  Mobile  │  │  Tablet   │  │  Desktop  │ │
│  └────┬─────┘  └────┬─────┘  └─────┬─────┘  └─────┬─────┘ │
└───────┼─────────────┼──────────────┼──────────────┼────────┘
        │             │              │              │
        └─────────────┴──────────────┴──────────────┘
                            │
                    HTTP/HTTPS Requests
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                   PRESENTATION LAYER                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Static HTML/CSS/JS Files (public/ directory)        │  │
│  │  - index.html, jobs.html, dashboard.html, etc.       │  │
│  │  - style.css, config.js, dashboard.js                │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────────────┬───────────────────────────────┘
                               │
                       JSON REST API
                               │
┌──────────────────────────────▼───────────────────────────────┐
│                      APPLICATION LAYER                        │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              Express.js Server (server.js)              │ │
│  │                                                         │ │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────────┐  │ │
│  │  │   CORS     │  │   JSON     │  │  Static File   │  │ │
│  │  │ Middleware │  │   Parser   │  │    Serving     │  │ │
│  │  └────────────┘  └────────────┘  └────────────────┘  │ │
│  └─────────────────────────────────────────────────────────┘ │
│                               │                               │
│  ┌────────────────────────────▼────────────────────────────┐ │
│  │              MIDDLEWARE LAYER                           │ │
│  │  ┌──────────────────┐    ┌─────────────────────────┐  │ │
│  │  │  auth.js         │    │  errorHandler.js        │  │ │
│  │  │  - JWT Verify    │    │  - Global Error Handler │  │ │
│  │  │  - Authorization │    │  - Error Formatting     │  │ │
│  │  └──────────────────┘    └─────────────────────────┘  │ │
│  └─────────────────────────────────────────────────────────┘ │
│                               │                               │
│  ┌────────────────────────────▼────────────────────────────┐ │
│  │                   ROUTING LAYER                         │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │ │
│  │  │  /auth   │ │  /jobs   │ │ /applic- │ │ /withdr- │ │ │
│  │  │  routes  │ │  routes  │ │  ations  │ │  awals   │ │ │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ │ │
│  │  ┌──────────┐ ┌──────────┐                           │ │
│  │  │/catego-  │ │ /trans-  │                           │ │
│  │  │  ries    │ │ actions  │                           │ │
│  │  └──────────┘ └──────────┘                           │ │
│  └─────────────────────────────────────────────────────────┘ │
│                               │                               │
│  ┌────────────────────────────▼────────────────────────────┐ │
│  │              CONTROLLER LAYER                           │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │ │
│  │  │   Auth   │ │   Job    │ │  Applic- │ │ Withdr-  │ │ │
│  │  │Controller│ │Controller│ │  ation   │ │  awal    │ │ │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ │ │
│  │  ┌──────────┐ ┌──────────┐                           │ │
│  │  │ Category │ │Transaction│                           │ │
│  │  │Controller│ │Controller│                            │ │
│  │  └──────────┘ └──────────┘                           │ │
│  └─────────────────────────────────────────────────────────┘ │
└──────────────────────────────┬───────────────────────────────┘
                               │
                       Mongoose ODM
                               │
┌──────────────────────────────▼───────────────────────────────┐
│                       DATA LAYER                              │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                  Mongoose Models                        │ │
│  │  ┌────────┐ ┌────────┐ ┌───────────┐ ┌──────────────┐ │ │
│  │  │  User  │ │  Job   │ │Application│ │  Category    │ │ │
│  │  └────────┘ └────────┘ └───────────┘ └──────────────┘ │ │
│  │  ┌────────────┐ ┌──────────────┐                      │ │
│  │  │Transaction │ │  Withdrawal  │                      │ │
│  │  └────────────┘ └──────────────┘                      │ │
│  └─────────────────────────────────────────────────────────┘ │
│                               │                               │
│  ┌────────────────────────────▼────────────────────────────┐ │
│  │                 MongoDB Database                        │ │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────────┐  │ │
│  │  │ users      │  │ jobs       │  │ applications   │  │ │
│  │  │ collection │  │ collection │  │ collection     │  │ │
│  │  └────────────┘  └────────────┘  └────────────────┘  │ │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────────┐  │ │
│  │  │categories  │  │transactions│  │ withdrawals    │  │ │
│  │  │ collection │  │ collection │  │ collection     │  │ │
│  │  └────────────┘  └────────────┘  └────────────────┘  │ │
│  └─────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────┘
```

---

## 🔄 Request Flow

### Example: User Applies for Job

```
1. USER ACTION
   └─> Click "Apply" button on jobs.html

2. FRONTEND (public/js/config.js)
   └─> apiCall('/applications', { method: 'POST', body: {...} })
   └─> Add JWT token to Authorization header

3. SERVER (server.js)
   └─> Receive POST request at /api/applications
   └─> Parse JSON body

4. MIDDLEWARE (middleware/auth.js)
   └─> Verify JWT token
   └─> Extract user ID
   └─> Check if user role is 'worker'
   └─> Attach user to request object

5. ROUTER (routes/applications.js)
   └─> Match POST /api/applications
   └─> Call applicationController.applyForJob()

6. CONTROLLER (controllers/applicationController.js)
   └─> Validate job exists
   └─> Check job is active
   └─> Check user hasn't already applied
   └─> Create application in database

7. MODEL (models/Application.js)
   └─> Validate data against schema
   └─> Save to MongoDB

8. DATABASE (MongoDB)
   └─> Insert document into 'applications' collection
   └─> Update 'jobs' collection (increment applicants)

9. RESPONSE
   └─> Return success JSON
   └─> Status 201 Created

10. FRONTEND
    └─> Show success notification
    └─> Reload applications list
```

---

## 🗂️ Data Flow Diagram

```
┌──────────┐
│   User   │
└────┬─────┘
     │ Input
     ▼
┌──────────────┐
│   Frontend   │ ──────┐
│  (HTML/JS)   │       │ Display Data
└──────┬───────┘       │
       │ API Call      │
       ▼               │
┌──────────────┐       │
│  Middleware  │       │
│  (Auth/JWT)  │       │
└──────┬───────┘       │
       │ Verified      │
       ▼               │
┌──────────────┐       │
│  Controller  │       │
│ (Logic Layer)│       │
└──────┬───────┘       │
       │ DB Query      │
       ▼               │
┌──────────────┐       │
│    Model     │       │
│  (Mongoose)  │       │
└──────┬───────┘       │
       │ CRUD          │
       ▼               │
┌──────────────┐       │
│   MongoDB    │       │
│  (Database)  │       │
└──────┬───────┘       │
       │ Result        │
       └───────────────┘
```

---

## 🔐 Authentication Flow

```
REGISTRATION
└─> POST /api/auth/register
    ├─> Validate input
    ├─> Hash password (bcrypt)
    ├─> Create user in DB
    ├─> Generate JWT token
    └─> Return token + user data

LOGIN
└─> POST /api/auth/login
    ├─> Find user by email
    ├─> Compare password hash
    ├─> Generate JWT token
    ├─> Update lastLogin
    └─> Return token + user data

PROTECTED REQUEST
└─> Any API call with token
    ├─> Extract token from header
    ├─> Verify token (jwt.verify)
    ├─> Get user from DB
    ├─> Check user.isActive
    ├─> Attach user to req.user
    └─> Continue to controller
```

---

## 💰 Payment Processing Flow

```
JOB COMPLETION
    │
    ▼
┌────────────────────┐
│ Employer Reviews   │
│ Submitted Work     │
└─────────┬──────────┘
          │ Approves
          ▼
┌────────────────────┐
│ Update Application │
│ status = completed │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Calculate Payment  │
│ amount = job.price │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Update Worker      │
│ balance += amount  │
│ totalEarned += amt │
│ completedJobs++    │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Create Transaction │
│ type = 'earning'   │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Update Rating      │
│ Calculate avg      │
└────────────────────┘
```

---

## 🏦 Withdrawal Flow

```
WORKER REQUESTS
    │
    ▼
┌────────────────────┐
│ Create Withdrawal  │
│ status = pending   │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Deduct from Balance│
│ balance -= amount  │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Calculate Fee (2%) │
│ net = amount - fee │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Admin Reviews      │
│ (admin panel)      │
└─────────┬──────────┘
          │
     ┌────┴────┐
     │         │
  APPROVE   REJECT
     │         │
     ▼         ▼
┌─────────┐ ┌─────────┐
│Complete │ │ Refund  │
│Payment  │ │ Balance │
└─────────┘ └─────────┘
```

---

## 🎯 Role-Based Access

```
WORKER
├─> Can browse jobs
├─> Can apply for jobs
├─> Can submit work
├─> Can request withdrawals
├─> Can view own data
└─> Cannot post jobs

EMPLOYER
├─> Can post jobs
├─> Can manage own jobs
├─> Can review applications
├─> Can approve/reject work
├─> Can view own data
└─> Cannot apply for jobs

ADMIN
├─> Full access to all features
├─> Can manage users
├─> Can manage all jobs
├─> Can process withdrawals
├─> Can view all transactions
└─> Can manage categories
```

---

## 📊 Database Relationships

```
USER (1) ───┬─── (∞) JOBS
            │     (as employer)
            │
            ├─── (∞) APPLICATIONS
            │     (as worker)
            │
            ├─── (∞) TRANSACTIONS
            │
            └─── (∞) WITHDRAWALS

JOB (1) ────┬─── (∞) APPLICATIONS
            │
            └─── (1) CATEGORY

APPLICATION (1) ──┬─── (1) JOB
                  │
                  ├─── (1) WORKER (User)
                  │
                  └─── (1) EMPLOYER (User)

TRANSACTION (1) ──┬─── (1) USER
                  │
                  ├─── (0-1) JOB
                  │
                  └─── (0-1) APPLICATION

WITHDRAWAL (1) ───┬─── (1) USER
                  │
                  └─── (0-1) PROCESSED_BY (User/Admin)
```

---

## 🔄 State Machine

### Application Status Flow

```
        pending
           │
      ┌────┴────┐
      │         │
  accepted   rejected
      │
      ▼
  in-progress
      │
      ▼
   submitted
      │
  ┌───┴───┐
  │       │
approved rejected
  │
  ▼
completed
```

### Job Status Flow

```
   active
     │
 ┌───┴───┐
 │       │
paused  completed
 │
 ▼
active
```

---

## 🚀 Deployment Architecture

```
┌──────────────────────────────────────┐
│         Load Balancer / CDN          │
└─────────────┬────────────────────────┘
              │
         ┌────┴────┐
         │         │
    ┌────▼───┐ ┌──▼─────┐
    │Server 1│ │Server 2│  (Multiple instances)
    └────┬───┘ └──┬─────┘
         │        │
         └───┬────┘
             │
      ┌──────▼──────┐
      │   MongoDB   │  (Replica Set)
      │   Cluster   │
      └─────────────┘
```

---

## 🔧 Technology Stack Detail

```
FRONTEND
├─> HTML5 (Structure)
├─> CSS3 (Styling + Animations)
├─> Vanilla JS (Logic)
└─> Fetch API (HTTP Requests)

BACKEND
├─> Node.js v14+ (Runtime)
├─> Express.js 4.x (Framework)
├─> JWT (Authentication)
└─> bcryptjs (Password Hashing)

DATABASE
├─> MongoDB 4.x+ (NoSQL)
├─> Mongoose 7.x (ODM)
└─> Indexes (Performance)

SECURITY
├─> CORS (Cross-Origin)
├─> JWT (Token Auth)
├─> bcrypt (Hashing)
└─> express-validator (Input)
```

---

## 📈 Scalability

### Horizontal Scaling
```
Add more server instances behind load balancer
MongoDB supports sharding for data distribution
```

### Vertical Scaling
```
Increase server resources (CPU, RAM)
Optimize database queries and indexes
```

### Caching Strategy
```
Redis for session storage
CDN for static assets
Database query caching
```

---

## 🛡️ Security Layers

```
1. INPUT VALIDATION
   └─> express-validator on all inputs

2. AUTHENTICATION
   └─> JWT tokens with expiration

3. AUTHORIZATION
   └─> Role-based access control

4. PASSWORD SECURITY
   └─> bcrypt hashing (10 rounds)

5. API SECURITY
   └─> CORS configuration
   └─> Rate limiting (future)

6. DATABASE SECURITY
   └─> Mongoose schema validation
   └─> No SQL injection risk
```

---

This architecture provides a **scalable**, **secure**, and **maintainable** platform for your microjob marketplace!
