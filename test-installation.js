#!/usr/bin/env node

/**
 * Installation Test Script
 * Run this to verify your installation is correct
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 Testing MicroJob Platform Installation...\n');

let errors = 0;
let warnings = 0;

// Test 1: Check Node.js version
console.log('1️⃣  Checking Node.js version...');
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.split('.')[0].substring(1));
if (majorVersion >= 14) {
  console.log(`   ✅ Node.js ${nodeVersion} (OK)`);
} else {
  console.log(`   ❌ Node.js ${nodeVersion} (Need v14 or higher)`);
  errors++;
}

// Test 2: Check required directories
console.log('\n2️⃣  Checking directory structure...');
const requiredDirs = ['config', 'controllers', 'middleware', 'models', 'public', 'routes'];
requiredDirs.forEach(dir => {
  if (fs.existsSync(path.join(__dirname, dir))) {
    console.log(`   ✅ ${dir}/ directory exists`);
  } else {
    console.log(`   ❌ ${dir}/ directory missing`);
    errors++;
  }
});

// Test 3: Check required files
console.log('\n3️⃣  Checking essential files...');
const requiredFiles = [
  'server.js',
  'package.json',
  '.env',
  'config/database.js',
  'config/initDatabase.js',
  'public/index.html',
  'public/css/style.css',
  'public/js/config.js'
];

requiredFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    console.log(`   ✅ ${file} exists`);
  } else {
    console.log(`   ❌ ${file} missing`);
    errors++;
  }
});

// Test 4: Check environment variables
console.log('\n4️⃣  Checking environment configuration...');
try {
  require('dotenv').config();
  
  const requiredEnvVars = ['PORT', 'MONGODB_URI', 'JWT_SECRET'];
  requiredEnvVars.forEach(envVar => {
    if (process.env[envVar]) {
      console.log(`   ✅ ${envVar} is set`);
    } else {
      console.log(`   ⚠️  ${envVar} not set in .env file`);
      warnings++;
    }
  });
} catch (error) {
  console.log('   ❌ Error loading .env file');
  errors++;
}

// Test 5: Check package.json
console.log('\n5️⃣  Checking package.json...');
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  
  const requiredDeps = ['express', 'mongoose', 'bcryptjs', 'jsonwebtoken', 'dotenv', 'cors'];
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      console.log(`   ✅ ${dep} dependency found`);
    } else {
      console.log(`   ❌ ${dep} dependency missing`);
      errors++;
    }
  });

  if (packageJson.scripts && packageJson.scripts['init-db']) {
    console.log('   ✅ init-db script found');
  } else {
    console.log('   ❌ init-db script missing');
    errors++;
  }
} catch (error) {
  console.log('   ❌ Error reading package.json');
  errors++;
}

// Test 6: Check models
console.log('\n6️⃣  Checking database models...');
const requiredModels = ['User.js', 'Job.js', 'Application.js', 'Category.js', 'Transaction.js', 'Withdrawal.js'];
requiredModels.forEach(model => {
  if (fs.existsSync(path.join(__dirname, 'models', model))) {
    console.log(`   ✅ ${model} exists`);
  } else {
    console.log(`   ❌ ${model} missing`);
    errors++;
  }
});

// Test 7: Check controllers
console.log('\n7️⃣  Checking controllers...');
const requiredControllers = [
  'authController.js',
  'jobController.js',
  'applicationController.js',
  'categoryController.js',
  'withdrawalController.js',
  'transactionController.js'
];
requiredControllers.forEach(controller => {
  if (fs.existsSync(path.join(__dirname, 'controllers', controller))) {
    console.log(`   ✅ ${controller} exists`);
  } else {
    console.log(`   ❌ ${controller} missing`);
    errors++;
  }
});

// Test 8: Check routes
console.log('\n8️⃣  Checking API routes...');
const requiredRoutes = [
  'auth.js',
  'jobs.js',
  'applications.js',
  'categories.js',
  'withdrawals.js',
  'transactions.js'
];
requiredRoutes.forEach(route => {
  if (fs.existsSync(path.join(__dirname, 'routes', route))) {
    console.log(`   ✅ ${route} exists`);
  } else {
    console.log(`   ❌ ${route} missing`);
    errors++;
  }
});

// Test 9: Check frontend files
console.log('\n9️⃣  Checking frontend files...');
const requiredPages = [
  'index.html',
  'login.html',
  'register.html',
  'jobs.html',
  'dashboard.html',
  'admin-withdrawals.html'
];
requiredPages.forEach(page => {
  if (fs.existsSync(path.join(__dirname, 'public', page))) {
    console.log(`   ✅ ${page} exists`);
  } else {
    console.log(`   ❌ ${page} missing`);
    errors++;
  }
});

// Test 10: Check documentation
console.log('\n🔟  Checking documentation...');
const requiredDocs = ['README.md', 'SETUP_GUIDE.md', 'QUICK_START.txt'];
requiredDocs.forEach(doc => {
  if (fs.existsSync(path.join(__dirname, doc))) {
    console.log(`   ✅ ${doc} exists`);
  } else {
    console.log(`   ⚠️  ${doc} missing (not critical)`);
    warnings++;
  }
});

// Summary
console.log('\n' + '='.repeat(60));
console.log('📊 INSTALLATION TEST SUMMARY');
console.log('='.repeat(60));

if (errors === 0 && warnings === 0) {
  console.log('✅ PERFECT! All checks passed!');
  console.log('\n🚀 Your installation is complete and ready to use!');
  console.log('\nNext steps:');
  console.log('1. Run: npm install');
  console.log('2. Run: npm run init-db');
  console.log('3. Run: npm run dev');
  console.log('4. Open: http://localhost:5000');
} else {
  if (errors > 0) {
    console.log(`❌ Found ${errors} error(s)`);
    console.log('\n⚠️  Please fix the errors above before running the application.');
  }
  if (warnings > 0) {
    console.log(`⚠️  Found ${warnings} warning(s)`);
    console.log('   These are not critical but should be addressed.');
  }
  
  if (errors > 0) {
    console.log('\n💡 Common solutions:');
    console.log('   - If files are missing, re-extract the project');
    console.log('   - If .env is missing, copy from .env.example');
    console.log('   - If dependencies missing, run: npm install');
  }
}

console.log('\n' + '='.repeat(60) + '\n');

process.exit(errors > 0 ? 1 : 0);
