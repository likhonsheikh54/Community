/**
 * Blog management functionality
 * Handles CRUD operations for blog posts
 */

// Initialize blog module
function initBlog() {
  // Load blog posts
  loadBlogPosts()

  // Set up event listeners
  document.getElementById("add-blog-post-btn").addEventListener("click", () => {
    openAddBlogPostModal()
  })

  document.getElementById("save-blog-post-btn").addEventListener("click", () => {
    saveBlogPost()
  })

  document.getElementById("add-blog-category-btn").addEventListener("click", () => {
    addBlogCategory()
  })

  // Initialize rich text editor for blog content
  initRichTextEditor()
}

// Load and display blog posts
function loadBlogPosts() {
  const blogPostsList = document.getElementById("blog-posts-list")
  if (!blogPostsList) return

  // Clear list
  blogPostsList.innerHTML = ""

  // Get blog posts
  const posts = getBlogPosts()

  // Get blog categories
  const categories = getBlogCategories()
  const categoryMap = {}
  categories.forEach((cat) => {
    categoryMap[cat.id] = cat.name
  })

  // Update blog statistics
  updateBlogStats(posts)

  // Render blog posts
  if (posts.length === 0) {
    blogPostsList.innerHTML = `
            <div class="empty-message">No blog posts found. Click "Add New Post" to create one.</div>
        `
  } else {
    posts.forEach((post) => {
      const postCard = document.createElement("div")
      postCard.className = "card mb-4 blog-post-card"

      // Format date
      const postDate = new Date(post.created)
      const formattedDate = postDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })

      // Truncate content for preview
      const contentPreview = post.content.length > 150 ? post.content.substring(0, 150) + "..." : post.content

      postCard.innerHTML = `
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h3>${post.title}</h3>
                    <span class="badge ${post.status === "published" ? "bg-success" : "bg-secondary"}">${post.status}</span>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <small class="text-muted">
                            <i class="fas fa-calendar-alt me-1"></i> ${formattedDate}
                            ${post.category ? `<span class="mx-2">|</span><i class="fas fa-tag me-1"></i> ${categoryMap[post.category] || "Uncategorized"}` : ""}
                        </small>
                    </div>
                    <p>${contentPreview}</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <div>
                        ${
                          post.tags && post.tags.length > 0
                            ? `<small class="text-muted"><i class="fas fa-tags me-1"></i> ${post.tags.join(", ")}</small>`
                            : ""
                        }
                    </div>
                    <div>
                        <button class="btn btn-sm btn-outline-primary edit-post-btn" data-id="${post.id}">
                            <i class="fas fa-edit me-1"></i> Edit
                        </button>
                        <button class="btn btn-sm btn-outline-danger delete-post-btn" data-id="${post.id}">
                            <i class="fas fa-trash me-1"></i> Delete
                        </button>
                    </div>
                </div>
            `

      blogPostsList.appendChild(postCard)

      // Add event listeners to action buttons
      const editBtn = postCard.querySelector(".edit-post-btn")
      const deleteBtn = postCard.querySelector(".delete-post-btn")

      editBtn.addEventListener("click", () => {
        openEditBlogPostModal(post.id)
      })

      deleteBtn.addEventListener("click", () => {
        confirmDeleteBlogPost(post.id)
      })
    })
  }

  // Load blog categories
  loadBlogCategories()
}

// Load and display blog categories
function loadBlogCategories() {
  const categoriesList = document.getElementById("blog-categories-list")
  if (!categoriesList) return

  // Clear list
  categoriesList.innerHTML = ""

  // Get blog categories
  const categories = getBlogCategories()

  // Render categories
  if (categories.length === 0) {
    categoriesList.innerHTML = `
            <div class="empty-message">No blog categories found.</div>
        `
  } else {
    const categoryList = document.createElement("ul")
    categoryList.className = "list-group"

    categories.forEach((category) => {
      const categoryItem = document.createElement("li")
      categoryItem.className = "list-group-item d-flex justify-content-between align-items-center"

      categoryItem.innerHTML = `
                <span>${category.name}</span>
                <div>
                    <button class="btn btn-sm btn-outline-danger delete-category-btn" data-id="${category.id}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `

      categoryList.appendChild(categoryItem)

      // Add event listener to delete button
      const deleteBtn = categoryItem.querySelector(".delete-category-btn")
      deleteBtn.addEventListener("click", () => {
        deleteBlogCategory(category.id)
      })
    })

    categoriesList.appendChild(categoryList)
  }

  // Update category dropdown in blog post form
  updateBlogCategoryDropdown()
}

// Update blog statistics
function updateBlogStats(posts) {
  document.getElementById("total-posts").textContent = posts.length
  document.getElementById("published-posts").textContent = posts.filter((post) => post.status === "published").length
  document.getElementById("draft-posts").textContent = posts.filter((post) => post.status === "draft").length
}

// Open modal to add a new blog post
function openAddBlogPostModal() {
  // Reset form
  document.getElementById("blog-post-form").reset()
  document.getElementById("blog-post-id").value = ""

  // Set modal title
  document.getElementById("blog-post-modal-title").textContent = "Add New Blog Post"

  // Clear rich text editor
  if (window.blogEditor) {
    window.blogEditor.setContent("")
  }

  // Show modal
  const modalElement = document.getElementById("blog-post-modal")
  const modal = new bootstrap.Modal(modalElement)
  modal.show()
}

// Open modal to edit an existing blog post
function openEditBlogPostModal(postId) {
  // Get post data
  const posts = getBlogPosts()
  const post = posts.find((p) => p.id === postId)

  if (!post) {
    showToast("Blog post not found", "error")
    return
  }

  // Reset form
  document.getElementById("blog-post-form").reset()

  // Set modal title
  document.getElementById("blog-post-modal-title").textContent = "Edit Blog Post"

  // Populate form with post data
  document.getElementById("blog-post-id").value = post.id
  document.getElementById("blog-post-title").value = post.title
  document.getElementById("blog-post-category").value = post.category || ""
  document.getElementById("blog-post-status").value = post.status || "draft"

  // Set content in rich text editor
  if (window.blogEditor) {
    window.blogEditor.setContent(post.content)
  } else {
    document.getElementById("blog-post-content").value = post.content
  }

  // Set tags
  if (post.tags && post.tags.length > 0) {
    document.getElementById("blog-post-tags").value = post.tags.join(", ")
  }

  // Show modal
  const modalElement = document.getElementById("blog-post-modal")
  const modal = new bootstrap.Modal(modalElement)
  modal.show()
}

// Save blog post (add or update)
function saveBlogPost() {
  // Get form data
  const postId = document.getElementById("blog-post-id").value
  const title = document.getElementById("blog-post-title").value.trim()
  const category = document.getElementById("blog-post-category").value
  const status = document.getElementById("blog-post-status").value

  // Get content from rich text editor or fallback to textarea
  let content = ""
  if (window.blogEditor) {
    content = window.blogEditor.getContent()
  } else {
    content = document.getElementById("blog-post-content").value.trim()
  }

  // Get tags
  const tagsInput = document.getElementById("blog-post-tags").value.trim()
  const tags = tagsInput ? tagsInput.split(",").map((tag) => tag.trim()) : []

  // Validate form data
  if (!title || !content) {
    showToast("Please fill in all required fields", "error")
    return
  }

  // Get existing posts
  const posts = getBlogPosts()

  // Create or update post
  const now = new Date().toISOString()

  if (postId) {
    // Update existing post
    const postIndex = posts.findIndex((post) => post.id === postId)

    if (postIndex === -1) {
      showToast("Blog post not found", "error")
      return
    }

    posts[postIndex] = {
      ...posts[postIndex],
      title,
      category,
      status,
      content,
      tags,
      updated: now,
    }

    // Save to storage
    saveBlogPosts(posts)

    showToast("Blog post updated successfully", "success")
  } else {
    // Create new post
    const newPost = {
      id: generateId(),
      title,
      category,
      status,
      content,
      tags,
      created: now,
      updated: now,
    }

    // Add to posts array
    posts.push(newPost)

    // Save to storage
    saveBlogPosts(posts)

    showToast("Blog post added successfully", "success")
  }

  // Close modal
  const modalElement = document.getElementById("blog-post-modal")
  const modal = bootstrap.Modal.getInstance(modalElement)
  modal.hide()

  // Reload blog posts
  loadBlogPosts()
}

// Confirm delete blog post
function confirmDeleteBlogPost(postId) {
  // Get post data
  const posts = getBlogPosts()
  const post = posts.find((p) => p.id === postId)

  if (!post) {
    showToast("Blog post not found", "error")
    return
  }

  // Show confirmation dialog
  if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
    deleteBlogPost(postId)
  }
}

// Delete blog post
function deleteBlogPost(postId) {
  // Get posts
  const posts = getBlogPosts()

  // Find post index
  const postIndex = posts.findIndex((post) => post.id === postId)

  if (postIndex === -1) {
    showToast("Blog post not found", "error")
    return
  }

  // Remove post
  posts.splice(postIndex, 1)

  // Save to storage
  saveBlogPosts(posts)

  showToast("Blog post deleted successfully", "success")

  // Reload blog posts
  loadBlogPosts()
}

// Add a new blog category
function addBlogCategory() {
  const categoryName = prompt("Enter category name:")

  if (!categoryName || categoryName.trim() === "") {
    return
  }

  // Get existing categories
  const categories = getBlogCategories()

  // Check if category already exists
  if (categories.some((cat) => cat.name.toLowerCase() === categoryName.trim().toLowerCase())) {
    showToast("Category already exists", "error")
    return
  }

  // Create new category
  const newCategory = {
    id: generateId(),
    name: categoryName.trim(),
    created: new Date().toISOString(),
  }

  // Add to categories array
  categories.push(newCategory)

  // Save to storage
  saveBlogCategories(categories)

  showToast("Blog category added successfully", "success")

  // Reload blog categories
  loadBlogCategories()
}

// Delete blog category
function deleteBlogCategory(categoryId) {
  // Get categories
  const categories = getBlogCategories()

  // Find category index
  const categoryIndex = categories.findIndex((cat) => cat.id === categoryId)

  if (categoryIndex === -1) {
    showToast("Category not found", "error")
    return
  }

  // Check if category is in use
  const posts = getBlogPosts()
  const inUse = posts.some((post) => post.category === categoryId)

  if (inUse) {
    showToast("Cannot delete category that is in use", "error")
    return
  }

  // Remove category
  categories.splice(categoryIndex, 1)

  // Save to storage
  saveBlogCategories(categories)

  showToast("Blog category deleted successfully", "success")

  // Reload blog categories
  loadBlogCategories()
}

// Update blog category dropdown
function updateBlogCategoryDropdown() {
  const categorySelect = document.getElementById("blog-post-category")
  if (!categorySelect) return

  // Clear existing options (except the first one)
  while (categorySelect.options.length > 1) {
    categorySelect.remove(1)
  }

  // Get categories
  const categories = getBlogCategories()

  // Add category options
  categories.forEach((category) => {
    const option = new Option(category.name, category.id)
    categorySelect.appendChild(option)
  })
}

// Initialize rich text editor
function initRichTextEditor() {
  // This is a simple implementation
  // In a real application, you would use a library like TinyMCE, CKEditor, etc.
  const contentTextarea = document.getElementById("blog-post-content")
  if (!contentTextarea) return

  // Create a simple toolbar
  const toolbar = document.createElement("div")
  toolbar.className = "btn-toolbar mb-2"
  toolbar.setAttribute("role", "toolbar")
  toolbar.innerHTML = `
        <div class="btn-group me-2">
            <button type="button" class="btn btn-sm btn-outline-secondary" data-command="bold">
                <i class="fas fa-bold"></i>
            </button>
            <button type="button" class="btn btn-sm btn-outline-secondary" data-command="italic">
                <i class="fas fa-italic"></i>
            </button>
            <button type="button" class="btn btn-sm btn-outline-secondary" data-command="underline">
                <i class="fas fa-underline"></i>
            </button>
        </div>
        <div class="btn-group me-2">
            <button type="button" class="btn btn-sm btn-outline-secondary" data-command="insertUnorderedList">
                <i class="fas fa-list-ul"></i>
            </button>
            <button type="button" class="btn btn-sm btn-outline-secondary" data-command="insertOrderedList">
                <i class="fas fa-list-ol"></i>
            </button>
        </div>
        <div class="btn-group">
            <button type="button" class="btn btn-sm btn-outline-secondary" data-command="createLink">
                <i class="fas fa-link"></i>
            </button>
            <button type="button" class="btn btn-sm btn-outline-secondary" data-command="insertImage">
                <i class="fas fa-image"></i>
            </button>
        </div>
    `

  // Insert toolbar before textarea
  contentTextarea.parentNode.insertBefore(toolbar, contentTextarea)

  // Create editor div
  const editor = document.createElement("div")
  editor.className = "form-control rich-text-editor"
  editor.setAttribute("contenteditable", "true")
  editor.style.height = "300px"
  editor.style.overflow = "auto"

  // Insert editor after toolbar
  toolbar.parentNode.insertBefore(editor, contentTextarea.nextSibling)

  // Hide textarea
  contentTextarea.style.display = "none"

  // Add event listeners to toolbar buttons
  toolbar.querySelectorAll("button[data-command]").forEach((button) => {
    button.addEventListener("click", () => {
      const command = button.getAttribute("data-command")

      if (command === "createLink") {
        const url = prompt("Enter link URL:")
        if (url) document.execCommand(command, false, url)
      } else if (command === "insertImage") {
        const url = prompt("Enter image URL:")
        if (url) document.execCommand(command, false, url)
      } else {
        document.execCommand(command, false, null)
      }

      // Update textarea value
      contentTextarea.value = editor.innerHTML
    })
  })

  // Update textarea when editor content changes
  editor.addEventListener("input", () => {
    contentTextarea.value = editor.innerHTML
  })

  // Simple editor API
  window.blogEditor = {
    getContent: () => editor.innerHTML,
    setContent: (content) => {
      editor.innerHTML = content
      contentTextarea.value = content
    },
  }
}

// Get blog posts from storage
function getBlogPosts() {
  return JSON.parse(localStorage.getItem("inventory_blog_posts") || "[]")
}

// Save blog posts to storage
function saveBlogPosts(posts) {
  localStorage.setItem("inventory_blog_posts", JSON.stringify(posts))
}

// Get blog categories from storage
function getBlogCategories() {
  return JSON.parse(localStorage.getItem("inventory_blog_categories") || "[]")
}

// Save blog categories to storage
function saveBlogCategories(categories) {
  localStorage.setItem("inventory_blog_categories", JSON.stringify(categories))
}

// Generate a unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

// Show toast notification
function showToast(message, type) {
  // Implementation depends on your toast system
  console.log(`${type}: ${message}`)
}

