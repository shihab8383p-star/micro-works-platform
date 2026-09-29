const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Captions targeting USA women audience
const captions = [
  `💰 Hey ladies! Want to make $500-700 extra per month from your couch?

I've been doing simple online tasks (5-10 min each) and getting paid $5-10 per task! Perfect for stay-at-home moms, students, or anyone wanting extra cash 💸

No experience needed! Just your phone and 10 minutes a day.

Try it here: https://micro-works-platform-1.onrender.com

#WorkFromHome #MomLife #SideHustle #MakeMoneyOnline #GirlBoss #PassiveIncome`,

  `🚀 Ladies, real talk: I found the easiest way to make money online!

Simple tasks like:
✅ Sign up to websites (2 min)
✅ Test apps (5 min)
✅ Get PAID instantly to PayPal

I made $487 last month just during my lunch breaks! 

Perfect for busy women juggling everything 💪

Start here: https://micro-works-platform-1.onrender.com

#WomenInBusiness #MomBoss #WorkFromHome #ExtraIncome #SideHustle2024`,

  `💸 Calling all busy women! Stop scrolling, start earning!

What if I told you those 2 hours on TikTok could make you $50-100 instead?

That's what I'm doing now:
• Simple 5-10 min tasks
• $5-10 per task
• PayPal payments in 24hrs
• Work from phone or laptop

Already made $320 this month while binge-watching Netflix 😅

Join me: https://micro-works-platform-1.onrender.com

#BossBabe #MakeMoneyOnline #WorkFromHome #FinancialFreedom #WomenEmpowerment`,

  `🎯 Real mom confession: I'm making more money from my couch than I ever thought possible!

No MLM, no pyramid scheme, no selling to friends 🙅‍♀️

Just simple online tasks:
→ Takes 5-10 minutes
→ Pays $5-10 each
→ Can do while kids nap
→ Get paid to PayPal fast

Made $653 last month and it's only going up! 📈

Try it: https://micro-works-platform-1.onrender.com

#MomHustle #StayAtHomeMom #WorkingMom #MomLife #SideIncome #PassiveIncome`,

  `💵 Ladies! If you have:
✨ A phone or laptop
✨ 10 minutes of free time
✨ A PayPal account

You can make $500+ this month!

No special skills needed. Just follow simple instructions and get PAID 💰

I started last week and already earned $180!

Perfect for:
• Stay-at-home moms
• Students
• Anyone wanting extra income

Start now: https://micro-works-platform-1.onrender.com

#MakeMoneyOnline #WomenInBusiness #GirlBoss #FinancialIndependence #SideHustle`,

  `🔥 Tired of being broke? Me too girl, that's why I started this!

Found a platform that pays $5-10 per task (literally takes 5-10 min)

What I love:
💚 Work in pajamas
💚 No boss breathing down my neck
💚 Get paid FAST (24-48hrs)
💚 Perfect for busy women

Made $89 TODAY just from my phone 📱

Available worldwide but perfect for USA ladies!

Join me: https://micro-works-platform-1.onrender.com

#BossBabe #WomenEmpowerment #WorkFromHome #OnlineJobs #MakeMoneyOnline`,

  `🎁 SECRET: How I afford my Starbucks addiction guilt-free now ☕

Started doing these simple online tasks:
• Sign up to websites (super easy)
• Test apps (actually fun!)
• Get paid $5-10 per task

30 minutes a day = $150-300/month = All the lattes I want! 😍

Plus: PayPal payments, work from anywhere, no experience needed

Perfect side hustle for busy women!

Try it: https://micro-works-platform-1.onrender.com

#TreatYourself #MomLife #WorkFromHome #SideHustle #CoffeeMoney #ExtraIncome`,

  `💪 Women supporting women! 

I found this platform and HAD to share with my girls! 

We're all making extra money doing simple tasks:
→ $5-10 per task
→ 5-10 minutes each
→ Can do while watching TV
→ PayPal payments

My friend Sarah made $487 last month!
I made $320!

No catch, just honest work from home 💻

Join us: https://micro-works-platform-1.onrender.com

#WomenSupportingWomen #GirlPower #WorkFromHome #MakeMoneyOnline #SideHustle #BossBabe`,

  `🚨 ATTENTION BUSY WOMEN! 

Stop giving your free time away to social media!

Turn those scrolling hours into MONEY:

Before: Scroll 2 hours → Make $0
Now: Do tasks 30 min → Make $50-100

Simple signups and app tests that pay REAL money to PayPal!

I was skeptical too but I've made over $600 so far! 💰

Try it yourself: https://micro-works-platform-1.onrender.com

#TimeIsMoney #SmartWomen #WorkFromHome #SideHustle #FinancialFreedom #MakeMoneyOnline`,

  `💝 Self-care = Financial care!

Ladies, we take care of everyone else... time to take care of OURSELVES!

I'm making extra income from home:
• No leaving the house
• No childcare needed
• No special skills required
• Just simple 5-10 min tasks

Made $243 last week! Using it for MY savings account 💅

You deserve this too!

Start here: https://micro-works-platform-1.onrender.com

#SelfCare #WomenEmpowerment #FinancialIndependence #MomLife #WorkFromHome #BossBabe`
];

// AI image prompts for professional women
const imagePrompts = [
  "professional young woman working on laptop at home, smiling, modern home office, natural lighting, realistic photo",
  "happy woman holding smartphone with money icons, casual home setting, cheerful expression, photorealistic",
  "confident businesswoman at desk with coffee, working remotely, cozy home office, natural light, realistic",
  "young professional woman celebrating success at computer, excited expression, home workspace, photographic style",
  "woman multitasking with phone and laptop at home, professional casual attire, bright modern interior, realistic photo",
  "smiling woman looking at phone with paypal notification, comfortable home setting, natural lighting, photorealistic",
  "professional woman in home office giving thumbs up, laptop visible, happy expression, realistic photography",
  "young woman working from couch with laptop, relaxed professional look, cozy home, natural light, photographic",
  "confident woman at home desk counting money, professional casual style, modern interior, realistic photo",
  "happy woman with coffee working on laptop, home office setup, cheerful mood, natural lighting, photorealistic"
];

// Generate AI image using free Pollinations API
async function generateAIImage(prompt) {
  return new Promise((resolve, reject) => {
    // Pollinations.ai - 100% FREE AI image generation
    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${Date.now()}`;
    
    console.log('🎨 Generating AI image...');
    console.log('📝 Prompt:', prompt);
    
    https.get(imageUrl, (response) => {
      if (response.statusCode === 200) {
        const filePath = path.join('/tmp', `generated-image-${Date.now()}.jpg`);
        const fileStream = fs.createWriteStream(filePath);
        
        response.pipe(fileStream);
        
        fileStream.on('finish', () => {
          fileStream.close();
          console.log('✅ AI image generated successfully!');
          resolve(filePath);
        });
      } else {
        reject(new Error(`Failed to generate image: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

// Upload image to Facebook
async function uploadImageToFacebook(imagePath, pageId, accessToken) {
  return new Promise((resolve, reject) => {
    const imageBuffer = fs.readFileSync(imagePath);
    const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
    
    const payload = [
      `--${boundary}`,
      'Content-Disposition: form-data; name="source"; filename="image.jpg"',
      'Content-Type: image/jpeg',
      '',
      imageBuffer.toString('binary'),
      `--${boundary}`,
      'Content-Disposition: form-data; name="published"',
      '',
      'false',
      `--${boundary}--`
    ].join('\r\n');

    const options = {
      hostname: 'graph.facebook.com',
      path: `/v18.0/${pageId}/photos?access_token=${accessToken}`,
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const result = JSON.parse(data);
          console.log('✅ Image uploaded to Facebook!');
          resolve(result.id);
        } else {
          console.error('❌ Upload failed:', data);
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(payload, 'binary');
    req.end();
  });
}

// Post to Facebook with image
async function postToFacebook(photoId, caption, pageId, accessToken) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      message: caption,
      attached_media: [{ media_fbid: photoId }]
    });

    const options = {
      hostname: 'graph.facebook.com',
      path: `/v18.0/${pageId}/feed?access_token=${accessToken}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✅ Posted to Facebook successfully!');
          resolve(JSON.parse(data));
        } else {
          console.error('❌ Post failed:', data);
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log('🤖 Facebook Auto Post Bot Starting...');
  console.log('⏰ Time:', new Date().toISOString());

  const pageId = process.env.FACEBOOK_PAGE_ID;
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

  if (!pageId || !accessToken) {
    console.log('⚠️  Facebook credentials not set. Skipping post.');
    console.log('📝 Set FACEBOOK_PAGE_ID and FACEBOOK_ACCESS_TOKEN in GitHub secrets');
    return;
  }

  try {
    // Select caption and image prompt (rotates)
    const index = Math.floor(Date.now() / (1000 * 60 * 60 * 8)) % captions.length;
    const caption = captions[index];
    const prompt = imagePrompts[index];

    console.log(`📊 Using post #${index + 1} of ${captions.length}`);

    // Generate AI image
    const imagePath = await generateAIImage(prompt);

    // Upload image to Facebook
    const photoId = await uploadImageToFacebook(imagePath, pageId, accessToken);

    // Post with caption
    await postToFacebook(photoId, caption, pageId, accessToken);

    // Cleanup
    fs.unlinkSync(imagePath);

    console.log('🎉 Success! Next post in 8 hours.');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
