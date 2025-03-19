/**
 * Dashboard functionality
 * Displays statistics and charts
 */

// Mock data (replace with actual data fetching)
const getInventoryItems = () => {
  return [
    { id: 1, name: "Item 1", sku: "SKU1", category: 1, quantity: 10 },
    { id: 2, name: "Item 2", sku: "SKU2", category: 2, quantity: 5 },
    { id: 3, name: "Item 3", sku: "SKU3", category: 1, quantity: 2 },
  ]
}

const getCategories = () => {
  return [
    { id: 1, name: "Category 1", color: "#3498db" },
    { id: 2, name: "Category 2", color: "#e74c3c" },
  ]
}

const getSettings = () => {
  return {
    currencySymbol: "$",
    lowStockThreshold: 5,
  }
}

const getActivityLog = () => {
  return [
    { timestamp: new Date(), action: "add", details: "Item 4 added" },
    { timestamp: new Date(), action: "update", details: "Item 1 updated" },
  ]
}

const formatRelativeTime = (date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return `${days} days ago`
  } else if (hours > 0) {
    return `${hours} hours ago`
  } else if (minutes > 0) {
    return `${minutes} minutes ago`
  } else {
    return "Just now"
  }
}

const formatCurrency = (amount, currencySymbol) => {
  return `${currencySymbol}${amount.toFixed(2)}`
}

const getCategoryName = (categoryId) => {
  const categories = getCategories()
  const category = categories.find((c) => c.id === categoryId)
  return category ? category.name : "Uncategorized"
}

const calculateTotalValue = (items) => {
  let total = 0
  items.forEach((item) => {
    total += item.quantity * 10 // Assuming a price of $10 for each item
  })
  return total
}

const createBarChart = (elementId, data, options) => {
  // Mock chart creation
  console.log(`Creating chart ${elementId} with data:`, data, options)
  document.getElementById(elementId).textContent = "Chart Placeholder"
}

// Initialize dashboard
function initDashboard() {
  // Update dashboard data
  updateDashboard()

  // Set up auto-refresh
  setInterval(updateDashboard, 60000) // Refresh every minute
}

// Update dashboard data and charts
function updateDashboard() {
  // Get data
  const items = getInventoryItems()
  const categories = getCategories()
  const settings = getSettings()
  const activities = getActivityLog()

  // Update last updated time
  document.getElementById("last-updated-time").textContent = formatRelativeTime(new Date())

  // Update statistics
  updateDashboardStats(items, categories, settings)

  // Update charts
  updateDashboardCharts(items, categories)

  // Update low stock list
  updateLowStockList(items, settings)

  // Update activity log
  updateActivityLog(activities)
}

// Update dashboard statistics
function updateDashboardStats(items, categories, settings) {
  // Total items
  document.getElementById("total-items").textContent = items.length

  // Total categories
  document.getElementById("total-categories").textContent = categories.length

  // Total value
  const totalValue = calculateTotalValue(items)
  document.getElementById("total-value").textContent = formatCurrency(totalValue, settings.currencySymbol)

  // Low stock count
  const lowStockCount = items.filter((item) => Number.parseInt(item.quantity) <= settings.lowStockThreshold).length
  document.getElementById("low-stock-count").textContent = lowStockCount
}

// Update dashboard charts
function updateDashboardCharts(items, categories) {
  // Items by category chart
  const categoryData = []
  const categoryColors = []

  // Create a map of category counts
  const categoryCounts = {}

  items.forEach((item) => {
    if (item.category) {
      categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1
    } else {
      categoryCounts["uncategorized"] = (categoryCounts["uncategorized"] || 0) + 1
    }
  })

  // Convert to array for chart
  categories.forEach((category) => {
    const count = categoryCounts[category.id] || 0
    if (count > 0) {
      categoryData.push({
        label: category.name,
        value: count,
      })
      categoryColors.push(category.color || "#3498db")
    }
  })

  // Add uncategorized if any
  if (categoryCounts["uncategorized"]) {
    categoryData.push({
      label: "Uncategorized",
      value: categoryCounts["uncategorized"],
    })
    categoryColors.push("#999")
  }

  // Sort by count (descending)
  categoryData.sort((a, b) => b.value - a.value)

  // Create chart
  createBarChart("category-chart", categoryData, {
    colors: categoryColors,
    animate: true,
  })
}

// Update low stock list
function updateLowStockList(items, settings) {
  const lowStockList = document.getElementById("low-stock-list")
  if (!lowStockList) return

  // Clear list
  lowStockList.innerHTML = ""

  // Filter low stock items
  const lowStockItems = items.filter((item) => Number.parseInt(item.quantity) <= settings.lowStockThreshold)

  // Sort by quantity (ascending)
  lowStockItems.sort((a, b) => Number.parseInt(a.quantity) - Number.parseInt(b.quantity))

  // Render list
  if (lowStockItems.length === 0) {
    lowStockList.innerHTML = `
            <p class="empty-message">No low stock items found.</p>
        `
  } else {
    lowStockItems.forEach((item) => {
      const itemElement = document.createElement("div")
      itemElement.className = "low-stock-item"

      itemElement.innerHTML = `
                <div class="low-stock-info">
                    <h4>${item.name}</h4>
                    <p>${item.sku} - ${getCategoryName(item.category)}</p>
                </div>
                <div class="low-stock-quantity">
                    ${item.quantity} left
                </div>
            `

      lowStockList.appendChild(itemElement)
    })
  }
}

// Update activity log
function updateActivityLog(activities) {
  const activityLog = document.getElementById("activity-log")
  if (!activityLog) return

  // Clear log
  activityLog.innerHTML = ""

  // Limit to 10 most recent activities
  const recentActivities = activities.slice(0, 10)

  // Render log
  if (recentActivities.length === 0) {
    activityLog.innerHTML = `
            <p class="empty-message">No recent activity.</p>
        `
  } else {
    recentActivities.forEach((activity) => {
      const activityElement = document.createElement("div")
      activityElement.className = "activity-item"

      // Set icon based on action
      let icon = ""
      switch (activity.action) {
        case "add":
          icon = '<i class="fas fa-plus"></i>'
          break
        case "update":
          icon = '<i class="fas fa-edit"></i>'
          break
        case "delete":
          icon = '<i class="fas fa-trash"></i>'
          break
        default:
          icon = '<i class="fas fa-info"></i>'
          break
      }

      activityElement.innerHTML = `
                <div class="activity-icon">
                    ${icon}
                </div>
                <div class="activity-content">
                    <div class="activity-title">${activity.action.charAt(0).toUpperCase() + activity.action.slice(1)}</div>
                    <div class="activity-description">${activity.details}</div>
                    <div class="activity-time">${formatRelativeTime(activity.timestamp)}</div>
                </div>
            `

      activityLog.appendChild(activityElement)
    })
  }
}

