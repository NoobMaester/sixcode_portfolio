const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!currentUser) {
    window.location.href = "../login.html";
} else {
    const form = document.getElementById("createPostForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get the values when the form is submitted
        const title = document.getElementById("title").value.trim();
        const image = document.getElementById("image").value.trim();
        const content = document.getElementById("content").value.trim();

        // Get existing posts
        const posts = JSON.parse(localStorage.getItem("posts")) || [];

        // Create a new post object
        const newPost = {
            id: Date.now().toString(),
            title,
            image,
            content,
            author: currentUser.name,
            authorId: currentUser.id,
            date: new Date().toISOString()
        };

        // Add the new post to the collection
        posts.push(newPost);

        // Save the updated collection
        localStorage.setItem("posts", JSON.stringify(posts));

        // Return to the dashboard
        window.location.href = "index.html";
    });
}