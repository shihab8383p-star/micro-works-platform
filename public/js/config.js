// API Configuration
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api' 
  : '/api';

// Auth token management
const getToken = () => localStorage.getItem('token');
const setToken = (token) => localStorage.setItem('token', token);
const removeToken = () => localStorage.removeItem('token');
const getUser = () => JSON.parse(localStorage.getItem('user') || 'null');
const setUser = (user) => localStorage.setItem('user', JSON.stringify(user));
const removeUser = () => localStorage.removeItem('user');

// API helper function
async function apiCall(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Check if user is logged in
function isLoggedIn() {
  return !!getToken();
}

// Logout function
function logout() {
  removeToken();
  removeUser();
  window.location.href = '/';
}

// Format currency
function formatCurrency(amount) {
  return `৳${amount.toFixed(2)}`;
}

// Format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Format time ago
function timeAgo(dateString) {
  const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  
  return Math.floor(seconds) + ' seconds ago';
}

// Show notification
function showNotification(message, type = 'success') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.textContent = message;
  alertDiv.style.position = 'fixed';
  alertDiv.style.top = '20px';
  alertDiv.style.right = '20px';
  alertDiv.style.zIndex = '10000';
  alertDiv.style.minWidth = '300px';
  alertDiv.style.animation = 'slideInRight 0.3s';
  
  document.body.appendChild(alertDiv);
  
  setTimeout(() => {
    alertDiv.style.animation = 'slideOutRight 0.3s';
    setTimeout(() => alertDiv.remove(), 300);
  }, 3000);
}

// Update navigation based on auth status
function updateNavigation() {
  const user = getUser();
  const authNav = document.getElementById('authNav');
  
  if (!authNav) return;
  
  if (user) {
    authNav.innerHTML = `
      <li><a href="/dashboard.html">Dashboard</a></li>
      <li><a href="/jobs.html">Browse Jobs</a></li>
      <li><a href="/referrals.html">💰 Referrals</a></li>
      <li><a href="#" onclick="logout()">Logout</a></li>
      <li><span class="btn btn-sm btn-primary">${user.name}</span></li>
    `;
  } else {
    authNav.innerHTML = `
      <li><a href="/login.html">Login</a></li>
      <li><a href="/register.html" class="btn btn-sm btn-primary">Sign Up</a></li>
    `;
  }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  updateNavigation();
});
