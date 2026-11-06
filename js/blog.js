const blogPosts = document.getElementById("blogPosts");

// Retrieve all published posts
const posts = JSON.parse(localStorage.getItem("posts")) || [];

//sort from newest to old
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

if (posts.length === 0) {
    blogPosts.textContent = "No blog posts available yet.";
} else {
    posts.forEach((post) => {
        // Create the card
        const card = document.createElement("li");
        card.classList.add("blog-post");

        // Featured image
        const image = document.createElement("img");
        image.src = post.image;
        image.alt = post.title;

        // Post title
        const title = document.createElement("a");
        title.textContent = post.title;
        title.href = `blog-post.html?id=${post.id}`;


        // Article excerpt
        const excerpt = document.createElement("p");
        excerpt.textContent = post.content.length > 140
            ? post.content.slice(0, 120) + "..."
            : post.content;

        // Author and date
        const postInfo = document.createElement("div");
        postInfo.classList.add("post-info");

        const author = document.createElement("span");
        author.textContent = `Author by ${post.author}`;

        const date = document.createElement("span");
        date.textContent = new Date(post.date).toLocaleDateString();

        postInfo.append(author, date);

        // Assemble the card
        card.append(image, title, excerpt, postInfo);

        blogPosts.appendChild(card);
    });
}