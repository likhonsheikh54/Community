/**
 * Inventory management functionality
 * Handles CRUD operations for inventory items
 */

// Import necessary functions (assuming these are defined elsewhere)
import { debounce } from "./utils.js" // Assuming debounce is in utils.js
import {
  getInventoryItems,
  saveInventoryItems,
  filterArrayBySearchTerm,
  sortArrayByProperty,
  getCategories,
  getSettings,
  generateId,
  formatCurrency,
  formatRelativeTime,
  openModal,
  closeModal,
  resetModalForm,
  showToast,
  showConfirmModal,
  addActivity,
  addNotification,
  updateNotificationCount,
  updateDashboard,
} from "./data.js" // Assuming data functions are in data.js

// Initialize inventory module
function initInventory() {
  // Load inventory items
  loadInventoryItems()

  // Set up event listeners
  document.getElementById("add-item-btn").addEventListener("click", () => {
    openAddItemModal()
  })

  document.getElementById("item-form").addEventListener("submit", (event) => {
    event.preventDefault()
    saveItem()
  })

  // Set up filter and sort event listeners
  document.getElementById("category-filter").addEventListener("change", loadInventoryItems)
  document.getElementById("sort-by").addEventListener("change", loadInventoryItems)
  document.getElementById("sort-order").addEventListener("change", loadInventoryItems)

  // Set up search functionality
  const searchInput = document.getElementById("search-input")
  const searchBtn = document.getElementById("search-btn")

  searchInput.addEventListener(
    "keyup",
    debounce(() => {
      loadInventoryItems()
    }, 300),
  )

  searchBtn.addEventListener("click", () => {
    loadInventoryItems()
  })

  // Populate category filter
  populateCategoryDropdowns()
}

// Load inventory items with filtering and sorting
function loadInventoryItems() {
  const tableBody = document.getElementById("inventory-table-body")
  if (!tableBody) return

  // Clear table
  tableBody.innerHTML = ""

  // Get all items
  let items = getInventoryItems()

  // Apply search filter
  const searchTerm = document.getElementById("search-input").value.trim()
  if (searchTerm) {
    items = filterArrayBySearchTerm(items, searchTerm, ["name", "sku", "description"])
  }

  // Apply category filter
  const categoryFilter = document.getElementById("category-filter").value
  if (categoryFilter && categoryFilter !== "all") {
    items = items.filter((item) => item.category === categoryFilter)
  }

  // Apply sorting
  const sortBy = document.getElementById("sort-by").value
  const sortOrder = document.getElementById("sort-order").value
  items = sortArrayByProperty(items, sortBy, sortOrder)

  // Get categories for display
  const categories = getCategories().reduce((acc, category) => {
    acc[category.id] = category.name
    return acc
  }, {})

  // Get settings for currency symbol
  const settings = getSettings()

  // Render items
  if (items.length === 0) {
    tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center">No items found</td>
            </tr>
        `
  } else {
    items.forEach((item) => {
      const row = document.createElement("tr")

      // Calculate item value
      const value = Number.parseFloat(item.price) * Number.parseInt(item.quantity)

      // Check if item is low on stock
      const isLowStock = Number.parseInt(item.quantity) <= settings.lowStockThreshold

      row.innerHTML = `
                <td>${item.name}</td>
                <td>${categories[item.category] || "Uncategorized"}</td>
                <td>${item.sku}</td>
                <td class="${isLowStock ? "text-danger" : ""}">${item.quantity}</td>
                <td>${formatCurrency(item.price, settings.currencySymbol)}</td>
                <td>${formatCurrency(value, settings.currencySymbol)}</td>
                <td>${formatRelativeTime(item.updated)}</td>
                <td>
                    <div class="table-actions">
                        <button class="edit-btn" data-id="${item.id}" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-btn" data-id="${item.id}" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `

      tableBody.appendChild(row)

      // Add event listeners to action buttons
      const editBtn = row.querySelector(".edit-btn")
      const deleteBtn = row.querySelector(".delete-btn")

      editBtn.addEventListener("click", () => {
        openEditItemModal(item.id)
      })

      deleteBtn.addEventListener("click", () => {
        confirmDeleteItem(item.id)
      })
    })
  }

  // Update dashboard if on dashboard page
  if (document.getElementById("dashboard-page").classList.contains("active")) {
    updateDashboard()
  }
}

// Populate category dropdowns
function populateCategoryDropdowns() {
  const categoryFilter = document.getElementById("category-filter")
  const itemCategory = document.getElementById("item-category")
  const defaultCategory = document.getElementById("default-category")

  // Get categories
  const categories = getCategories()

  // Clear existing options (except the first one)
  while (categoryFilter.options.length > 1) {
    categoryFilter.remove(1)
  }

  while (itemCategory.options.length > 1) {
    itemCategory.remove(1)
  }

  if (defaultCategory) {
    while (defaultCategory.options.length > 1) {
      defaultCategory.remove(1)
    }
  }

  // Add category options
  categories.forEach((category) => {
    const option = new Option(category.name, category.id)
    const option2 = new Option(category.name, category.id)

    categoryFilter.appendChild(option)
    itemCategory.appendChild(option2)

    if (defaultCategory) {
      const option3 = new Option(category.name, category.id)
      defaultCategory.appendChild(option3)
    }
  })

  // Set default category in settings dropdown
  if (defaultCategory) {
    const settings = getSettings()
    if (settings.defaultCategory) {
      defaultCategory.value = settings.defaultCategory
    }
  }
}

// Open modal to add a new item
function openAddItemModal() {
  // Reset form
  resetModalForm("item-form")

  // Set modal title
  document.getElementById("item-modal-title").textContent = "Add New Item"

  // Set default category if configured
  const settings = getSettings()
  if (settings.defaultCategory) {
    document.getElementById("item-category").value = settings.defaultCategory
  }

  // Open modal
  openModal("item-modal")
}

// Open modal to edit an existing item
function openEditItemModal(itemId) {
  // Get item data
  const items = getInventoryItems()
  const item = items.find((i) => i.id === itemId)

  if (!item) {
    showToast("Item not found", "error")
    return
  }

  // Reset form
  resetModalForm("item-form")

  // Set modal title
  document.getElementById("item-modal-title").textContent = "Edit Item"

  // Populate form with item data
  document.getElementById("item-id").value = item.id
  document.getElementById("item-name").value = item.name
  document.getElementById("item-category").value = item.category
  document.getElementById("item-sku").value = item.sku
  document.getElementById("item-quantity").value = item.quantity
  document.getElementById("item-price").value = item.price
  document.getElementById("item-description").value = item.description || ""

  // Open modal
  openModal("item-modal")
}

// Save item (add or update)
function saveItem() {
  // Get form data
  const itemId = document.getElementById("item-id").value
  const name = document.getElementById("item-name").value.trim()
  const category = document.getElementById("item-category").value
  const sku = document.getElementById("item-sku").value.trim()
  const quantity = Number.parseInt(document.getElementById("item-quantity").value)
  const price = Number.parseFloat(document.getElementById("item-price").value)
  const description = document.getElementById("item-description").value.trim()

  // Validate form data
  if (!name || !category || !sku || isNaN(quantity) || isNaN(price)) {
    showToast("Please fill in all required fields", "error")
    return
  }

  // Get existing items
  const items = getInventoryItems()

  // Check if SKU is unique (except for the current item)
  const existingSku = items.find((item) => item.sku === sku && item.id !== itemId)
  if (existingSku) {
    showToast("SKU must be unique", "error")
    return
  }

  // Create or update item
  const now = new Date().toISOString()

  if (itemId) {
    // Update existing item
    const itemIndex = items.findIndex((item) => item.id === itemId)

    if (itemIndex === -1) {
      showToast("Item not found", "error")
      return
    }

    const oldItem = items[itemIndex]
    const updatedItem = {
      ...oldItem,
      name,
      category,
      sku,
      quantity,
      price,
      description,
      updated: now,
    }

    items[itemIndex] = updatedItem

    // Save to storage
    saveInventoryItems(items)

    // Add activity log
    addActivity("update", `Updated item: ${name}`)

    // Check for low stock
    checkLowStock(updatedItem)

    showToast("Item updated successfully", "success")
  } else {
    // Create new item
    const newItem = {
      id: generateId(),
      name,
      category,
      sku,
      quantity,
      price,
      description,
      created: now,
      updated: now,
    }

    // Add to items array
    items.push(newItem)

    // Save to storage
    saveInventoryItems(items)

    // Add activity log
    addActivity("add", `Added new item: ${name}`)

    // Check for low stock
    checkLowStock(newItem)

    showToast("Item added successfully", "success")
  }

  // Close modal
  closeModal("item-modal")

  // Reload inventory items
  loadInventoryItems()
}

// Confirm delete item
function confirmDeleteItem(itemId) {
  // Get item data
  const items = getInventoryItems()
  const item = items.find((i) => i.id === itemId)

  if (!item) {
    showToast("Item not found", "error")
    return
  }

  // Show confirmation modal
  showConfirmModal(`Are you sure you want to delete "${item.name}"?`, () => {
    deleteItem(itemId)
  })
}

// Delete item
function deleteItem(itemId) {
  // Get items
  const items = getInventoryItems()

  // Find item index
  const itemIndex = items.findIndex((item) => item.id === itemId)

  if (itemIndex === -1) {
    showToast("Item not found", "error")
    return
  }

  // Get item name for activity log
  const itemName = items[itemIndex].name

  // Remove item
  items.splice(itemIndex, 1)

  // Save to storage
  saveInventoryItems(items)

  // Add activity log
  addActivity("delete", `Deleted item: ${itemName}`)

  // Show success message
  showToast("Item deleted successfully", "success")

  // Reload inventory items
  loadInventoryItems()
}

// Check if item is low on stock and create notification if needed
function checkLowStock(item) {
  const settings = getSettings()
  const threshold = settings.lowStockThreshold

  if (Number.parseInt(item.quantity) <= threshold) {
    // Add notification
    addNotification("Low Stock Alert", `${item.name} is low on stock (${item.quantity} remaining)`, "warning")

    // Update notification count
    updateNotificationCount()
  }
}

