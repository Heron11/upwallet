// Main popup controller
class PopupController {
  constructor() {
    this.init();
  }

  async init() {
    await this.checkAuthState();
    this.createPages();
    this.setupEventListeners();
  }

  async checkAuthState() {
    try {
      const data = await chrome.storage.local.get(['isAuthenticated']);
      console.log('Auth state data:', data);
      if (data.isAuthenticated) {
        document.body.classList.add('authenticated');
        console.log('User is authenticated');
      } else {
        document.body.classList.remove('authenticated');
        console.log('User is not authenticated - showing signin page');
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
      document.body.classList.remove('authenticated');
    }
  }

  createPages() {
    const mainContent = document.querySelector('.main-content');
    
    // Create page containers
    this.createPageContainer('portfolio', mainContent);
    this.createPageContainer('swap', mainContent);
    this.createPageContainer('recent', mainContent);
    this.createPageContainer('settings', mainContent);
    this.createPageContainer('token-details', mainContent);
    this.createPageContainer('signin', mainContent);
    
    // Load content from separate HTML files
    this.loadPageContent('portfolio');
    this.loadPageContent('swap');
    this.loadPageContent('recent');
    this.loadPageContent('settings');
    this.loadPageContent('token-details');
    this.loadPageContent('signin');
    
    // Show appropriate page based on auth state (with delay to ensure content is loaded)
    setTimeout(() => {
      this.showInitialPage();
    }, 100);
  }

  showInitialPage() {
    const isAuthenticated = document.body.classList.contains('authenticated');
    console.log('Showing initial page, authenticated:', isAuthenticated);
    if (isAuthenticated) {
      this.showPage('portfolio');
    } else {
      this.showPage('signin');
    }
    
    // Fallback: if no page is active, show signin
    setTimeout(() => {
      const activePage = document.querySelector('.page.active');
      if (!activePage) {
        console.log('No active page found, showing signin as fallback');
        this.showPage('signin');
      }
    }, 200);
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

  createPageContainer(pageName, container) {
    const pageElement = document.createElement('div');
    pageElement.id = `${pageName}-page`;
    pageElement.className = 'page';
    container.appendChild(pageElement);
  }

  async loadPageContent(pageName) {
    const pageElement = document.getElementById(`${pageName}-page`);
    if (!pageElement) return;

    try {
      const response = await fetch(`../views/pages/${pageName}.html`);
      const html = await response.text();
      pageElement.innerHTML = html;
      
      // Set portfolio page as active by default
      if (pageName === 'portfolio') {
        pageElement.classList.add('active');
        // Trigger portfolio rendering after content is loaded
        this.triggerPortfolioRender();
      }
      
      // Trigger swap rendering after content is loaded
      if (pageName === 'swap') {
        document.dispatchEvent(new CustomEvent('swapContentLoaded'));
      }
      
      // Trigger recent rendering after content is loaded
      if (pageName === 'recent') {
        document.dispatchEvent(new CustomEvent('recentContentLoaded'));
      }
      
      // Trigger settings rendering after content is loaded
      if (pageName === 'settings') {
        document.dispatchEvent(new CustomEvent('settingsContentLoaded'));
      }
      
      // Trigger token details rendering after content is loaded
      if (pageName === 'token-details') {
        document.dispatchEvent(new CustomEvent('tokenDetailsContentLoaded'));
      }
      
      // Trigger sign in rendering after content is loaded
      if (pageName === 'signin') {
        document.dispatchEvent(new CustomEvent('signinContentLoaded'));
      }

    } catch (error) {
      console.error(`Error loading ${pageName} content:`, error);
      // Fallback content
      pageElement.innerHTML = `<h2>${pageName}</h2><p>${pageName} content will go here</p>`;
    }
  }

  triggerPortfolioRender() {
    // Dispatch a custom event to trigger portfolio rendering
    const event = new CustomEvent('portfolioContentLoaded');
    document.dispatchEvent(event);
  }



  setupEventListeners() {
    // Add any global event listeners here
    console.log('UP Wallet popup initialized');
  }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PopupController();
});
