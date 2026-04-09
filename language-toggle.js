// Enhanced Language Toggle Functionality
class LanguageToggle {
  constructor() {
    this.currentLang = 'es';
    this.toggleButton = document.getElementById('langToggle');
    this.htmlRoot = document.documentElement;
    
    this.init();
  }

  init() {
    // Load saved language preference
    this.loadSavedLanguage();
    
    // Add event listener to toggle button
    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', () => this.toggleLanguage());
    }
    
    // Set initial button state
    this.updateButtonState();
  }

  loadSavedLanguage() {
    const savedLang = localStorage.getItem('language') || 'es';
    this.currentLang = savedLang;
    this.htmlRoot.lang = savedLang;
    
    // Apply initial language state
    this.applyLanguageState(savedLang);
  }

  toggleLanguage() {
    // Switch language
    this.currentLang = this.currentLang === 'es' ? 'en' : 'es';
    
    // Update HTML lang attribute
    this.htmlRoot.lang = this.currentLang;
    
    // Apply language state
    this.applyLanguageState(this.currentLang);
    
    // Save preference
    localStorage.setItem('language', this.currentLang);
    
    // Update button
    this.updateButtonState();
    
    // Log for debugging
    console.log(`Language switched to: ${this.currentLang}`);
  }

  applyLanguageState(lang) {
    // Hide/show elements based on language
    const spanishElements = document.querySelectorAll('[lang="es"]');
    const englishElements = document.querySelectorAll('[lang="en"]');
    
    if (lang === 'en') {
      // Show English, hide Spanish
      spanishElements.forEach(el => {
        el.style.display = 'none';
        el.classList.add('hide-es');
      });
      englishElements.forEach(el => {
        el.style.display = '';
        el.classList.remove('hide-en');
      });
    } else {
      // Show Spanish, hide English
      englishElements.forEach(el => {
        el.style.display = 'none';
        el.classList.add('hide-en');
      });
      spanishElements.forEach(el => {
        el.style.display = '';
        el.classList.remove('hide-es');
      });
    }
  }

  updateButtonState() {
    if (!this.toggleButton) return;
    
    if (this.currentLang === 'en') {
      this.toggleButton.textContent = 'ES';
      this.toggleButton.title = 'Cambiar a Español';
    } else {
      this.toggleButton.textContent = 'EN';
      this.toggleButton.title = 'Switch to English';
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new LanguageToggle();
});

// Also initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new LanguageToggle();
  });
} else {
  new LanguageToggle();
}
