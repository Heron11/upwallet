// Token Details Page Logic
class TokenDetailsPage {
  constructor() {
    this.tokenData = null;
    this.transactions = [];
    this.init();
  }

  init() {
    this.loadTokenData();
    this.renderTransactions();
    this.setupEventListeners();
    // Don't render chart immediately - wait for content to be loaded
    console.log('Token details page loaded');
  }

  setupEventListeners() {
    // Back button functionality
    document.addEventListener('click', (e) => {
      if (e.target.closest('#back-to-portfolio')) {
        this.goBackToPortfolio();
      }
    });
  }

  goBackToPortfolio() {
    // Navigate back to portfolio page
    this.showPage('portfolio');
  }

  showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    const targetPage = document.getElementById(`${pageName}-page`);
    if (targetPage) {
      targetPage.classList.add('active');
    }

    // Update menu active state
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => item.classList.remove('active'));
    
    const activeMenuItem = document.querySelector(`[data-page="${pageName}"]`);
    if (activeMenuItem) {
      activeMenuItem.classList.add('active');
    }

    // If showing token details page, render chart
    if (pageName === 'token-details') {
      setTimeout(() => {
        this.renderChart();
      }, 100);
    }
  }

  loadTokenData() {
    // Check if there's selected token data from portfolio
    if (window.selectedTokenData) {
      this.tokenData = window.selectedTokenData;
      this.updateTokenDisplay();
    } else {
      // Fallback to sample data
      this.tokenData = {
        id: "bitcoin",
        symbol: "BTC",
        name: "Bitcoin",
        icon: "../assets/currencies/btcIcon.png",
        balance: 0.0234,
        value: 1234.56,
        price: 52758.12,
        change24h: 2.5,
        marketCap: "1.02T",
        volume24h: "28.5B"
      };
    }
  }

  renderTransactions() {
    const transactionsList = document.querySelector('.transactions-list');
    if (!transactionsList) return;

    if (this.transactions.length === 0) {
      // Show empty state
      transactionsList.innerHTML = `
        <div class="empty-transactions">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <h4>No Transactions</h4>
          <p>Your transaction history for this token will appear here</p>
        </div>
      `;
    } else {
      // Render transaction items
      transactionsList.innerHTML = this.transactions.map(transaction => `
        <div class="transaction-item">
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

  // Method to set token data from portfolio
  setTokenData(tokenData) {
    this.tokenData = tokenData;
    this.updateTokenDisplay();
  }

  updateTokenDisplay() {
    if (!this.tokenData) return;

    // Update token header
    const tokenIcon = document.querySelector('.crypto-icon img');
    const tokenName = document.querySelector('.crypto-full-name');
    const tokenSymbol = document.querySelector('.crypto-symbol');
    const currentPrice = document.querySelector('.crypto-dollar-value');
    const priceChange = document.querySelector('.crypto-token-balance');

    if (tokenIcon) tokenIcon.src = this.tokenData.icon;
    if (tokenName) tokenName.textContent = this.tokenData.name;
    if (tokenSymbol) tokenSymbol.textContent = this.tokenData.symbol;
    if (currentPrice) currentPrice.textContent = `$${this.tokenData.price.toLocaleString()}`;
    if (priceChange) {
      priceChange.textContent = `${this.tokenData.change24h > 0 ? '+' : ''}${this.tokenData.change24h}%`;
    }

    // Update balance
    const balanceAmount = document.querySelector('.balance-amount');
    const balanceValue = document.querySelector('.balance-value');
    
    if (balanceAmount) balanceAmount.textContent = `${this.tokenData.balance.toFixed(4)} ${this.tokenData.symbol}`;
    if (balanceValue) balanceValue.textContent = `$${this.tokenData.value.toLocaleString()}`;
  }

  // Method to add transactions
  addTransaction(transaction) {
    this.transactions.unshift(transaction);
    this.renderTransactions();
  }

  // Method to clear transactions
  clearTransactions() {
    this.transactions = [];
    this.renderTransactions();
  }

  renderChart() {
    console.log('Attempting to render chart...');
    const ctx = document.getElementById('token-chart');
    if (!ctx) {
      console.error('Canvas element not found');
      return;
    }
    console.log('Canvas element found, creating chart...');
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      console.error('Chart.js is not loaded');
      return;
    }
    console.log('Chart.js is loaded, proceeding...');

    // Mock data for the chart
    const data = {
      labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
      datasets: [{
        label: 'Price',
        data: [52000, 52250, 52500, 52300, 51800, 52100, 53200, 53000, 52800, 52950, 52758, 52600],
        borderColor: '#5a029f',
        backgroundColor: 'transparent',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: '#5a029f',
        pointHoverBorderColor: '#5a029f'
      }]
    };

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        layout: {
          padding: 0
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#ffffff',
            titleColor: '#333333',
            bodyColor: '#333333',
            borderColor: '#e9ecef',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: false
          }
        },
        scales: {
          x: {
            display: false
          },
          y: {
            display: false
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    };

    try {
      new Chart(ctx, config);
      console.log('Chart created successfully');
    } catch (error) {
      console.error('Error creating chart:', error);
      // Fallback: create a simple SVG chart
      this.createFallbackChart();
    }
  }

  createFallbackChart() {
    const chartContainer = document.querySelector('.chart-container');
    if (!chartContainer) return;

    const data = [52000, 52500, 51800, 53200, 52800, 52758];
    const width = 280;
    const height = 180;
    const padding = 20;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);
    const valueRange = maxValue - minValue;
    
    const points = data.map((value, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth;
      const y = padding + chartHeight - ((value - minValue) / valueRange) * chartHeight;
      return `${x},${y}`;
    }).join(' ');

    chartContainer.innerHTML = `
      <svg width="${width}" height="${height}" style="background: white;">
        <polyline 
          fill="none" 
          stroke="#5a029f" 
          stroke-width="2" 
          points="${points}"
        />
        <polygon 
          fill="rgba(90, 2, 159, 0.1)" 
          points="${points} ${padding + chartWidth},${padding + chartHeight} ${padding},${padding + chartHeight}"
        />
      </svg>
    `;
  }
}

// Initialize token details page when content is loaded
let tokenDetailsInstance = null;

document.addEventListener('DOMContentLoaded', () => {
  tokenDetailsInstance = new TokenDetailsPage();
});

// Listen for token details content loaded event
document.addEventListener('tokenDetailsContentLoaded', () => {
  if (tokenDetailsInstance) {
    tokenDetailsInstance.loadTokenData();
    tokenDetailsInstance.renderTransactions();
    // Render chart after content is loaded
    setTimeout(() => {
      tokenDetailsInstance.renderChart();
    }, 100);
  }
});
