/**
 * Modal management
 * Handles opening, closing, and managing modal dialogs
 */

// Track active modals
let activeModal = null

// Initialize modals
function initModals() {
  // Add event listeners to all modal close buttons
  document.querySelectorAll(".close-modal").forEach((button) => {
    button.addEventListener("click", () => {
      if (activeModal) {
        closeModal(activeModal)
      }
    })
  })

  // Close modal when clicking outside content
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal(modal)
      }
    })
  })

  // Close modal on escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && activeModal) {
      closeModal(activeModal)
    }
  })
}

// Open a modal
function openModal(modalId) {
  const modal = document.getElementById(modalId)
  if (!modal) return

  // Close any active modal first
  if (activeModal) {
    closeModal(activeModal)
  }

  // Open the new modal
  modal.classList.add("active")
  activeModal = modal

  // Prevent body scrolling
  document.body.style.overflow = "hidden"

  return modal
}

// Close a modal
function closeModal(modal) {
  if (typeof modal === "string") {
    modal = document.getElementById(modal)
  }

  if (!modal) return

  modal.classList.remove("active")

  if (activeModal === modal) {
    activeModal = null
  }

  // Restore body scrolling
  document.body.style.overflow = ""

  return modal
}

// Reset a modal form
function resetModalForm(formId) {
  const form = document.getElementById(formId)
  if (form) {
    form.reset()

    // Clear any hidden inputs
    form.querySelectorAll('input[type="hidden"]').forEach((input) => {
      input.value = ""
    })

    // Clear any validation errors
    form.querySelectorAll(".error-message").forEach((error) => {
      error.remove()
    })

    form.querySelectorAll(".is-invalid").forEach((field) => {
      field.classList.remove("is-invalid")
    })
  }
}

// Show confirmation modal
function showConfirmModal(message, confirmCallback) {
  const modal = openModal("confirm-modal")

  if (modal) {
    // Set confirmation message
    const messageElement = document.getElementById("confirm-message")
    if (messageElement) {
      messageElement.textContent = message
    }

    // Set confirm button action
    const confirmButton = document.getElementById("confirm-delete")
    if (confirmButton) {
      // Remove existing event listeners
      const newButton = confirmButton.cloneNode(true)
      confirmButton.parentNode.replaceChild(newButton, confirmButton)

      // Add new event listener
      newButton.addEventListener("click", () => {
        if (typeof confirmCallback === "function") {
          confirmCallback()
        }
        closeModal(modal)
      })
    }
  }
}

