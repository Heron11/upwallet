// Settings Page Logic
class SettingsPage {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    console.log('Settings page loaded');
  }

  setupEventListeners() {
    // Sign out button functionality
    document.addEventListener('click', (e) => {
      if (e.target.closest('.sign-out-button')) {
        this.handleSignOut();
      }
    });
  }

  handleSignOut() {
    console.log('Sign out clicked');
    
    // Clear authentication state
    chrome.storage.local.remove(['isAuthenticated', 'authMethod', 'userWallet'], () => {
      console.log('Authentication state cleared');
      
      // Remove authenticated class from body
      document.body.classList.remove('authenticated');
      
      // Navigate to sign in page
      this.showPage('signin');
    });
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

    // Update menu active state (only for authenticated pages)
    if (pageName !== 'signin') {
      const menuItems = document.querySelectorAll('.menu-item');
      menuItems.forEach(item => item.classList.remove('active'));
      
      const activeMenuItem = document.querySelector(`[data-page="${pageName}"]`);
      if (activeMenuItem) {
        activeMenuItem.classList.add('active');
      }
    }
  }
}

// Initialize settings page when loaded
document.addEventListener('DOMContentLoaded', () => {
  new SettingsPage();
});

// Listen for settings content loaded event
document.addEventListener('settingsContentLoaded', () => {
  new SettingsPage();
});

