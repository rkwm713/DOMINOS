/**
 * Reset script - Use this to force clear localStorage and refresh the page
 */

// Function to reset localStorage and reload the application
function resetApplication() {
  // Clear all data in localStorage
  localStorage.removeItem('permits');
  
  // Reload the page to trigger repopulation
  window.location.reload();
  
  return false; // Prevent form submission
}

// Add reset button to the page
function addResetButton() {
  // Find header element
  const header = document.querySelector('header');
  
  if (header) {
    // Create reset button
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset All Data';
    resetButton.className = 'btn btn-danger reset-btn';
    resetButton.addEventListener('click', resetApplication);
    
    // Add to header
    header.appendChild(resetButton);
    
    // Add some styles for the button
    const style = document.createElement('style');
    style.textContent = `
      .reset-btn {
        margin-top: 10px;
        background-color: #dc3545;
      }
      
      .reset-btn:hover {
        background-color: #bd2130;
      }
    `;
    document.head.appendChild(style);
  }
}

// Add the reset button when the DOM is loaded
document.addEventListener('DOMContentLoaded', addResetButton);
