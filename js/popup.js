// Main popup controller
class PopupController {
  constructor() {
    this.init();
  }

  init() {
    this.createPages();
    this.setupEventListeners();
  }

  createPages() {
    const mainContent = document.querySelector('.main-content');
    
    // Create page containers
    this.createPageContainer('portfolio', mainContent);
    this.createPageContainer('swap', mainContent);
    this.createPageContainer('recent', mainContent);
    this.createPageContainer('settings', mainContent);
    this.createPageContainer('token-details', mainContent);
    
    // Load content from separate HTML files
    this.loadPageContent('portfolio');
    this.loadPageContent('swap');
    this.loadPageContent('recent');
    this.loadPageContent('settings');
    this.loadPageContent('token-details');
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
