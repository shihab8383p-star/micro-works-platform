// Day Rotation Helper Functions

// Calculate current day in 3-day rotation
function getCurrentRotationDay() {
  const startDate = new Date('2026-01-01'); // Reference start date
  const today = new Date();
  const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  return (daysSinceStart % 3) + 1; // Returns 1, 2, or 3
}

// Get time until next day rotation
function getTimeUntilNextRotation() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  const diff = tomorrow - now;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return { hours, minutes, totalMs: diff };
}

// Format day rotation message
function getDayRotationMessage(currentDay) {
  const messages = {
    1: {
      title: "📅 Day 1 Tasks Available!",
      description: "Complete today's 20 tasks and earn up to $1.49!",
      color: "#4CAF50"
    },
    2: {
      title: "📅 Day 2 Tasks Available!",
      description: "New tasks unlocked! Complete 15 tasks and earn up to $1.12!",
      color: "#2196F3"
    },
    3: {
      title: "📅 Day 3 Tasks Available!",
      description: "Final day tasks! Complete 15 tasks and earn up to $1.16!",
      color: "#FF9800"
    }
  };
  
  return messages[currentDay] || messages[1];
}

// Display rotation banner
function showRotationBanner() {
  const currentDay = getCurrentRotationDay();
  const message = getDayRotationMessage(currentDay);
  const timeUntil = getTimeUntilNextRotation();
  
  const banner = document.createElement('div');
  banner.id = 'rotationBanner';
  banner.style.cssText = `
    background: linear-gradient(135deg, ${message.color}, ${adjustColor(message.color, -20)});
    color: white;
    padding: 1.5rem;
    border-radius: 10px;
    margin-bottom: 2rem;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  `;
  
  banner.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
      <div style="flex: 1;">
        <h3 style="margin: 0; font-size: 1.5rem;">${message.title}</h3>
        <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem;">${message.description}</p>
      </div>
      <div style="text-align: center; background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 8px;">
        <div style="font-size: 0.9rem; margin-bottom: 0.5rem;">New tasks in:</div>
        <div id="rotationCountdown" style="font-size: 1.5rem; font-weight: bold;">
          ${timeUntil.hours}h ${timeUntil.minutes}m
        </div>
      </div>
    </div>
  `;
  
  return banner;
}

// Adjust color brightness
function adjustColor(color, amount) {
  const clamp = (val) => Math.min(Math.max(val, 0), 255);
  const num = parseInt(color.replace("#", ""), 16);
  const r = clamp((num >> 16) + amount);
  const g = clamp(((num >> 8) & 0x00FF) + amount);
  const b = clamp((num & 0x0000FF) + amount);
  return "#" + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
}

// Update countdown every minute
function startRotationCountdown() {
  setInterval(() => {
    const countdown = document.getElementById('rotationCountdown');
    if (countdown) {
      const timeUntil = getTimeUntilNextRotation();
      countdown.textContent = `${timeUntil.hours}h ${timeUntil.minutes}m`;
      
      // Reload page when day changes
      if (timeUntil.hours === 0 && timeUntil.minutes === 0) {
        window.location.reload();
      }
    }
  }, 60000); // Update every minute
}
