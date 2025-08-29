// Settings Page Logic
class SettingsPage {
  constructor() {
    this.init();
  }

  init() {
    // Settings page initialization will go here
    console.log('Settings page loaded');
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

