
/**
 * This file contains utility functions for theme management
 */

/**
 * Initialize the theme based on local storage or system preference
 */
export function initializeTheme() {
  // Always start in light mode
  document.documentElement.classList.remove("dark");
  
  // If user has explicitly chosen dark mode in this session, apply it
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  }
}

/**
 * Add a script to initialize theme before page load to prevent flash of wrong theme
 */
export function addThemeInitScript() {
  // This script will run before the page content loads
  const themeScript = `
    (function() {
      // Always default to light mode
      document.documentElement.classList.remove("dark");
      
      // Check for user preference only for the current session
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      }
    })();
  `;
  
  // Create script element and append to head
  const scriptElement = document.createElement("script");
  scriptElement.textContent = themeScript;
  document.head.appendChild(scriptElement);
}
