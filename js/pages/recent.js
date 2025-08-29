class RecentPage {
  constructor() {
    this.transactions = []; // Empty array for now, will be filled later
    this.initializeRecent();
  }

  initializeRecent() {
    this.renderTransactions();
  }

  renderTransactions() {
    const transactionsList = document.querySelector('.transactions-list');
    if (!transactionsList) return;

    if (this.transactions.length === 0) {
      // Show empty state
      transactionsList.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div class="empty-text">
            <h3>No Recent Activity</h3>
            <p>Your transaction history will appear here</p>
          </div>
        </div>
      `;
    } else {
      // Render transaction cards
      transactionsList.innerHTML = this.transactions.map(transaction => `
        <div class="transaction-card">
          <div class="transaction-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div class="transaction-info">
            <div class="transaction-title">${transaction.title}</div>
            <div class="transaction-subtitle">${transaction.subtitle}</div>
          </div>
          <div class="transaction-amount">
            <div class="transaction-value">${transaction.value}</div>
            <div class="transaction-time">${transaction.time}</div>
          </div>
        </div>
      `).join('');
    }
  }

  // Method to add transactions later
  addTransaction(transaction) {
    this.transactions.unshift(transaction); // Add to beginning of array
    this.renderTransactions();
  }

  // Method to clear transactions
  clearTransactions() {
    this.transactions = [];
    this.renderTransactions();
  }
}

// Initialize recent page when content is loaded
document.addEventListener('recentContentLoaded', () => {
  new RecentPage();
});
