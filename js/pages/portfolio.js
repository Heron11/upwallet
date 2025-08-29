// Portfolio Page Logic
class PortfolioPage {
  constructor() {
    this.cryptoData = [
      {
        id: "bitcoin",
        symbol: "BTC",
        name: "Bitcoin",
        icon: "",
        balance: 0.0234,
        value: 1234.56,
        price: 52758.12,
        change24h: 2.5
      },
      {
        id: "ethereum",
        symbol: "ETH",
        name: "Ethereum", 
        icon: "",
        balance: 2.45,
        value: 4567.89,
        price: 1864.44,
        change24h: -1.2
      },
      {
        id: "solana",
        symbol: "SOL",
        name: "Solana",
        icon: "",
        balance: 12.5,
        value: 1897.50,
        price: 151.80,
        change24h: 3.8
      },
      {
        id: "usdc",
        symbol: "USDC",
        name: "USD Coin",
        icon: "💵",
        balance: 500.00,
        value: 500.00,
        price: 1.00,
        change24h: 0.0
      }
    ];
    this.init();
  }

  init() {
    this.renderCryptoList();
    console.log('Portfolio page loaded');
  }

  renderCryptoList() {
    const cryptoListContainer = document.querySelector('.crypto-list');
    if (!cryptoListContainer) return;

    cryptoListContainer.innerHTML = this.cryptoData.map(crypto => `
      <div class="crypto-item" data-id="${crypto.id}">
        <div class="crypto-info">
          <div class="crypto-icon">
            ${crypto.id === 'bitcoin' ? '<img src="../assets/currencies/btcIcon.png" alt="BTC" width="32" height="32">' :
              crypto.id === 'ethereum' ? '<img src="../assets/currencies/ethIcon.png" alt="ETH" width="32" height="32">' :
              crypto.id === 'solana' ? '<img src="../assets/currencies/solIcon.png" alt="SOL" width="32" height="32">' :
              crypto.icon}
          </div>
          <div class="crypto-details">
            <div class="crypto-symbol">${crypto.symbol}</div>
            <div class="crypto-full-name">${crypto.name}</div>
          </div>
        </div>
        <div class="crypto-value-section">
          <div class="crypto-dollar-value">$${crypto.value.toLocaleString()}</div>
          <div class="crypto-token-balance">${crypto.balance.toFixed(4)} ${crypto.symbol}</div>
        </div>
      </div>
    `).join('');

    // Add click event listeners to crypto items
    this.addCryptoItemListeners();
  }

  addCryptoItemListeners() {
    const cryptoItems = document.querySelectorAll('.crypto-item');
    cryptoItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const cryptoId = item.dataset.id;
        this.navigateToTokenDetails(cryptoId);
      });
    });
  }

  navigateToTokenDetails(cryptoId) {
    // Find the crypto data for the clicked token
    const cryptoData = this.cryptoData.find(crypto => crypto.id === cryptoId);
    if (!cryptoData) return;

    // Store the selected token data for the details page
    window.selectedTokenData = {
      id: cryptoData.id,
      symbol: cryptoData.symbol,
      name: cryptoData.name,
      icon: cryptoData.id === 'bitcoin' ? '../assets/currencies/btcIcon.png' :
            cryptoData.id === 'ethereum' ? '../assets/currencies/ethIcon.png' :
            cryptoData.id === 'solana' ? '../assets/currencies/solIcon.png' :
            cryptoData.icon,
      balance: cryptoData.balance,
      value: cryptoData.value,
      price: cryptoData.price,
      change24h: cryptoData.change24h,
      marketCap: cryptoData.marketCap || "1.02T",
      volume24h: cryptoData.volume24h || "28.5B"
    };

    // Navigate to token details page
    this.showPage('token-details');
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

    // Update menu active state (if it's a main menu page)
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => item.classList.remove('active'));
    
    // Don't highlight any menu item for token details page
    if (pageName !== 'token-details') {
      const activeMenuItem = document.querySelector(`[data-page="${pageName}"]`);
      if (activeMenuItem) {
        activeMenuItem.classList.add('active');
      }
    }
  }
}

// Initialize portfolio page when content is loaded
let portfolioInstance = null;

document.addEventListener('DOMContentLoaded', () => {
  portfolioInstance = new PortfolioPage();
});

// Listen for portfolio content loaded event
document.addEventListener('portfolioContentLoaded', () => {
  if (portfolioInstance) {
    portfolioInstance.renderCryptoList();
  }
});
