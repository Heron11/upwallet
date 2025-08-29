// Sign In Page Logic
class SignInPage {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    console.log('Sign in page loaded');
  }

  setupEventListeners() {
    // Google sign in
    document.addEventListener('click', (e) => {
      if (e.target.closest('.google-button')) {
        this.handleGoogleSignIn();
      }
      
      // Wallet connection
      if (e.target.closest('.wallet-button')) {
        this.handleWalletConnection();
      }
      
      // Email sign in
      if (e.target.closest('.email-button')) {
        this.handleEmailSignIn();
      }
    });
  }

  handleGoogleSignIn() {
    console.log('Google sign in clicked');
    // TODO: Implement Google OAuth with Web3Auth
    this.simulateSignIn('google');
  }

  handleWalletConnection() {
    console.log('Wallet connection clicked');
    // TODO: Implement wallet connection (MetaMask, etc.)
    this.simulateSignIn('wallet');
  }

  handleEmailSignIn() {
    console.log('Email sign in clicked');
    // TODO: Implement email/password authentication
    this.simulateSignIn('email');
  }

  simulateSignIn(method) {
    // Simulate successful authentication
    console.log(`Simulating ${method} sign in...`);
    
    // Store authentication state
    chrome.storage.local.set({
      isAuthenticated: true,
      authMethod: method,
      userWallet: {
        address: 'simulated_wallet_address',
        network: 'solana',
        balance: '0'
      }
    }, () => {
      console.log('Authentication state saved');
      this.onSignInSuccess();
    });
  }

  onSignInSuccess() {
    // Add authenticated class to body
    document.body.classList.add('authenticated');
    
    // Navigate to portfolio page
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
  }
}

// Initialize sign in page when content is loaded
let signInInstance = null;

document.addEventListener('DOMContentLoaded', () => {
  signInInstance = new SignInPage();
});

// Listen for sign in content loaded event
document.addEventListener('signinContentLoaded', () => {
  if (signInInstance) {
    signInInstance.setupEventListeners();
  }
});
