/**
 * Utility functions for the inventory management system
 */

// Generate a unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

// Format currency
function formatCurrency(amount, currencySymbol = "$") {
  return `${currencySymbol}${Number.parseFloat(amount).toFixed(2)}`
}

// Format date
function formatDate(date) {
  const d = new Date(date)
  return d.toLocaleDateString() + " " + d.toLocaleTimeString()
}

// Format relative time (e.g., "2 hours ago")
function formatRelativeTime(timestamp) {
  const now = new Date()
  const date = new Date(timestamp)
  const seconds = Math.floor((now - date) / 1000)

  let interval = Math.floor(seconds / 31536000)
  if (interval >= 1) {
    return interval === 1 ? "1 year ago" : `${interval} years ago`
  }

  interval = Math.floor(seconds / 2592000)
  if (interval >= 1) {
    return interval === 1 ? "1 month ago" : `${interval} months ago`
  }

  interval = Math.floor(seconds / 86400)
  if (interval >= 1) {
    return interval === 1 ? "1 day ago" : `${interval} days ago`
  }

  interval = Math.floor(seconds / 3600)
  if (interval >= 1) {
    return interval === 1 ? "1 hour ago" : `${interval} hours ago`
  }

  interval = Math.floor(seconds / 60)
  if (interval >= 1) {
    return interval === 1 ? "1 minute ago" : `${interval} minutes ago`
  }

  return seconds < 10 ? "just now" : `${Math.floor(seconds)} seconds ago`
}

// Debounce function to limit how often a function can be called
function debounce(func, wait) {
  let timeout
  return function (...args) {
    
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

// Validate email format
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Validate required fields in a form
function validateForm(formData, requiredFields) {
  const errors = {}

  requiredFields.forEach((field) => {
    if (!formData[field] || formData[field].trim() === "") {
      errors[field] = "This field is required"
    }
  })

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

// Calculate total value of inventory
function calculateTotalValue(items) {
  return items.reduce((total, item) => {
    return total + Number.parseFloat(item.price) * Number.parseInt(item.quantity)
  }, 0)
}

// Sort array of objects by a property
function sortArrayByProperty(array, property, order = "asc") {
  return [...array].sort((a, b) => {
    let valueA = a[property]
    let valueB = b[property]

    // Handle numeric values
    if (!isNaN(Number.parseFloat(valueA)) && !isNaN(Number.parseFloat(valueB))) {
      valueA = Number.parseFloat(valueA)
      valueB = Number.parseFloat(valueB)
    }
    // Handle dates
    else if (property === "updated" || property === "created") {
      valueA = new Date(valueA).getTime()
      valueB = new Date(valueB).getTime()
    }
    // Handle strings
    else if (typeof valueA === "string" && typeof valueB === "string") {
      valueA = valueA.toLowerCase()
      valueB = valueB.toLowerCase()
    }

    if (order === "asc") {
      return valueA > valueB ? 1 : valueA < valueB ? -1 : 0
    } else {
      return valueA < valueB ? 1 : valueA > valueB ? -1 : 0
    }
  })
}

// Filter array by search term
function filterArrayBySearchTerm(array, searchTerm, searchFields) {
  if (!searchTerm) return array

  searchTerm = searchTerm.toLowerCase()

  return array.filter((item) => {
    return searchFields.some((field) => {
      const value = item[field]
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchTerm)
      }
      return false
    })
  })
}

// Show toast message
function showToast(message, type = "success") {
  const toastContainer = document.getElementById("toast-container") || createToastContainer()
  const toast = document.createElement("div")
  toast.classList.add("toast", `toast-${type}`)
  toast.textContent = message
  toastContainer.appendChild(toast)

  setTimeout(() => {
    toast.remove()
    if (toastContainer.children.length === 0) {
      toastContainer.remove()
    }
  }, 3000)

  function createToastContainer() {
    const container = document.createElement("div")
    container.id = "toast-container"
    container.classList.add("toast-container")
    document.body.appendChild(container)
    return container
  }
}

// Export functions to CSV
function exportToCSV(data, filename) {
  if (!data || !data.length) {
    showToast("No data to export", "error")
    return
  }

  // Get headers from the first object
  const headers = Object.keys(data[0])

  // Create CSV content
  let csvContent = headers.join(",") + "\n"

  // Add rows
  data.forEach((item) => {
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
  link.setAttribute("download", filename || "export.csv")
  link.style.display = "none"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Export data to JSON
function exportToJSON(data, filename) {
  if (!data) {
    showToast("No data to export", "error")
    return
  }

  const jsonString = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonString], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.setAttribute("href", url)
  link.setAttribute("download", filename || "export.json")
  link.style.display = "none"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Read JSON file
function readJSONFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result)
        resolve(data)
      } catch (error) {
        reject(new Error("Invalid JSON file"))
      }
    }

    reader.onerror = () => {
      reject(new Error("Error reading file"))
    }

    reader.readAsText(file)
  })
}

