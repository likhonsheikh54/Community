/**
 * Toast notification system
 * Creates and manages toast notifications
 */

// Toast container
let toastContainer = null

// Create toast container if it doesn't exist
function getToastContainer() {
  if (!toastContainer) {
    toastContainer = document.getElementById("toast-container")
    if (!toastContainer) {
      toastContainer = document.createElement("div")
      toastContainer.id = "toast-container"
      toastContainer.className = "toast-container"
      document.body.appendChild(toastContainer)
    }
  }
  return toastContainer
}

// Show a toast notification
function showToast(message, type = "info", duration = 5000) {
  const container = getToastContainer()

  // Create toast element
  const toast = document.createElement("div")
  toast.className = `toast ${type}`

  // Get icon based on type
  let icon = ""
  switch (type) {
    case "success":
      icon = '<i class="fas fa-check-circle toast-icon"></i>'
      break
    case "error":
      icon = '<i class="fas fa-exclamation-circle toast-icon"></i>'
      break
    case "warning":
      icon = '<i class="fas fa-exclamation-triangle toast-icon"></i>'
      break
    case "info":
    default:
      icon = '<i class="fas fa-info-circle toast-icon"></i>'
      break
  }

  // Create toast content
  toast.innerHTML = `
        ${icon}
        <div class="toast-content">
            <div class="toast-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">&times;</button>
    `

  // Add toast to container
  container.appendChild(toast)

  // Add event listener to close button
  const closeButton = toast.querySelector(".toast-close")
  closeButton.addEventListener("click", () => {
    removeToast(toast)
  })

  // Auto-remove toast after duration
  setTimeout(() => {
    removeToast(toast)
  }, duration)

  return toast
}

// Remove a toast notification
function removeToast(toast) {
  if (!toast) return

  // Add fade-out class
  toast.classList.add("fade-out")

  // Remove toast after animation
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast)

      // Remove container if empty
      const container = getToastContainer()
      if (container && container.children.length === 0) {
        container.remove()
        toastContainer = null
      }
    }
  }, 300)
}

