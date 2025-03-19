/**
 * Main application script
 * Initializes the inventory management system
 */

// Declare variables for initialization functions
let initializeStorage
let initModals
let initInventory
let initCategories
let initDashboard
let initSettings
let updateDashboard
let loadInventoryItems
let loadCategories
let loadSettings
let updateNotificationCount
let openModal // Declare openModal
let getNotifications // Declare getNotifications
let formatRelativeTime // Declare formatRelativeTime
let markNotificationAsRead // Declare markNotificationAsRead
let clearNotifications // Declare clearNotifications

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize storage with sample data if empty
  initializeStorage()

  // Initialize UI components
  initModals()
  initSidebar()
  initNotifications()
  initImportExport()

  // Initialize modules
  initInventory()
  initCategories()
  initDashboard()
  initSettings()

  // Show dashboard by default
  showPage("dashboard")
})

// Initialize sidebar navigation
function initSidebar() {
  const sidebarToggle = document.getElementById("sidebar-toggle")
  const sidebar = document.querySelector(".sidebar")
  const mainContent = document.querySelector(".main-content")

  // Toggle sidebar on button click
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed")
    mainContent.classList.toggle("expanded")
  })

  // Handle navigation clicks
  document.querySelectorAll(".sidebar-nav li").forEach((item) => {
    item.addEventListener("click", () => {
      // Get page name from data attribute
      const pageName = item.getAttribute("data-page")

      // Show the selected page
      showPage(pageName)

      // Close sidebar on mobile
      if (window.innerWidth < 992) {
        sidebar.classList.add("collapsed")
        mainContent.classList.add("expanded")
      }
    })
  })
}

// Show a specific page
function showPage(pageName) {
  // Hide all pages
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active")
  })

  // Show selected page
  const selectedPage = document.getElementById(`${pageName}-page`)
  if (selectedPage) {
    selectedPage.classList.add("active")
  }

  // Update active navigation item
  document.querySelectorAll(".sidebar-nav li").forEach((item) => {
    item.classList.remove("active")

    if (item.getAttribute("data-page") === pageName) {
      item.classList.add("active")
    }
  })

  // Refresh page content
  switch (pageName) {
    case "dashboard":
      updateDashboard()
      break
    case "inventory":
      loadInventoryItems()
      break
    case "categories":
      loadCategories()
      break
    case "settings":
      loadSettings()
      break
  }
}

// Initialize notifications
function initNotifications() {
  // Update notification count
  updateNotificationCount()

  // Set up notifications button
  const notificationsBtn = document.getElementById("notifications-btn")
  notificationsBtn.addEventListener("click", () => {
    openNotificationsModal()
  })

  // Set up clear notifications button
  const clearNotificationsBtn = document.getElementById("clear-notifications")
  clearNotificationsBtn.addEventListener("click", () => {
    clearAllNotifications()
  })
}

// Open notifications modal
function openNotificationsModal() {
  const modal = openModal("notifications-modal")

  if (modal) {
    // Get notifications
    const notifications = getNotifications()

    // Get notifications list element
    const notificationsList = document.getElementById("notifications-list")

    // Clear list
    notificationsList.innerHTML = ""

    // Render notifications
    if (notifications.length === 0) {
      notificationsList.innerHTML = `
                <p class="empty-message">No notifications.</p>
            `
    } else {
      notifications.forEach((notification) => {
        const notificationItem = document.createElement("div")
        notificationItem.className = `notification-item ${notification.read ? "" : "unread"}`
        notificationItem.setAttribute("data-id", notification.id)

        // Set icon based on type
        let icon = ""
        switch (notification.type) {
          case "success":
            icon = '<i class="fas fa-check-circle notification-icon"></i>'
            break
          case "error":
            icon = '<i class="fas fa-exclamation-circle notification-icon"></i>'
            break
          case "warning":
            icon = '<i class="fas fa-exclamation-triangle notification-icon"></i>'
            break
          case "info":
          default:
            icon = '<i class="fas fa-info-circle notification-icon"></i>'
            break
        }

        notificationItem.innerHTML = `
                    ${icon}
                    <div class="notification-content">
                        <div class="notification-title">${notification.title}</div>
                        <div class="notification-message">${notification.message}</div>
                        <div class="notification-time">${formatRelativeTime(notification.timestamp)}</div>
                    </div>
                `

        notificationsList.appendChild(notificationItem)

        // Mark as read when clicked
        notificationItem.addEventListener("click", () => {
          markNotificationAsRead(notification.id)
          notificationItem.classList.remove("unread")
          updateNotificationCount()
        })
      })
    }

    // Mark all as read
    notifications.forEach((notification) => {
      if (!notification.read) {
        markNotificationAsRead(notification.id)
      }
    })

    // Update notification count
    updateNotificationCount()
  }
}

// Clear all notifications
function clearAllNotifications() {
  clearNotifications()

  // Update notification count
  updateNotificationCount()

  // Close modal
  closeModal("notifications-modal")

  // Show success message
  showToast("All notifications cleared", "success")
}

// Initialize import/export functionality
function initImportExport() {
  // Export data
  document.getElementById("export-data").addEventListener("click", () => {
    const data = exportAllData()
    exportToJSON(data, "inventory_export.json")

    // Add activity log
    addActivity("export", "Exported inventory data")

    // Show success message
    showToast("Data exported successfully", "success")
  })

  // Import data
  document.getElementById("import-data").addEventListener("change", (event) => {
    const file = event.target.files[0]

    if (file) {
      readJSONFile(file)
        .then((data) => {
          // Confirm import
          showConfirmModal("Are you sure you want to import this data? This will overwrite your current data.", () => {
            const success = importAllData(data)

            if (success) {
              // Add activity log
              addActivity("import", "Imported inventory data")

              // Show success message
              showToast("Data imported successfully", "success")

              // Reload current page
              const activePage = document.querySelector(".page.active")
              if (activePage) {
                const pageName = activePage.id.replace("-page", "")
                showPage(pageName)
              }
            } else {
              showToast("Failed to import data", "error")
            }
          })
        })
        .catch((error) => {
          showToast(`Import error: ${error.message}`, "error")
        })

      // Reset file input
      event.target.value = ""
    }
  })
}

// Add analytics scripts
function addAnalyticsScripts() {
  // Ahrefs Analytics
  const ahrefsScript = document.createElement("script")
  ahrefsScript.async = true
  ahrefsScript.src = "https://analytics.ahrefs.com/analytics.js"
  ahrefsScript.setAttribute("data-key", "wiWZ34OV9BQBL4YirUXs+g")
  document.head.appendChild(ahrefsScript)

  // Google Analytics (placeholder - replace with your actual GA code)
  const gaScript = document.createElement("script")
  gaScript.async = true
  gaScript.src = "https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  document.head.appendChild(gaScript)

  const gaConfigScript = document.createElement("script")
  gaConfigScript.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
    `
  document.head.appendChild(gaConfigScript)
}

// Call analytics function
addAnalyticsScripts()

