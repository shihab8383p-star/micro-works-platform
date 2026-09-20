// FREE Twitter Auto-Poster Bot
// Runs on GitHub Actions (cloud) - Works 24/7!

const tweets = [
  "Just earned $35 today completing simple online tasks! 💰 Anyone else working from home? #makemoneyonline #workfromhome",
  
  "Who knew you could get paid $10 for signing up to websites? 🤯 This is my new favorite side hustle! #sidehustle #passiveincome",
  
  "Making $500+ per month with microjobs. Takes me 1-2 hours per day. No degree needed. #onlinejobs #remotework",
  
  "Tired of surveys that pay pennies? Try microjob sites instead. I'm averaging $20-30 per day! 💸 #earnmoneyonline",
  
  "Started doing microjobs 3 months ago. Now earning more than my part-time job. 🚀 #financialfreedom #sideincome",
  
  "If you have 1-2 hours per day free, you can easily make $500/month with online microjobs. #workfromhome #freelance",
  
  "Best part about microjobs? Get paid within 24-48 hours. No waiting weeks for payment! 💰 #quickcash",
  
  "Just completed 5 tasks and earned $45 in under an hour. Microjobs are legit! ✅ #makemoney #onlinework",
  
  "Anyone else doing microjobs as a side hustle? Let's connect! 👋 #earnmoney #remotejobs",
  
  "No experience needed to start earning online. I started 3 months ago with zero skills. Now making $600+/month! 🎉 #workfromhome"
];

// This will be run by GitHub Actions automatically every 8 hours
console.log('Twitter bot ready - tweets prepared');
console.log('Total tweets:', tweets.length);
console.log('Posts per day: 3');

module.exports = tweets;
