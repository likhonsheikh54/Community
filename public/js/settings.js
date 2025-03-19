/**
 * Settings management functionality
 * Handles saving and loading user settings
 */

// Import necessary modules (assuming these are defined elsewhere)
// For demonstration, we'll define them as empty functions.
// In a real application, these would be imported from other modules.
const getSettings = () => {
  return {
    companyName: "",
    currencySymbol: "",
    lowStockThreshold: 0,
    theme: "light",
    itemsPerPage: 10,
    defaultCategory: "",
  }
}
const showToast = (message, type) => {
  console.log(`${type}: ${message}`)
}
const saveSettings = (settings) => {
  console.log("Settings saved:", settings)
}
const addActivity = (type, description) => {
  console.log("Activity:", type, description)
}
const updateDashboard = () => {
  console.log("Dashboard updated")
}
const loadInventoryItems = () => {
  console.log("Inventory items loaded")
}
const showConfirmModal = (message, callback) => {
  if (confirm(message)) {
    callback()
  }
}
const resetSettings = () => {
  // Reset settings logic here (e.g., clear local storage)
  console.log("Settings reset to default")
}

// Initialize settings module
function initSettings() {
  // Load settings
  loadSettings()

  // Set up event listeners
  document.getElementById("settings-form").addEventListener("submit", (event) => {
    event.preventDefault()
    saveSettingsForm()
  })

  document.getElementById("reset-settings").addEventListener("click", () => {
    confirmResetSettings()
  })

  // Apply theme
  applyTheme()
}

// Load settings into form
function loadSettings() {
  const settings = getSettings()

  // Populate form fields
  document.getElementById("company-name").value = settings.companyName
  document.getElementById("currency-symbol").value = settings.currencySymbol
  document.getElementById("low-stock-threshold").value = settings.lowStockThreshold
  document.getElementById("theme").value = settings.theme
  document.getElementById("items-per-page").value = settings.itemsPerPage

  // Set default category if categories are loaded
  if (document.getElementById("default-category")) {
    document.getElementById("default-category").value = settings.defaultCategory || ""
  }
}

// Save settings from form
function saveSettingsForm() {
  // Get form values
  const companyName = document.getElementById("company-name").value.trim()
  const currencySymbol = document.getElementById("currency-symbol").value.trim()
  const lowStockThreshold = Number.parseInt(document.getElementById("low-stock-threshold").value)
  const theme = document.getElementById("theme").value
  const itemsPerPage = Number.parseInt(document.getElementById("items-per-page").value)
  const defaultCategory = document.getElementById("default-category")?.value || ""

  // Validate form data
  if (!companyName || !currencySymbol || isNaN(lowStockThreshold) || isNaN(itemsPerPage)) {
    showToast("Please fill in all required fields", "error")
    return
  }

  // Create settings object
  const settings = {
    companyName,
    currencySymbol,
    lowStockThreshold,
    defaultCategory,
    theme,
    itemsPerPage,
  }

  // Save settings
  saveSettings(settings)

  // Add activity log
  addActivity("update", "Updated system settings")

  // Show success message
  showToast("Settings saved successfully", "success")

  // Apply theme
  applyTheme()

  // Update dashboard if on dashboard page
  if (document.getElementById("dashboard-page").classList.contains("active")) {
    updateDashboard()
  }

  // Update inventory table if on inventory page
  if (document.getElementById("inventory-page").classList.contains("active")) {
    loadInventoryItems()
  }
}

// Confirm reset settings
function confirmResetSettings() {
  showConfirmModal("Are you sure you want to reset all settings to default?", () => {
    resetSettings()
    loadSettings()
    applyTheme()

    // Add activity log
    addActivity("update", "Reset system settings to default")

    // Show success message
    showToast("Settings reset to default", "success")

    // Update dashboard if on dashboard page
    if (document.getElementById("dashboard-page").classList.contains("active")) {
      updateDashboard()
    }

    // Update inventory table if on inventory page
    if (document.getElementById("inventory-page").classList.contains("active")) {
      loadInventoryItems()
    }
  })
}

// Apply theme from settings
function applyTheme() {
  const settings = getSettings()
  const theme = settings.theme || "light"

  // Set data-theme attribute on document element
  document.documentElement.setAttribute("data-theme", theme)
}

