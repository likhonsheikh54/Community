/**
 * Storage management for the inventory system
 * Handles saving and retrieving data from localStorage
 */

const STORAGE_KEYS = {
  INVENTORY: "inventory_items",
  CATEGORIES: "inventory_categories",
  ACTIVITY_LOG: "inventory_activity_log",
  NOTIFICATIONS: "inventory_notifications",
  SETTINGS: "inventory_settings",
}

// Default settings
const DEFAULT_SETTINGS = {
  companyName: "My Company",
  currencySymbol: "$",
  lowStockThreshold: 5,
  defaultCategory: "",
  theme: "light",
  itemsPerPage: 20,
}

// Generate a unique ID
function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Get data from localStorage
function getFromStorage(key) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error(`Error getting data from localStorage: ${error}`)
    return null
  }
}

// Save data to localStorage
function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (error) {
    console.error(`Error saving data to localStorage: ${error}`)
    return false
  }
}

// Get inventory items
function getInventoryItems() {
  return getFromStorage(STORAGE_KEYS.INVENTORY) || []
}

// Save inventory items
function saveInventoryItems(items) {
  return saveToStorage(STORAGE_KEYS.INVENTORY, items)
}

// Get categories
function getCategories() {
  return getFromStorage(STORAGE_KEYS.CATEGORIES) || []
}

// Save categories
function saveCategories(categories) {
  return saveToStorage(STORAGE_KEYS.CATEGORIES, categories)
}

// Get activity log
function getActivityLog() {
  return getFromStorage(STORAGE_KEYS.ACTIVITY_LOG) || []
}

// Save activity log
function saveActivityLog(activities) {
  return saveToStorage(STORAGE_KEYS.ACTIVITY_LOG, activities)
}

// Add activity to log
function addActivity(action, details) {
  const activities = getActivityLog()
  const newActivity = {
    id: generateId(),
    action,
    details,
    timestamp: new Date().toISOString(),
  }

  activities.unshift(newActivity)

  // Limit log size to prevent localStorage overflow
  const limitedActivities = activities.slice(0, 100)
  saveActivityLog(limitedActivities)

  return newActivity
}

// Get notifications
function getNotifications() {
  return getFromStorage(STORAGE_KEYS.NOTIFICATIONS) || []
}

// Save notifications
function saveNotifications(notifications) {
  return saveToStorage(STORAGE_KEYS.NOTIFICATIONS, notifications)
}

// Add notification
function addNotification(title, message, type = "info") {
  const notifications = getNotifications()
  const newNotification = {
    id: generateId(),
    title,
    message,
    type,
    read: false,
    timestamp: new Date().toISOString(),
  }

  notifications.unshift(newNotification)

  // Limit notifications to prevent localStorage overflow
  const limitedNotifications = notifications.slice(0, 50)
  saveNotifications(limitedNotifications)

  return newNotification
}

// Mark notification as read
function markNotificationAsRead(id) {
  const notifications = getNotifications()
  const updatedNotifications = notifications.map((notification) => {
    if (notification.id === id) {
      return { ...notification, read: true }
    }
    return notification
  })

  saveNotifications(updatedNotifications)
}

// Clear all notifications
function clearNotifications() {
  saveNotifications([])
}

// Get settings
function getSettings() {
  const savedSettings = getFromStorage(STORAGE_KEYS.SETTINGS)
  return savedSettings ? { ...DEFAULT_SETTINGS, ...savedSettings } : DEFAULT_SETTINGS
}

// Save settings
function saveSettings(settings) {
  return saveToStorage(STORAGE_KEYS.SETTINGS, settings)
}

// Reset settings to default
function resetSettings() {
  return saveSettings(DEFAULT_SETTINGS)
}

// Export all data
function exportAllData() {
  return {
    inventory: getInventoryItems(),
    categories: getCategories(),
    activityLog: getActivityLog(),
    notifications: getNotifications(),
    settings: getSettings(),
    exportDate: new Date().toISOString(),
  }
}

// Import all data
function importAllData(data) {
  try {
    if (data.inventory) saveInventoryItems(data.inventory)
    if (data.categories) saveCategories(data.categories)
    if (data.activityLog) saveActivityLog(data.activityLog)
    if (data.notifications) saveNotifications(data.notifications)
    if (data.settings) saveSettings(data.settings)

    return true
  } catch (error) {
    console.error(`Error importing data: ${error}`)
    return false
  }
}

// Clear all data
function clearAllData() {
  localStorage.removeItem(STORAGE_KEYS.INVENTORY)
  localStorage.removeItem(STORAGE_KEYS.CATEGORIES)
  localStorage.removeItem(STORAGE_KEYS.ACTIVITY_LOG)
  localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS)
  localStorage.removeItem(STORAGE_KEYS.SETTINGS)
}

// Initialize storage with sample data if empty
function initializeStorage() {
  // Check if storage is empty
  const items = getInventoryItems()
  const categories = getCategories()

  if (categories.length === 0) {
    // Add sample categories
    const sampleCategories = [
      {
        id: "cat1",
        name: "Electronics",
        description: "Electronic devices and accessories",
        color: "#3498db",
        created: new Date().toISOString(),
      },
      {
        id: "cat2",
        name: "Office Supplies",
        description: "Stationery and office equipment",
        color: "#2ecc71",
        created: new Date().toISOString(),
      },
      {
        id: "cat3",
        name: "Furniture",
        description: "Office and home furniture",
        color: "#e74c3c",
        created: new Date().toISOString(),
      },
    ]

    saveCategories(sampleCategories)
  }

  if (items.length === 0) {
    // Add sample inventory items
    const sampleItems = [
      {
        id: "item1",
        name: "Laptop",
        category: "cat1",
        sku: "EL-001",
        quantity: 10,
        price: 999.99,
        description: "High-performance laptop with 16GB RAM",
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
      },
      {
        id: "item2",
        name: "Office Chair",
        category: "cat3",
        sku: "FN-001",
        quantity: 5,
        price: 199.99,
        description: "Ergonomic office chair with lumbar support",
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
      },
      {
        id: "item3",
        name: "Notebook",
        category: "cat2",
        sku: "OS-001",
        quantity: 50,
        price: 4.99,
        description: "Spiral-bound notebook, 100 pages",
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
      },
      {
        id: "item4",
        name: "Wireless Mouse",
        category: "cat1",
        sku: "EL-002",
        quantity: 15,
        price: 24.99,
        description: "Bluetooth wireless mouse",
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
      },
      {
        id: "item5",
        name: "Desk",
        category: "cat3",
        sku: "FN-002",
        quantity: 3,
        price: 299.99,
        description: "Adjustable standing desk",
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
      },
    ]

    saveInventoryItems(sampleItems)

    // Add sample activities
    sampleItems.forEach((item) => {
      addActivity("add", `Added ${item.name} to inventory`)
    })
  }

  // Initialize settings if not set
  if (!getFromStorage(STORAGE_KEYS.SETTINGS)) {
    saveSettings(DEFAULT_SETTINGS)
  }
}

