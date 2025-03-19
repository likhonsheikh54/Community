/**
 * Installer functionality
 * Handles the setup wizard for the inventory management system
 */

// Initialize installer
function initInstaller() {
  // Check if installation is already completed
  const isInstalled = localStorage.getItem("inventory_installed")

  if (isInstalled === "true") {
    // Hide installer and show app
    document.getElementById("installer-section").classList.add("d-none")
    document.getElementById("app-container").classList.remove("d-none")
    return
  }

  // Set up event listeners for installer steps
  setupInstallerEvents()
}

// Set up event listeners for installer steps
function setupInstallerEvents() {
  // Step 1: Welcome
  document.getElementById("installer-next-1").addEventListener("click", () => {
    goToStep(2)
  })

  // Step 2: Company Information
  document.getElementById("installer-prev-2").addEventListener("click", () => {
    goToStep(1)
  })

  document.getElementById("installer-next-2").addEventListener("click", () => {
    if (validateCompanyInfo()) {
      goToStep(3)
    }
  })

  // Step 3: Admin Account
  document.getElementById("installer-prev-3").addEventListener("click", () => {
    goToStep(2)
  })

  document.getElementById("installer-next-3").addEventListener("click", () => {
    if (validateAdminAccount()) {
      goToStep(4)
    }
  })

  // Step 4: Initial Categories
  document.getElementById("installer-prev-4").addEventListener("click", () => {
    goToStep(3)
  })

  document.getElementById("installer-next-4").addEventListener("click", () => {
    if (validateCategories()) {
      // Update summary before showing step 5
      updateInstallationSummary()
      goToStep(5)
    }
  })

  // Add category button
  document.getElementById("add-category-btn").addEventListener("click", () => {
    addCategoryField()
  })

  // Step 5: Finalize Installation
  document.getElementById("installer-prev-5").addEventListener("click", () => {
    goToStep(4)
  })

  document.getElementById("installer-complete").addEventListener("click", () => {
    completeInstallation()
  })

  // Step 6: Installation Complete
  document.getElementById("installer-start").addEventListener("click", () => {
    startApplication()
  })
}

// Go to a specific step
function goToStep(step) {
  // Hide all steps
  document.querySelectorAll(".installer-step").forEach((el) => {
    el.classList.remove("active")
  })

  // Show the selected step
  document.getElementById(`installer-step-${step}`).classList.add("active")

  // Update progress bar
  const progress = ((step - 1) / 5) * 100
  const progressBar = document.getElementById("installer-progress-bar")
  progressBar.style.width = `${progress}%`
  progressBar.textContent = `${Math.round(progress)}%`
  progressBar.setAttribute("aria-valuenow", progress)
}

// Validate company information
function validateCompanyInfo() {
  const companyName = document.getElementById("installer-company-name").value.trim()
  const currencySymbol = document.getElementById("installer-currency-symbol").value.trim()
  const lowStockThreshold = document.getElementById("installer-low-stock-threshold").value.trim()

  if (!companyName || !currencySymbol || !lowStockThreshold) {
    showToast("Please fill in all required fields", "error")
    return false
  }

  return true
}

// Validate admin account
function validateAdminAccount() {
  const adminName = document.getElementById("installer-admin-name").value.trim()
  const adminEmail = document.getElementById("installer-admin-email").value.trim()
  const adminUsername = document.getElementById("installer-admin-username").value.trim()
  const adminPassword = document.getElementById("installer-admin-password").value

  if (!adminName || !adminEmail || !adminUsername || !adminPassword) {
    showToast("Please fill in all required fields", "error")
    return false
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(adminEmail)) {
    showToast("Please enter a valid email address", "error")
    return false
  }

  // Validate password strength
  if (adminPassword.length < 8) {
    showToast("Password must be at least 8 characters long", "error")
    return false
  }

  // Check if password contains both letters and numbers
  const hasLetter = /[a-zA-Z]/.test(adminPassword)
  const hasNumber = /\d/.test(adminPassword)

  if (!hasLetter || !hasNumber) {
    showToast("Password must contain both letters and numbers", "error")
    return false
  }

  return true
}

// Validate categories
function validateCategories() {
  const categoryFields = document.querySelectorAll(".category-name")
  let isValid = true

  categoryFields.forEach((field) => {
    if (!field.value.trim()) {
      showToast("Category name is required", "error")
      isValid = false
    }
  })

  return isValid
}

// Add a new category field
function addCategoryField() {
  const container = document.getElementById("installer-categories-container")

  const categoryDiv = document.createElement("div")
  categoryDiv.className = "installer-category"

  categoryDiv.innerHTML = `
        <div class="mb-3">
            <label class="form-label">Category Name*</label>
            <input type="text" class="form-control category-name" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Description</label>
            <input type="text" class="form-control category-description">
        </div>
        <div class="mb-3">
            <label class="form-label">Color</label>
            <input type="color" class="form-control form-control-color category-color" value="#${getRandomColor()}">
        </div>
        <button type="button" class="btn btn-sm btn-outline-danger remove-category">Remove</button>
    `

  container.appendChild(categoryDiv)

  // Add event listener to remove button
  categoryDiv.querySelector(".remove-category").addEventListener("click", () => {
    container.removeChild(categoryDiv)
  })
}

// Generate a random color
function getRandomColor() {
  const letters = "0123456789ABCDEF"
  let color = ""
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

// Update installation summary
function updateInstallationSummary() {
  // Company info
  const companyName = document.getElementById("installer-company-name").value.trim()
  const currencySymbol = document.getElementById("installer-currency-symbol").value.trim()

  // Admin info
  const adminName = document.getElementById("installer-admin-name").value.trim()
  const adminEmail = document.getElementById("installer-admin-email").value.trim()

  // Categories
  const categoryNames = Array.from(document.querySelectorAll(".category-name"))
    .map((input) => input.value.trim())
    .filter((name) => name !== "")

  // Update summary elements
  document.getElementById("summary-company").textContent = companyName
  document.getElementById("summary-currency").textContent = currencySymbol
  document.getElementById("summary-admin").textContent = `${adminName} (${adminEmail})`
  document.getElementById("summary-categories").textContent = categoryNames.join(", ")
}

// Complete the installation
function completeInstallation() {
  // Show loading state
  const completeButton = document.getElementById("installer-complete")
  completeButton.disabled = true
  completeButton.innerHTML =
    '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Installing...'

  // Simulate installation process
  setTimeout(() => {
    // Save company information
    const companyName = document.getElementById("installer-company-name").value.trim()
    const currencySymbol = document.getElementById("installer-currency-symbol").value.trim()
    const lowStockThreshold = Number.parseInt(document.getElementById("installer-low-stock-threshold").value.trim())
    const theme = document.getElementById("installer-theme").value

    const settings = {
      companyName,
      currencySymbol,
      lowStockThreshold,
      theme,
      itemsPerPage: 20,
      defaultCategory: "",
      siteTitle: "InventoryPro",
      siteDescription: "Comprehensive inventory management system",
      siteKeywords: "inventory, management, stock control",
      googleAnalytics: "",
    }

    // Save settings to localStorage
    localStorage.setItem("inventory_settings", JSON.stringify(settings))

    // Save admin account
    const adminName = document.getElementById("installer-admin-name").value.trim()
    const adminEmail = document.getElementById("installer-admin-email").value.trim()
    const adminUsername = document.getElementById("installer-admin-username").value.trim()
    const adminPassword = document.getElementById("installer-admin-password").value

    const adminAccount = {
      name: adminName,
      email: adminEmail,
      username: adminUsername,
      password: hashPassword(adminPassword), // In a real app, use proper password hashing
      role: "admin",
      created: new Date().toISOString(),
    }

    // Save admin account to localStorage
    localStorage.setItem("inventory_admin", JSON.stringify(adminAccount))

    // Save categories
    const categories = []

    document.querySelectorAll(".installer-category").forEach((categoryEl, index) => {
      const name = categoryEl.querySelector(".category-name").value.trim()

      if (name) {
        const description = categoryEl.querySelector(".category-description").value.trim()
        const color = categoryEl.querySelector(".category-color").value

        categories.push({
          id: `cat${index + 1}`,
          name,
          description,
          color,
          created: new Date().toISOString(),
          updated: new Date().toISOString(),
        })
      }
    })

    // Save categories to localStorage
    localStorage.setItem("inventory_categories", JSON.stringify(categories))

    // Create empty arrays for other data
    localStorage.setItem("inventory_items", JSON.stringify([]))
    localStorage.setItem("inventory_activity_log", JSON.stringify([]))
    localStorage.setItem("inventory_notifications", JSON.stringify([]))
    localStorage.setItem("inventory_blog_posts", JSON.stringify([]))
    localStorage.setItem("inventory_blog_categories", JSON.stringify([]))

    // Mark as installed
    localStorage.setItem("inventory_installed", "true")

    // Go to final step
    goToStep(6)
  }, 2000)
}

// Start the application
function startApplication() {
  // Hide installer and show app
  document.getElementById("installer-section").classList.add("d-none")
  document.getElementById("app-container").classList.remove("d-none")

  // Update user display name
  const adminData = JSON.parse(localStorage.getItem("inventory_admin"))
  if (adminData && adminData.name) {
    document.getElementById("user-display-name").textContent = adminData.name
  }

  // Initialize the application
  initApp()
}

// Simple password hashing (for demo purposes only)
// In a real application, use a proper hashing library
function hashPassword(password) {
  // This is NOT secure - just for demonstration
  return btoa(password + "salt")
}

// Show toast notification
function showToast(message, type = "info") {
  const toastContainer = document.querySelector(".toast-container")

  const toastEl = document.createElement("div")
  toastEl.className = `toast align-items-center text-white bg-${type === "error" ? "danger" : type}`
  toastEl.setAttribute("role", "alert")
  toastEl.setAttribute("aria-live", "assertive")
  toastEl.setAttribute("aria-atomic", "true")

  toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `

  toastContainer.appendChild(toastEl)

  const toast = new bootstrap.Toast(toastEl, {
    autohide: true,
    delay: 5000,
  })

  toast.show()

  // Remove toast after it's hidden
  toastEl.addEventListener("hidden.bs.toast", () => {
    toastContainer.removeChild(toastEl)
  })
}

// Declare initApp and bootstrap if they are not already declared
// This assumes that initApp is a function that initializes the main application
// and that bootstrap is the Bootstrap library.  If they are defined elsewhere
// (e.g., in another included script), this will not redefine them.
if (typeof initApp === "undefined") {
  function initApp() {
    // Placeholder for the actual initialization logic
    console.warn("initApp() is not fully implemented.  Add your application initialization code here.")
  }
}

if (typeof bootstrap === "undefined") {
  console.warn("Bootstrap is not fully initialized. Ensure Bootstrap JS is properly included.")
}

