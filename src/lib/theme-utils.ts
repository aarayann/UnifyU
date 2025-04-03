/**
 * This file contains utility functions for theme management
 */

/**
 * Initialize the theme based on local storage or system preference
 */
export function initializeTheme() {
  // Check for saved theme in localStorage
  const savedTheme = localStorage.getItem("theme");
  
  // Check if the user has a system preference for dark mode
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  // If the user has explicitly chosen a theme, use that
  // Otherwise, use their system preference
  if (savedTheme === "dark" || (!savedTheme && prefersDarkMode)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

/**
 * Add a script to initialize theme before page load to prevent flash of wrong theme
 */
export function addThemeInitScript() {
  // This script will run before the page content loads
  const themeScript = `
    (function() {
      const savedTheme = localStorage.getItem("theme");
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      
      if (savedTheme === "dark" || (!savedTheme && prefersDarkMode)) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    })();
  `;
  
  // Create script element and append to head
  const scriptElement = document.createElement("script");
  scriptElement.textContent = themeScript;
  document.head.appendChild(scriptElement);
}
