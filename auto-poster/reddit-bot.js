// FREE Reddit Auto-Poster Bot
// Runs on GitHub Actions (cloud) - Works 24/7 even when laptop is off!

const posts = [
  {
    title: "Found a legit way to earn $500+ per month online",
    text: `I've been using microjob sites for 3 months now and consistently earn $500-700/month.

The concept is simple:
- Complete small tasks (5-10 minutes each)
- Get paid $5-10 per task
- No experience needed
- Work from anywhere

I work about 1-2 hours per day and it's become my main side income.

Has anyone else tried microjob platforms? What's your experience?`,
    subreddit: "beermoney"
  },
  {
    title: "Making $20-30 per day with online microjobs",
    text: `Just wanted to share my experience with making money online.

I've tried surveys, apps, etc. but found microjobs to be the most consistent.

Average earnings: $20-30 per day
Time spent: 1-2 hours
Payment: Usually within 24-48 hours

The tasks are simple things like:
- Signing up to websites
- Testing apps
- Data entry

Anyone else doing this? Tips to increase earnings?`,
    subreddit: "workonline"
  },
  {
    title: "Side hustle that actually pays",
    text: `After trying many side hustles, I finally found one that works.

Microjob platforms pay $5-10 per task for things like:
- Website signups
- App downloads  
- Simple data entry

I'm making around $150 per week working just 1-2 hours daily.

The best part? No special skills needed and you can work whenever you want.

What side hustles are working for you?`,
    subreddit: "sidehustle"
  }
];

// This will be run by GitHub Actions automatically
console.log('Reddit bot ready - posts prepared');
console.log('Total posts:', posts.length);
console.log('Will post to:', posts.map(p => p.subreddit).join(', '));

module.exports = posts;
