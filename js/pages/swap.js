class SwapPage {
  constructor() {
    this.initializeSwap();
  }

  initializeSwap() {
    // Use event delegation to handle the swap arrow button click
    document.addEventListener('click', (event) => {
      if (event.target.closest('.swap-arrow-button')) {
        this.animateAndSwitchTokens(event.target.closest('.swap-arrow-button'));
      }
    });
  }

  animateAndSwitchTokens(button) {
    // Toggle rotation class for animation
    button.classList.toggle('rotated');
    
    // Switch tokens
    this.switchTokens();
  }

  switchTokens() {
    console.log('Switch tokens clicked!'); // Debug log
    
    // Get all swap input containers
    const swapContainers = document.querySelectorAll('.swap-input-container');
    if (swapContainers.length < 2) {
      console.log('Not enough swap containers found');
      return;
    }

    const fromContainer = swapContainers[0];
    const toContainer = swapContainers[1];
    
    // Get the token selectors and amount inputs
    const fromTokenSelector = fromContainer.querySelector('.token-selector');
    const toTokenSelector = toContainer.querySelector('.token-selector');
    const fromAmountInput = fromContainer.querySelector('.amount-input input');
    const toAmountInput = toContainer.querySelector('.amount-input input');
    const fromBalance = fromContainer.querySelector('.swap-balance');
    const toBalance = toContainer.querySelector('.swap-balance');

    if (!fromTokenSelector || !toTokenSelector || !fromAmountInput || !toAmountInput) {
      console.log('Required elements not found');
      return;
    }

    // Store current values
    const fromTokenHTML = fromTokenSelector.innerHTML;
    const toTokenHTML = toTokenSelector.innerHTML;
    const fromAmount = fromAmountInput.value;
    const toAmount = toAmountInput.value;
    const fromBalanceText = fromBalance.textContent;
    const toBalanceText = toBalance.textContent;

    console.log('Swapping tokens:', { fromAmount, toAmount, fromBalanceText, toBalanceText });

    // Swap the token selectors
    fromTokenSelector.innerHTML = toTokenHTML;
    toTokenSelector.innerHTML = fromTokenHTML;

    // Swap the amounts
    fromAmountInput.value = toAmount;
    toAmountInput.value = fromAmount;

    // Swap the balances
    fromBalance.textContent = toBalanceText;
    toBalance.textContent = fromBalanceText;
    
    console.log('Tokens switched successfully!');
  }
}

// Initialize swap page when content is loaded
document.addEventListener('swapContentLoaded', () => {
  new SwapPage();
});
