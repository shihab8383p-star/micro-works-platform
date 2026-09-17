// Check authentication
if (!isLoggedIn()) {
  window.location.href = '/login.html';
}

const user = getUser();
let categories = [];

// Initialize dashboard
document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('userName').textContent = user.name;
  document.getElementById('userRole').textContent = user.role.toUpperCase();

  await loadCategories();
  await loadDashboardStats();

  if (user.role === 'worker') {
    document.getElementById('workerDashboard').classList.remove('hidden');
    await loadMyApplications();
    await loadTransactions();
  } else if (user.role === 'employer') {
    document.getElementById('employerDashboard').classList.remove('hidden');
    await loadMyJobs();
  } else if (user.role === 'admin') {
    document.getElementById('adminDashboard').classList.remove('hidden');
  }
});

async function loadCategories() {
  try {
    const { data } = await apiCall('/categories');
    categories = data;
    
    const select = document.getElementById('jobCategory');
    if (select) {
      select.innerHTML = data.map(cat => 
        `<option value="${cat._id}">${cat.name}</option>`
      ).join('');
    }
  } catch (error) {
    console.error('Failed to load categories');
  }
}

async function loadDashboardStats() {
  try {
    const { data: userData } = await apiCall('/auth/me');
    
    let statsHTML = '';
    
    if (user.role === 'worker') {
      statsHTML = `
        <div class="stat-card success">
          <div class="stat-label">Available Balance</div>
          <div class="stat-value">${formatCurrency(userData.balance)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Total Earned</div>
          <div class="stat-value">${formatCurrency(userData.totalEarned)}</div>
        </div>
        <div class="stat-card warning">
          <div class="stat-label">Completed Jobs</div>
          <div class="stat-value">${userData.completedJobs}</div>
        </div>
        <div class="stat-card primary">
          <div class="stat-label">Referral Earnings</div>
          <div class="stat-value">${formatCurrency(userData.referralEarnings || 0)}</div>
        </div>
      `;
      
      // Add referral section for workers
      const referralBox = `
        <div class="card" style="background: linear-gradient(135deg, var(--primary-color), var(--success-color)); color: white; margin-top: 2rem;">
          <h3 style="color: white;">🎁 Earn 10% Commission - Refer Friends!</h3>
          <p>Your Referral Code: <strong style="font-size: 1.5rem; letter-spacing: 2px;">${userData.referralCode || 'N/A'}</strong></p>
          <p>Total Referrals: <strong>${userData.totalReferrals || 0}</strong> | Earnings: <strong>${formatCurrency(userData.referralEarnings || 0)}</strong></p>
          <a href="/referrals.html" class="btn btn-light" style="margin-top: 1rem;">View Referral Dashboard</a>
        </div>
      `;
      
      setTimeout(() => {
        const workerDash = document.getElementById('workerDashboard');
        if (workerDash && !document.getElementById('referralBoxAdded')) {
          const div = document.createElement('div');
          div.id = 'referralBoxAdded';
          div.innerHTML = referralBox;
          workerDash.insertBefore(div, workerDash.firstChild);
        }
      }, 100);
    } else if (user.role === 'employer') {
      statsHTML = `
        <div class="stat-card success">
          <div class="stat-label">Account Balance</div>
          <div class="stat-value">${formatCurrency(userData.balance)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Total Spent</div>
          <div class="stat-value">${formatCurrency(userData.totalSpent)}</div>
        </div>
        <div class="stat-card warning">
          <div class="stat-label">Active Jobs</div>
          <div class="stat-value" id="activeJobsCount">0</div>
        </div>
        <div class="stat-card danger">
          <div class="stat-label">Rating</div>
          <div class="stat-value">⭐ ${userData.rating.toFixed(1)}</div>
        </div>
      `;
    }
    
    document.getElementById('dashboardStats').innerHTML = statsHTML;
  } catch (error) {
    console.error('Failed to load stats');
  }
}

async function loadMyApplications() {
  try {
    const { data } = await apiCall('/applications/my-applications');
    const container = document.getElementById('myApplications');
    
    if (data.length === 0) {
      container.innerHTML = '<p class="text-center">No applications yet. <a href="/jobs.html">Browse jobs</a> to get started!</p>';
      return;
    }

    container.innerHTML = `
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Price</th>
              <th>Status</th>
              <th>Applied</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(app => `
              <tr>
                <td>${app.job?.title || 'N/A'}</td>
                <td>${formatCurrency(app.job?.price || 0)}</td>
                <td><span class="badge badge-${getStatusBadge(app.status)}">${app.status}</span></td>
                <td>${formatDate(app.createdAt)}</td>
                <td>
                  ${app.status === 'accepted' || app.status === 'in-progress' ? 
                    `<button class="btn btn-sm btn-success" onclick="submitWork('${app._id}')">Submit Work</button>` : 
                    '<span>-</span>'
                  }
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  } catch (error) {
    document.getElementById('myApplications').innerHTML = '<p class="text-center">Failed to load applications</p>';
  }
}

async function loadMyJobs() {
  try {
    const { data } = await apiCall('/jobs/my-jobs');
    const container = document.getElementById('myJobs');
    
    if (data.length === 0) {
      container.innerHTML = '<p class="text-center">No jobs posted yet. Click "Post New Job" to get started!</p>';
      return;
    }

    // Update active jobs count
    const activeCount = data.filter(j => j.status === 'active').length;
    const activeJobsElement = document.getElementById('activeJobsCount');
    if (activeJobsElement) activeJobsElement.textContent = activeCount;

    container.innerHTML = `
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Price</th>
              <th>Workers</th>
              <th>Applications</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(job => `
              <tr>
                <td>${job.title}</td>
                <td>${formatCurrency(job.price)}</td>
                <td>${job.currentWorkers}/${job.maxWorkers}</td>
                <td>${job.applicants}</td>
                <td><span class="badge badge-${getStatusBadge(job.status)}">${job.status}</span></td>
                <td>
                  <button class="btn btn-sm btn-primary" onclick="viewApplications('${job._id}')">
                    View Applications
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  } catch (error) {
    document.getElementById('myJobs').innerHTML = '<p class="text-center">Failed to load jobs</p>';
  }
}

async function loadTransactions() {
  try {
    const { data } = await apiCall('/transactions?limit=10');
    const container = document.getElementById('transactions');
    
    if (data.length === 0) {
      container.innerHTML = '<p class="text-center">No transactions yet</p>';
      return;
    }

    container.innerHTML = `
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(txn => `
              <tr>
                <td>${txn.type}</td>
                <td style="color: ${txn.amount > 0 ? 'var(--success-color)' : 'var(--danger-color)'}">
                  ${txn.amount > 0 ? '+' : ''}${formatCurrency(txn.amount)}
                </td>
                <td>${txn.description}</td>
                <td>${formatDate(txn.createdAt)}</td>
                <td><span class="badge badge-${getStatusBadge(txn.status)}">${txn.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  } catch (error) {
    document.getElementById('transactions').innerHTML = '<p class="text-center">Failed to load transactions</p>';
  }
}

function getStatusBadge(status) {
  const badges = {
    'pending': 'warning',
    'accepted': 'primary',
    'completed': 'success',
    'rejected': 'danger',
    'active': 'success',
    'paused': 'warning',
    'cancelled': 'danger',
    'submitted': 'primary',
    'processing': 'warning'
  };
  return badges[status] || 'primary';
}

// Withdraw Modal
function showWithdrawModal() {
  document.getElementById('withdrawModal').classList.add('active');
}

function closeWithdrawModal() {
  document.getElementById('withdrawModal').classList.remove('active');
}

document.getElementById('withdrawForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const amount = parseFloat(document.getElementById('withdrawAmount').value);
  const method = document.getElementById('withdrawMethod').value;
  const accountNumber = document.getElementById('withdrawAccount').value;
  const accountName = document.getElementById('withdrawName').value;

  try {
    await apiCall('/withdrawals', {
      method: 'POST',
      body: JSON.stringify({ amount, method, accountNumber, accountName })
    });

    showNotification('Withdrawal request submitted successfully!', 'success');
    closeWithdrawModal();
    await loadDashboardStats();
    await loadTransactions();
    document.getElementById('withdrawForm').reset();
  } catch (error) {
    showNotification(error.message, 'error');
  }
});

// Create Job Modal
function showCreateJobModal() {
  document.getElementById('createJobModal').classList.add('active');
}

function closeCreateJobModal() {
  document.getElementById('createJobModal').classList.remove('active');
}

document.getElementById('createJobForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const jobData = {
    title: document.getElementById('jobTitle').value,
    category: document.getElementById('jobCategory').value,
    description: document.getElementById('jobDescription').value,
    price: parseFloat(document.getElementById('jobPrice').value),
    maxWorkers: parseInt(document.getElementById('jobMaxWorkers').value),
    duration: document.getElementById('jobDuration').value,
    requirements: document.getElementById('jobRequirements').value
  };

  try {
    await apiCall('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData)
    });

    showNotification('Job posted successfully!', 'success');
    closeCreateJobModal();
    await loadMyJobs();
    document.getElementById('createJobForm').reset();
  } catch (error) {
    showNotification(error.message, 'error');
  }
});

async function submitWork(applicationId) {
  const description = prompt('Describe the work you have completed:');
  if (!description) return;

  try {
    await apiCall(`/applications/${applicationId}/submit`, {
      method: 'PUT',
      body: JSON.stringify({ description })
    });

    showNotification('Work submitted successfully!', 'success');
    await loadMyApplications();
  } catch (error) {
    showNotification(error.message, 'error');
  }
}

async function viewApplications(jobId) {
  try {
    const { data } = await apiCall(`/applications/job/${jobId}`);
    
    if (data.length === 0) {
      showNotification('No applications yet for this job', 'info');
      return;
    }

    // Create a simple modal to show applications
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Job Applications</h3>
          <button class="close-modal" onclick="this.closest('.modal').remove()">&times;</button>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Worker</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Applied</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${data.map(app => `
                <tr>
                  <td>${app.worker?.name || 'N/A'}</td>
                  <td>⭐ ${app.worker?.rating?.toFixed(1) || '0.0'}</td>
                  <td><span class="badge badge-${getStatusBadge(app.status)}">${app.status}</span></td>
                  <td>${formatDate(app.createdAt)}</td>
                  <td>
                    ${app.status === 'pending' ? `
                      <button class="btn btn-sm btn-success" onclick="handleApplication('${app._id}', 'accepted')">Accept</button>
                      <button class="btn btn-sm btn-danger" onclick="handleApplication('${app._id}', 'rejected')">Reject</button>
                    ` : app.status === 'submitted' ? `
                      <button class="btn btn-sm btn-success" onclick="reviewApplication('${app._id}', true)">Approve</button>
                      <button class="btn btn-sm btn-danger" onclick="reviewApplication('${app._id}', false)">Reject</button>
                    ` : '-'}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  } catch (error) {
    showNotification('Failed to load applications', 'error');
  }
}

async function handleApplication(appId, status) {
  try {
    await apiCall(`/applications/${appId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });

    showNotification(`Application ${status}!`, 'success');
    document.querySelector('.modal.active')?.remove();
    await loadMyJobs();
  } catch (error) {
    showNotification(error.message, 'error');
  }
}

async function reviewApplication(appId, approved) {
  const rating = approved ? parseInt(prompt('Rate the work (1-5):') || '5') : 0;
  const comment = prompt('Add a comment:') || '';

  try {
    await apiCall(`/applications/${appId}/review`, {
      method: 'PUT',
      body: JSON.stringify({ rating, comment, approved })
    });

    showNotification(approved ? 'Work approved and payment sent!' : 'Work rejected', 'success');
    document.querySelector('.modal.active')?.remove();
    await loadMyJobs();
  } catch (error) {
    showNotification(error.message, 'error');
  }
}

// Close modals on outside click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('active');
  }
});
