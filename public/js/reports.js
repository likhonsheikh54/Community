import { Chart } from "@/components/ui/chart"
/**
 * Reports functionality
 * Handles generating and exporting reports
 */

// Initialize reports module
function initReports() {
  // Set up event listeners for report generation
  document.getElementById("generate-inventory-report").addEventListener("click", () => {
    generateInventoryReport()
  })

  document.getElementById("generate-low-stock-report").addEventListener("click", () => {
    generateLowStockReport()
  })

  document.getElementById("generate-category-report").addEventListener("click", () => {
    generateCategoryReport()
  })

  document.getElementById("generate-activity-report").addEventListener("click", () => {
    generateActivityReport()
  })

  // Set up export buttons
  document.getElementById("export-report-csv").addEventListener("click", () => {
    exportReportToCSV()
  })

  document.getElementById("export-report-pdf").addEventListener("click", () => {
    exportReportToPDF()
  })

  // Set up close report button
  document.getElementById("close-report").addEventListener("click", () => {
    closeReportPreview()
  })
}

// Generate inventory report
function generateInventoryReport() {
  // Get inventory items
  const items = getInventoryItems()

  // Get categories for display
  const categories = getCategories()
  const categoryMap = {}
  categories.forEach((category) => {
    categoryMap[category.id] = category.name
  })

  // Get settings for currency symbol
  const settings = getSettings()
  const currencySymbol = settings.currencySymbol || "$"

  // Set report title
  document.getElementById("report-title").textContent = "Inventory Report"

  // Generate report content
  let reportContent = `
        <div class="report-header">
            <h3>Complete Inventory Report</h3>
            <p>Generated on: ${new Date().toLocaleString()}</p>
        </div>
    `

  if (items.length === 0) {
    reportContent += `<p class="text-center">No inventory items found.</p>`
  } else {
    // Calculate total value
    const totalValue = items.reduce((sum, item) => {
      return sum + Number.parseFloat(item.price) * Number.parseInt(item.quantity)
    }, 0)

    // Add summary
    reportContent += `
            <div class="report-summary mb-4">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-3 text-center">
                                <h5>Total Items</h5>
                                <p class="h3">${items.length}</p>
                            </div>
                            <div class="col-md-3 text-center">
                                <h5>Total Quantity</h5>
                                <p class="h3">${items.reduce((sum, item) => sum + Number.parseInt(item.quantity), 0)}</p>
                            </div>
                            <div class="col-md-3 text-center">
                                <h5>Categories</h5>
                                <p class="h3">${categories.length}</p>
                            </div>
                            <div class="col-md-3 text-center">
                                <h5>Total Value</h5>
                                <p class="h3">${formatCurrency(totalValue, currencySymbol)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `

    // Add table
    reportContent += `
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>SKU</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Value</th>
                            <th>Last Updated</th>
                        </tr>
                    </thead>
                    <tbody>
        `

    items.forEach((item) => {
      const value = Number.parseFloat(item.price) * Number.parseInt(item.quantity)

      reportContent += `
                <tr>
                    <td>${item.name}</td>
                    <td>${categoryMap[item.category] || "Uncategorized"}</td>
                    <td>${item.sku}</td>
                    <td>${item.quantity}</td>
                    <td>${formatCurrency(item.price, currencySymbol)}</td>
                    <td>${formatCurrency(value, currencySymbol)}</td>
                    <td>${formatDate(item.updated)}</td>
                </tr>
            `
    })

    reportContent += `
                    </tbody>
                </table>
            </div>
        `
  }

  // Set report content
  document.getElementById("report-content").innerHTML = reportContent

  // Show report preview
  document.getElementById("report-preview-container").classList.remove("d-none")

  // Store report data for export
  window.currentReportData = {
    title: "Inventory Report",
    items: items.map((item) => ({
      name: item.name,
      category: categoryMap[item.category] || "Uncategorized",
      sku: item.sku,
      quantity: item.quantity,
      price: item.price,
      value: Number.parseFloat(item.price) * Number.parseInt(item.quantity),
      updated: formatDate(item.updated),
    })),
  }
}

// Generate low stock report
function generateLowStockReport() {
  // Get inventory items
  const items = getInventoryItems()

  // Get settings
  const settings = getSettings()
  const lowStockThreshold = settings.lowStockThreshold || 5
  const currencySymbol = settings.currencySymbol || "$"

  // Filter low stock items
  const lowStockItems = items.filter((item) => Number.parseInt(item.quantity) <= lowStockThreshold)

  // Get categories for display
  const categories = getCategories()
  const categoryMap = {}
  categories.forEach((category) => {
    categoryMap[category.id] = category.name
  })

  // Set report title
  document.getElementById("report-title").textContent = "Low Stock Report"

  // Generate report content
  let reportContent = `
        <div class="report-header">
            <h3>Low Stock Items Report</h3>
            <p>Generated on: ${new Date().toLocaleString()}</p>
            <p>Low stock threshold: ${lowStockThreshold} units</p>
        </div>
    `

  if (lowStockItems.length === 0) {
    reportContent += `<p class="text-center">No low stock items found.</p>`
  } else {
    // Add summary
    reportContent += `
            <div class="report-summary mb-4">
                <div class="alert alert-warning">
                    <h5><i class="fas fa-exclamation-triangle me-2"></i> ${lowStockItems.length} items below threshold</h5>
                    <p>These items need to be restocked soon.</p>
                </div>
            </div>
        `

    // Add table
    reportContent += `
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>SKU</th>
                            <th>Quantity</th>
                            <th>Threshold</th>
                            <th>Price</th>
                            <th>Last Updated</th>
                        </tr>
                    </thead>
                    <tbody>
        `

    lowStockItems.forEach((item) => {
      reportContent += `
                <tr>
                    <td>${item.name}</td>
                    <td>${categoryMap[item.category] || "Uncategorized"}</td>
                    <td>${item.sku}</td>
                    <td class="text-danger fw-bold">${item.quantity}</td>
                    <td>${lowStockThreshold}</td>
                    <td>${formatCurrency(item.price, currencySymbol)}</td>
                    <td>${formatDate(item.updated)}</td>
                </tr>
            `
    })

    reportContent += `
                    </tbody>
                </table>
            </div>
        `
  }

  // Set report content
  document.getElementById("report-content").innerHTML = reportContent

  // Show report preview
  document.getElementById("report-preview-container").classList.remove("d-none")

  // Store report data for export
  window.currentReportData = {
    title: "Low Stock Report",
    items: lowStockItems.map((item) => ({
      name: item.name,
      category: categoryMap[item.category] || "Uncategorized",
      sku: item.sku,
      quantity: item.quantity,
      threshold: lowStockThreshold,
      price: formatCurrency(item.price, currencySymbol),
      updated: formatDate(item.updated),
    })),
  }
}

// Generate category report
function generateCategoryReport() {
  // Get inventory items
  const items = getInventoryItems()

  // Get categories
  const categories = getCategories()

  // Get settings for currency symbol
  const settings = getSettings()
  const currencySymbol = settings.currencySymbol || "$"

  // Calculate items and value per category
  const categoryStats = {}

  categories.forEach((category) => {
    categoryStats[category.id] = {
      name: category.name,
      color: category.color,
      itemCount: 0,
      totalQuantity: 0,
      totalValue: 0,
    }
  })

  // Add uncategorized
  categoryStats["uncategorized"] = {
    name: "Uncategorized",
    color: "#999999",
    itemCount: 0,
    totalQuantity: 0,
    totalValue: 0,
  }

  // Calculate stats
  items.forEach((item) => {
    const categoryId = item.category || "uncategorized"
    const quantity = Number.parseInt(item.quantity)
    const value = Number.parseFloat(item.price) * quantity

    if (categoryStats[categoryId]) {
      categoryStats[categoryId].itemCount++
      categoryStats[categoryId].totalQuantity += quantity
      categoryStats[categoryId].totalValue += value
    }
  })

  // Convert to array for easier handling
  const categoryData = Object.values(categoryStats).filter((cat) => cat.itemCount > 0)

  // Set report title
  document.getElementById("report-title").textContent = "Category Analysis"

  // Generate report content
  let reportContent = `
        <div class="report-header">
            <h3>Inventory by Category Report</h3>
            <p>Generated on: ${new Date().toLocaleString()}</p>
        </div>
    `

  if (categoryData.length === 0) {
    reportContent += `<p class="text-center">No categories with items found.</p>`
  } else {
    // Add charts
    reportContent += `
            <div class="row mb-4">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h5>Items by Category</h5>
                        </div>
                        <div class="card-body">
                            <canvas id="itemsChart" height="250"></canvas>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h5>Value by Category</h5>
                        </div>
                        <div class="card-body">
                            <canvas id="valueChart" height="250"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        `

    // Add table
    reportContent += `
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Items</th>
                            <th>Total Quantity</th>
                            <th>Total Value</th>
                            <th>Avg. Value per Item</th>
                        </tr>
                    </thead>
                    <tbody>
        `

    categoryData.forEach((category) => {
      const avgValue = category.itemCount > 0 ? category.totalValue / category.itemCount : 0

      reportContent += `
                <tr>
                    <td>
                        <span class="color-swatch" style="background-color: ${category.color}"></span>
                        ${category.name}
                    </td>
                    <td>${category.itemCount}</td>
                    <td>${category.totalQuantity}</td>
                    <td>${formatCurrency(category.totalValue, currencySymbol)}</td>
                    <td>${formatCurrency(avgValue, currencySymbol)}</td>
                </tr>
            `
    })

    reportContent += `
                    </tbody>
                </table>
            </div>
        `
  }

  // Set report content
  document.getElementById("report-content").innerHTML = reportContent

  // Show report preview
  document.getElementById("report-preview-container").classList.remove("d-none")

  // Create charts if categories exist
  if (categoryData.length > 0) {
    setTimeout(() => {
      createCategoryCharts(categoryData)
    }, 100)
  }

  // Store report data for export
  window.currentReportData = {
    title: "Category Analysis",
    items: categoryData.map((category) => {
      const avgValue = category.itemCount > 0 ? category.totalValue / category.itemCount : 0
      return {
        category: category.name,
        items: category.itemCount,
        quantity: category.totalQuantity,
        value: formatCurrency(category.totalValue, currencySymbol),
        avgValue: formatCurrency(avgValue, currencySymbol),
      }
    }),
  }
}

// Generate activity report
function generateActivityReport() {
  // Get activity log
  const activities = getActivityLog()

  // Set report title
  document.getElementById("report-title").textContent = "Activity Log Report"

  // Generate report content
  let reportContent = `
        <div class="report-header">
            <h3>Activity Log Report</h3>
            <p>Generated on: ${new Date().toLocaleString()}</p>
        </div>
    `

  if (activities.length === 0) {
    reportContent += `<p class="text-center">No activities found.</p>`
  } else {
    // Add summary
    reportContent += `
            <div class="report-summary mb-4">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4 text-center">
                                <h5>Total Activities</h5>
                                <p class="h3">${activities.length}</p>
                            </div>
                            <div class="col-md-4 text-center">
                                <h5>First Activity</h5>
                                <p class="h5">${formatDate(activities[activities.length - 1].timestamp)}</p>
                            </div>
                            <div class="col-md-4 text-center">
                                <h5>Latest Activity</h5>
                                <p class="h5">${formatDate(activities[0].timestamp)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `

    // Add table
    reportContent += `
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Date & Time</th>
                            <th>Action</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
        `

    activities.forEach((activity) => {
      reportContent += `
                <tr>
                    <td>${formatDate(activity.timestamp)}</td>
                    <td>
                        <span class="badge ${getActionBadgeClass(activity.action)}">${activity.action}</span>
                    </td>
                    <td>${activity.details}</td>
                </tr>
            `
    })

    reportContent += `
                    </tbody>
                </table>
            </div>
        `
  }

  // Set report content
  document.getElementById("report-content").innerHTML = reportContent

  // Show report preview
  document.getElementById("report-preview-container").classList.remove("d-none")

  // Store report data for export
  window.currentReportData = {
    title: "Activity Log Report",
    items: activities.map((activity) => ({
      timestamp: formatDate(activity.timestamp),
      action: activity.action,
      details: activity.details,
    })),
  }
}

// Create category charts
function createCategoryCharts(categoryData) {
  // Items chart
  const itemsCtx = document.getElementById("itemsChart").getContext("2d")
  new Chart(itemsCtx, {
    type: "pie",
    data: {
      labels: categoryData.map((cat) => cat.name),
      datasets: [
        {
          data: categoryData.map((cat) => cat.itemCount),
          backgroundColor: categoryData.map((cat) => cat.color),
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right",
        },
      },
    },
  })

  // Value chart
  const valueCtx = document.getElementById("valueChart").getContext("2d")
  new Chart(valueCtx, {
    type: "pie",
    data: {
      labels: categoryData.map((cat) => cat.name),
      datasets: [
        {
          data: categoryData.map((cat) => cat.totalValue),
          backgroundColor: categoryData.map((cat) => cat.color),
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right",
        },
      },
    },
  })
}

// Export report to CSV
function exportReportToCSV() {
  if (!window.currentReportData) return

  const { title, items } = window.currentReportData

  if (!items || items.length === 0) {
    showToast("No data to export", "error")
    return
  }

  // Get headers from the first object
  const headers = Object.keys(items[0])

  // Create CSV content
  let csvContent = headers.join(",") + "\n"

  // Add rows
  items.forEach((item) => {
    const row = headers.map((header) => {
      let cell = item[header] || ""
      // Escape commas and quotes
      cell = cell.toString().replace(/"/g, '""')
      if (cell.includes(",") || cell.includes('"') || cell.includes("\n")) {
        cell = `"${cell}"`
      }
      return cell
    })
    csvContent += row.join(",") + "\n"
  })

  // Create download link
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.setAttribute("href", url)
  link.setAttribute("download", `${title.replace(/\s+/g, "_")}_${formatDateForFilename(new Date())}.csv`)
  link.style.display = "none"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Export report to PDF
function exportReportToPDF() {
  if (!window.currentReportData) return

  showToast("PDF export functionality would be implemented here", "info")

  // In a real application, you would use a library like jsPDF or html2pdf.js
  // to convert the report content to PDF
}

// Close report preview
function closeReportPreview() {
  document.getElementById("report-preview-container").classList.add("d-none")
  window.currentReportData = null
}

// Get action badge class
function getActionBadgeClass(action) {
  switch (action) {
    case "add":
      return "bg-success"
    case "update":
      return "bg-primary"
    case "delete":
      return "bg-danger"
    case "import":
      return "bg-info"
    case "export":
      return "bg-secondary"
    default:
      return "bg-secondary"
  }
}

// Format date for filename
function formatDateForFilename(date) {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

// Helper functions (these would be imported from utils.js in a real application)
function getInventoryItems() {
  return JSON.parse(localStorage.getItem("inventory_items") || "[]")
}

function getCategories() {
  return JSON.parse(localStorage.getItem("inventory_categories") || "[]")
}

function getSettings() {
  return JSON.parse(localStorage.getItem("inventory_settings") || "{}")
}

function getActivityLog() {
  return JSON.parse(localStorage.getItem("inventory_activity_log") || "[]")
}

function formatCurrency(amount, symbol = "$") {
  return `${symbol}${Number(amount).toFixed(2)}`
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleString()
}

function showToast(message, type) {
  // Implementation depends on your toast system
  console.log(`${type}: ${message}`)
}

