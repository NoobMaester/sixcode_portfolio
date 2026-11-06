const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!currentUser) {
  window.location.href = "../login.html";
} else {
  const logoutButton = document.querySelector(".logout");

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "../login.html";
  });

  const userName = document.getElementById("user-name");
  userName.textContent = currentUser.name;

  const postsList = document.getElementById("posts");

  function renderPosts() {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    
    //sort posts new to old
    posts.sort((a, b) => new Date(b.date) - new Date(a.date))

    // Only show posts belonging to the logged-in user
    const userPosts = posts.filter((post) => post.authorId === currentUser.id);

    postsList.innerHTML = "";

    if (userPosts.length === 0) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");

      cell.colSpan = 3;
      cell.textContent = "You haven't published any posts yet.";
      cell.classList.add("empty-state");

      row.appendChild(cell);
      postsList.appendChild(row);
      return;
    }

    userPosts.forEach((post) => {
      const row = document.createElement("tr");

      const titleCell = document.createElement("td");
      titleCell.textContent = post.title;

      const authorCell = document.createElement("td");
      authorCell.textContent = post.author;

      const dateCell = document.createElement("td");
      dateCell.textContent = new Date(post.date).toLocaleDateString();

      const actionsCell = document.createElement("td");

      const editButton = document.createElement("button");
      editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
      editButton.setAttribute("aria-label", "Edit post");
      editButton.classList.add("edit-post");
      editButton.dataset.id = post.id;

      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
      deleteButton.setAttribute("aria-label", "Delete post");
      deleteButton.classList.add("delete-post");
      deleteButton.dataset.id = post.id;

      actionsCell.append(editButton, deleteButton);

      row.append(titleCell, authorCell, dateCell, actionsCell);
      postsList.appendChild(row);
    });
  }
  renderPosts();

  //edit and delete post
  postsList.addEventListener("click", (e) => {
    const button = e.target.closest("button")

    if(!button) return;

    if (button.classList.contains("edit-post")) {
      const postId = button.dataset.id;
      window.location.href = `edit-post.html?id=${postId}`;
      return;
    }

    if (button.classList.contains("delete-post")) {
      const postId = button.dataset.id;

      const confirmDelete = confirm(
        "Are you sure you want to delete this post?",
      );

      if (!confirmDelete) return;

      const posts = JSON.parse(localStorage.getItem("posts")) || [];

      const updatedPosts = posts.filter((post) => {
        return post.id !== postId || post.authorId !== currentUser.id;
      });

      localStorage.setItem("posts", JSON.stringify(updatedPosts));

      renderPosts();
    }
  });
}

const createPostButton = document.getElementById("create-post");
createPostButton.addEventListener("click", () => {
  window.location.href = "/dashboard/create-post.html";
});

//sidebar menu
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebar = document.getElementById("dashboardSidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const sidebarIcon = sidebarToggle.querySelector("i");

function openSidebar() {
    sidebar.classList.add("open");
    sidebarOverlay.classList.add("active");

    sidebarToggle.setAttribute("aria-expanded", "true");
    sidebarToggle.setAttribute("aria-label", "Close dashboard navigation");

    sidebarIcon.classList.replace("fa-bars", "fa-xmark");
}

function closeSidebar() {
    sidebar.classList.remove("open");
    sidebarOverlay.classList.remove("active");

    sidebarToggle.setAttribute("aria-expanded", "false");
    sidebarToggle.setAttribute("aria-label", "Open dashboard navigation");

    sidebarIcon.classList.replace("fa-xmark", "fa-bars");
}

// Toggle menu
sidebarToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.contains("open");

    if (isOpen) {
        closeSidebar();
    } else {
        openSidebar();
    }
});

// Close when clicking outside
sidebarOverlay.addEventListener("click", closeSidebar);

// Close after selecting a navigation link
sidebar.querySelectorAll(".sidebar-nav a").forEach((link) => {
    link.addEventListener("click", closeSidebar);
});

// Close with Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeSidebar();
    }
});
