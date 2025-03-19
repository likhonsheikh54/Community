/**
 * Categories management functionality
 * Handles CRUD operations for categories
 */

// Initialize categories module
function initCategories() {
  // Load categories
  loadCategories()

  // Set up event listeners
  document.getElementById("add-category-btn").addEventListener("click", () => {
    openAddCategoryModal()
  })

  document.getElementById("category-form").addEventListener("submit", (event) => {
    event.preventDefault()
    saveCategory()
  })
}

// Load and display categories
function loadCategories() {
  const categoriesList = document.getElementById("categories-list")
  if (!categoriesList) return

  // Clear list
  categoriesList.innerHTML = ""

  // Get categories
  const categories = getCategories()

  // Get inventory items to count items per category
  const items = getInventoryItems()

  // Calculate items per category
  const itemCounts = {}
  items.forEach((item) => {
    if (item.category) {
      itemCounts[item.category] = (itemCounts[item.category] || 0) + 1
    }
  })

  // Render categories
  if (categories.length === 0) {
    categoriesList.innerHTML = `
            <div class="empty-message">No categories found. Click "Add New Category" to create one.</div>
        `
  } else {
    categories.forEach((category) => {
      const categoryCard = document.createElement("div")
      categoryCard.className = "category-card"
      categoryCard.style.borderLeftColor = category.color || "#3498db"

      const itemCount = itemCounts[category.id] || 0

      categoryCard.innerHTML = `
                <div class="category-header">
                    <h3 class="category-name">${category.name}</h3>
                    <div class="category-actions">
                        <button class="edit-btn" data-id="${category.id}" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-btn" data-id="${category.id}" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="category-description">
                    ${category.description || "No description"}
                </div>
                <div class="category-stats">
                    <span>${itemCount} item${itemCount !== 1 ? "s" : ""}</span>
                    <span>Created: ${formatRelativeTime(category.created)}</span>
                </div>
            `

      categoriesList.appendChild(categoryCard)

      // Add event listeners to action buttons
      const editBtn = categoryCard.querySelector(".edit-btn")
      const deleteBtn = categoryCard.querySelector(".delete-btn")

      editBtn.addEventListener("click", () => {
        openEditCategoryModal(category.id)
      })

      deleteBtn.addEventListener("click", () => {
        confirmDeleteCategory(category.id)
      })
    })
  }

  // Update category dropdowns in other forms
  populateCategoryDropdowns()
}

// Open modal to add a new category
function openAddCategoryModal() {
  // Reset form
  resetModalForm("category-form")

  // Set modal title
  document.getElementById("category-modal-title").textContent = "Add New Category"

  // Open modal
  openModal("category-modal")
}

// Open modal to edit an existing category
function openEditCategoryModal(categoryId) {
  // Get category data
  const categories = getCategories()
  const category = categories.find((c) => c.id === categoryId)

  if (!category) {
    showToast("Category not found", "error")
    return
  }

  // Reset form
  resetModalForm("category-form")

  // Set modal title
  document.getElementById("category-modal-title").textContent = "Edit Category"

  // Populate form with category data
  document.getElementById("category-id").value = category.id
  document.getElementById("category-name").value = category.name
  document.getElementById("category-description").value = category.description || ""
  document.getElementById("category-color").value = category.color || "#3498db"

  // Open modal
  openModal("category-modal")
}

// Save category (add or update)
function saveCategory() {
  // Get form data
  const categoryId = document.getElementById("category-id").value
  const name = document.getElementById("category-name").value.trim()
  const description = document.getElementById("category-description").value.trim()
  const color = document.getElementById("category-color").value

  // Validate form data
  if (!name) {
    showToast("Please enter a category name", "error")
    return
  }

  // Get existing categories
  const categories = getCategories()

  // Check if name is unique (except for the current category)
  const existingName = categories.find((cat) => cat.name.toLowerCase() === name.toLowerCase() && cat.id !== categoryId)
  if (existingName) {
    showToast("Category name must be unique", "error")
    return
  }

  // Create or update category
  const now = new Date().toISOString()

  if (categoryId) {
    // Update existing category
    const categoryIndex = categories.findIndex((cat) => cat.id === categoryId)

    if (categoryIndex === -1) {
      showToast("Category not found", "error")
      return
    }

    categories[categoryIndex] = {
      ...categories[categoryIndex],
      name,
      description,
      color,
      updated: now,
    }

    // Save to storage
    saveCategories(categories)

    // Add activity log
    addActivity("update", `Updated category: ${name}`)

    showToast("Category updated successfully", "success")
  } else {
    // Create new category
    const newCategory = {
      id: generateId(),
      name,
      description,
      color,
      created: now,
      updated: now,
    }

    // Add to categories array
    categories.push(newCategory)

    // Save to storage
    saveCategories(categories)

    // Add activity log
    addActivity("add", `Added new category: ${name}`)

    showToast("Category added successfully", "success")
  }

  // Close modal
  closeModal("category-modal")

  // Reload categories
  loadCategories()

  // Update inventory table if on inventory page
  if (document.getElementById("inventory-page").classList.contains("active")) {
    loadInventoryItems()
  }

  // Update dashboard if on dashboard page
  if (document.getElementById("dashboard-page").classList.contains("active")) {
    updateDashboard()
  }
}

// Confirm delete category
function confirmDeleteCategory(categoryId) {
  // Get category data
  const categories = getCategories()
  const category = categories.find((c) => c.id === categoryId)

  if (!category) {
    showToast("Category not found", "error")
    return
  }

  // Check if category is in use
  const items = getInventoryItems()
  const inUse = items.some((item) => item.category === categoryId)

  if (inUse) {
    showToast("Cannot delete category that is in use", "error")
    return
  }

  // Show confirmation modal
  showConfirmModal(`Are you sure you want to delete "${category.name}"?`, () => {
    deleteCategory(categoryId)
  })
}

// Delete category
function deleteCategory(categoryId) {
  // Get categories
  const categories = getCategories()

  // Find category index
  const categoryIndex = categories.findIndex((cat) => cat.id === categoryId)

  if (categoryIndex === -1) {
    showToast("Category not found", "error")
    return
  }

  // Get category name for activity log
  const categoryName = categories[categoryIndex].name

  // Remove category
  categories.splice(categoryIndex, 1)

  // Save to storage
  saveCategories(categories)

  // Add activity log
  addActivity("delete", `Deleted category: ${categoryName}`)

  // Show success message
  showToast("Category deleted successfully", "success")

  // Reload categories
  loadCategories()
}

// Get category name by ID
function getCategoryName(categoryId) {
  const categories = getCategories()
  const category = categories.find((c) => c.id === categoryId)
  return category ? category.name : "Uncategorized"
}

// Get category color by ID
function getCategoryColor(categoryId) {
  const categories = getCategories()
  const category = categories.find((c) => c.id === categoryId)
  return category ? category.color : "#3498db"
}

// Mock functions for demonstration purposes.  In a real application,
// these would be replaced with actual data retrieval and storage mechanisms.
// For example, using localStorage, a database, or an API.

function getCategories() {
  // Replace with actual data retrieval logic
  return JSON.parse(localStorage.getItem("categories") || "[]")
}

function saveCategories(categories) {
  // Replace with actual data storage logic
  localStorage.setItem("categories", JSON.stringify(categories))
}

function getInventoryItems() {
  // Replace with actual data retrieval logic
  return JSON.parse(localStorage.getItem("inventoryItems") || "[]")
}

function formatRelativeTime(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return `${days} day${days !== 1 ? "s" : ""} ago`
  } else if (hours > 0) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`
  } else if (minutes > 0) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`
  } else {
    return "Just now"
  }
}

function populateCategoryDropdowns() {
  // Replace with actual logic to update dropdowns in other forms
  // This is a placeholder
  console.log("Category dropdowns updated")
}

function resetModalForm(formId) {
  const form = document.getElementById(formId)
  if (form) {
    form.reset()
    // Clear any validation errors if needed
  }
}

function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function showToast(message, type = "success") {
  // Replace with actual toast notification logic
  console.log(`${type}: ${message}`)
}

function openModal(modalId) {
  // Replace with actual modal opening logic
  console.log(`Modal ${modalId} opened`)
}

function closeModal(modalId) {
  // Replace with actual modal closing logic
  console.log(`Modal ${modalId} closed`)
}

function addActivity(action, description) {
  // Replace with actual activity logging logic
  console.log(`Activity: ${action} - ${description}`)
}

function showConfirmModal(message, callback) {
  // Replace with actual confirmation modal logic
  if (confirm(message)) {
    callback()
  }
}

// Mock functions for loadInventoryItems and updateDashboard
function loadInventoryItems() {
  // Replace with actual implementation
  console.log("loadInventoryItems function called")
}

function updateDashboard() {
  // Replace with actual implementation
  console.log("updateDashboard function called")
}

