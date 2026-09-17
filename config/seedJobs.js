require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('../models/Job');
const Category = require('../models/Category');
const User = require('../models/User');

// 50 signup links divided into 3 days
const jobsByDay = {
  day1: [
    { url: 'https://oatstuckalfred.com/pgghjpvahq?key=b54923b02bad9ca5d730e2f7fcf10256', title: 'Complete Quick Survey #1', price: 7 },
    { url: 'https://oatstuckalfred.com/b1k0d8tddz?key=63f2065791683072cc66284d81040d48', title: 'View Sponsored Content #2', price: 5 },
    { url: 'https://oatstuckalfred.com/dezve607v?key=dae92055ba934a0b1f1ae2bbf3fce04b', title: 'Sign Up to Platform #3', price: 10 },
    { url: 'https://oatstuckalfred.com/dg9iw5tsi?key=9162bc93e5de0dd48e6b1ff9a528b9bf', title: 'Complete Registration #4', price: 8 },
    { url: 'https://oatstuckalfred.com/s9qy86wuv?key=5866d801ba0b0d1939d8ea5291b950b2', title: 'Visit Partner Site #5', price: 6 },
    { url: 'https://oatstuckalfred.com/ehdpwzd6d?key=9144e2cfb748f43ed5f5dd9a5abe6515', title: 'View Advertisement #6', price: 5 },
    { url: 'https://oatstuckalfred.com/seqfpnze?key=0a1b7a741eed1ebc9c4ebfb5f40cf22b', title: 'Complete Offer #7', price: 9 },
    { url: 'https://oatstuckalfred.com/atyif8gaj?key=cb8ed3d99895db00fba72f8fd966ea82', title: 'Sign Up & Verify #8', price: 10 },
    { url: 'https://oatstuckalfred.com/b17n6rap?key=295811eb8b88a8d25a1a5deaee5c99c6', title: 'Visit Sponsored Page #9', price: 6 },
    { url: 'https://oatstuckalfred.com/drzf5dy91y?key=6909a80cfc1e2bcdd6c991aa2833ed10', title: 'Complete Quick Task #10', price: 7 },
    { url: 'https://oatstuckalfred.com/nxmrwrjs?key=fa537072a3815a9bec380af2583f1e4c', title: 'View Partner Offer #11', price: 8 },
    { url: 'https://oatstuckalfred.com/jxbuk1vh8?key=e6ef7a45cdb8eef24a13ec59c744bd8d', title: 'Sign Up Bonus #12', price: 9 },
    { url: 'https://oatstuckalfred.com/ktbrc64dws?key=401d80d2a5aeca9e75df30db85697bd4', title: 'Complete Registration Form #13', price: 10 },
    { url: 'https://oatstuckalfred.com/x8eah0ndk?key=e49738daa6b9f712cd3d8168bae63a48', title: 'Visit & Stay 10 Seconds #14', price: 5 },
    { url: 'https://oatstuckalfred.com/mg54f0a09i?key=5ca855f37a2473501cb3cb9553a7b6f5', title: 'View Sponsored Ad #15', price: 7 },
    { url: 'https://oatstuckalfred.com/j0q3a31b?key=f3f1645a5d2708cbea7f2621e20b905e', title: 'Complete Simple Survey #16', price: 8 },
    { url: 'https://oatstuckalfred.com/j0q3a31b?key=f3f1645a5d2708cbea7f2621e20b905e', title: 'Quick Sign Up Task #17', price: 6 },
    { url: 'https://oatstuckalfred.com/tcqpm5v0?key=d086697f9bf74759986636de80c07a7c', title: 'Visit Partner Website #18', price: 9 },
    { url: 'https://oatstuckalfred.com/ssnsfvrn?key=f6331be8ccd9f81b65881a997303784c', title: 'Complete Offer Page #19', price: 10 },
    { url: 'https://oatstuckalfred.com/pgghjpvahq?key=b54923b02bad9ca5d730e2f7fcf10256', title: 'Easy Registration #20', price: 7 }
  ],
  day2: [
    { url: 'https://oatstuckalfred.com/veexw05vi8?key=2f182b2b209afa7e55578cb3ef97a842', title: 'Premium Survey Task #21', price: 8 },
    { url: 'https://oatstuckalfred.com/a7hv3uiiwu?key=2fe7a610094c1357597abbe00d622619', title: 'Register on Rewards Site #22', price: 7 },
    { url: 'https://oatstuckalfred.com/ngxhacpwi9?key=0ae1a954689a7d2cf6f8673e4b538c71', title: 'Complete Partner Signup #23', price: 9 },
    { url: 'https://oatstuckalfred.com/wjbry3kg3e?key=374c42b88902ead82ed9e03241046a09', title: 'Join Affiliate Network #24', price: 6 },
    { url: 'https://oatstuckalfred.com/kz1j8b5my?key=89b0c12d2684a58b841c16caca573f78', title: 'Special Offer Registration #25', price: 10 },
    { url: 'https://oatstuckalfred.com/pyerzgmv90?key=830a7905bfd5a58a8839639451bac300', title: 'Quick Cash Task #26', price: 8 },
    { url: 'https://oatstuckalfred.com/q4eynhey?key=d6aa29a0dca97a18e1b12f0a6cfa59a2', title: 'Visit Premium Site #27', price: 7 },
    { url: 'https://oatstuckalfred.com/qngwdi6178?key=e17eb4f986cf8c18327cfdf206246ca8', title: 'Complete Easy Survey #28', price: 5 },
    { url: 'https://oatstuckalfred.com/sp5bcwr5cm?key=f43fbeb8cb051f745a2434c9a165fcbb', title: 'Partner Platform Signup #29', price: 9 },
    { url: 'https://oatstuckalfred.com/v6kwpkhkng?key=fdd0f8f9d35088d96920de3a9d93c4ca', title: 'View Sponsored Content #30', price: 6 },
    { url: 'https://oatstuckalfred.com/qqx0hqyyq?key=3db7eb25b180efca39eda55bbcbe8fda', title: 'Register & Earn #31', price: 8 },
    { url: 'https://oatstuckalfred.com/kxqiiwd4t?key=535f235d8b45edff32f536792aed8afb', title: 'Complete Online Form #32', price: 7 },
    { url: 'https://oatstuckalfred.com/rtuz48zm?key=45b8e60265a8f0189a3c869d0dad2fa9', title: 'Quick Signup Bonus #33', price: 10 },
    { url: 'https://oatstuckalfred.com/xighsptb6j?key=dff7a2bf3f4172a6ae3a9fd934b4e9a7', title: 'Visit Partner Network #34', price: 6 },
    { url: 'https://oatstuckalfred.com/ze4j7ir73?key=aaed0edb5194db8f0b76a0a0f13eaf8b', title: 'Complete Registration #35', price: 8 }
  ],
  day3: [
    { url: 'https://oatstuckalfred.com/yri3yiy3s9?key=bc7427773d6987eed590f78a719b58ee', title: 'Premium Offer Task #36', price: 9 },
    { url: 'https://oatstuckalfred.com/tzetzusy9?key=3074afee8f823787b93ccf1b0faf6738', title: 'Register on Survey Site #37', price: 7 },
    { url: 'https://oatstuckalfred.com/h9shmd7iz?key=211a5b5c71efbc3d80cbc2e23902b425', title: 'Complete Quick Offer #38', price: 8 },
    { url: 'https://oatstuckalfred.com/vug9b9seb?key=463c6d877c08ae90bf7b72da8bd9f5cd', title: 'Join Rewards Program #39', price: 6 },
    { url: 'https://oatstuckalfred.com/tpcm4r9d3?key=53e308b7aa924c334141ce6c7a196079', title: 'Special Signup Bonus #40', price: 10 },
    { url: 'https://oatstuckalfred.com/awc63wea?key=5913f032b14acff78e3631694760af6b', title: 'View Partner Content #41', price: 7 },
    { url: 'https://oatstuckalfred.com/r6zxj7aqa?key=1b58072727181955485593d150072ad5', title: 'Complete Easy Task #42', price: 5 },
    { url: 'https://oatstuckalfred.com/b130jj4ra?key=42ba91b969b4623fdf0f4fee14019946', title: 'Register & Get Paid #43', price: 8 },
    { url: 'https://oatstuckalfred.com/p85zmny0t7?key=6bb078366b928be9ff9ef74e18354f30', title: 'Visit Affiliate Site #44', price: 9 },
    { url: 'https://oatstuckalfred.com/jx1ggc56p3?key=c74940d4dc9c300eda683e1acc6ae033', title: 'Complete Survey Form #45', price: 6 },
    { url: 'https://oatstuckalfred.com/dge5v6v2tj?key=3dfd73a28ff0f83dfa4e8e71dd8fbf3b', title: 'Quick Registration #46', price: 8 },
    { url: 'https://oatstuckalfred.com/s6riajm8c9?key=97d3642a405e606eeea44dc035b3f320', title: 'Partner Network Signup #47', price: 7 },
    { url: 'https://oatstuckalfred.com/kem7za5ufs?key=b41ec989b5a7b0f4012ab6dfa5913423', title: 'Complete Offer & Earn #48', price: 10 },
    { url: 'https://oatstuckalfred.com/fmj3xzt1jw?key=8f6342ea5ef5bcf15a513341b24e4a86', title: 'View Premium Ad #49', price: 8 },
    { url: 'https://oatstuckalfred.com/k1qcz8rq35?key=5cbbd3d7120f79a6df62af09a865a052', title: 'Final Bonus Task #50', price: 9 }
  ]
};

async function seedJobs() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Get admin user as employer
    const admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      console.log('❌ Admin user not found. Run init-db first.');
      process.exit(1);
    }

    // Get or create category
    let category = await Category.findOne({ name: 'Daily Tasks' });
    if (!category) {
      category = await Category.create({
        name: 'Daily Tasks',
        slug: 'daily-tasks',
        description: 'Complete daily tasks and earn money - New tasks every day!',
        icon: '📅',
        isActive: true,
        jobCount: 0
      });
      console.log('✓ Created Daily Tasks category');
    }

    // Delete existing jobs
    await Job.deleteMany({ category: category._id });
    console.log('✓ Cleared existing daily tasks');

    let totalJobs = 0;
    let totalEarnings = 0;

    // Create jobs for each day
    for (const [day, jobs] of Object.entries(jobsByDay)) {
      const dayNumber = day === 'day1' ? 1 : day === 'day2' ? 2 : 3;
      
      for (const jobData of jobs) {
        await Job.create({
          title: jobData.title,
          description: `🎯 Complete this task and earn ${formatCurrency(jobData.price)}!\n\n✅ What to do:\n1. Click the "Start Task" button\n2. A new window will open\n3. Stay on the page for 10 seconds\n4. Money will be automatically added to your account!\n\n📅 This task is available on Day ${dayNumber} of the rotation cycle.\n⏰ You can do this task once when it's available.\n\n💡 Tip: Come back daily to unlock new tasks and maximize your earnings!`,
          category: category._id,
          employer: admin._id,
          price: jobData.price,
          duration: '10 seconds',
          maxWorkers: 999999,
          currentWorkers: 0,
          requirements: `Simply visit the link and stay for 10 seconds. Payment is automatic!`,
          proofRequired: false,
          status: 'active',
          priority: 'featured',
          autoComplete: true,
          taskUrl: jobData.url,
          requiredDuration: 10,
          isDailyRepeatable: true,
          dayRotation: dayNumber // NEW FIELD: Which day this job belongs to (1, 2, or 3)
        });
        
        totalJobs++;
        totalEarnings += jobData.price;
      }
    }

    console.log('\n✓ Successfully created 50 auto-complete jobs!');
    console.log(`✓ Day 1: 20 tasks (৳${jobsByDay.day1.reduce((s, j) => s + j.price, 0).toFixed(2)})`);
    console.log(`✓ Day 2: 15 tasks (৳${jobsByDay.day2.reduce((s, j) => s + j.price, 0).toFixed(2)})`);
    console.log(`✓ Day 3: 15 tasks (৳${jobsByDay.day3.reduce((s, j) => s + j.price, 0).toFixed(2)})`);
    console.log(`\n✓ Total: ${totalJobs} tasks worth ৳${totalEarnings.toFixed(2)}`);
    console.log('\n📅 Users will see different tasks each day in a 3-day rotation!');
    console.log('💰 Maximum daily earnings: ৳149 (Day 1) | ৳112 (Day 2) | ৳116 (Day 3)');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

function formatCurrency(amount) {
  return `৳${amount.toFixed(2)}`;
}

seedJobs();
