const params = new URLSearchParams(window.location.search);

const postId = params.get("id");

console.log(postId);

//get posts
const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

const posts = JSON.parse(localStorage.getItem("posts")) || [];

const post = posts.find((post) => {
  return post.id === postId && post.authorId === currentUser?.id;
});

console.log(post);

//select fields
const titleInput = document.getElementById("title");
const imageInput = document.getElementById("image");
const contentInput = document.getElementById("content");

if (!currentUser) {
  window.location.href = "../login.html";
} else if (!post) {
  alert("Post not found or you don't have permission to edit it.");
  window.location.href = "index.html";
} else {
  titleInput.value = post.title;
  imageInput.value = post.image;
  contentInput.value = post.content;

  //submit
  const form = document.getElementById("editPostForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const updatedTitle = titleInput.value.trim();
    const updatedImage = imageInput.value.trim();
    const updatedContent = contentInput.value.trim();

    // Get the latest posts from Local Storage
    const posts = JSON.parse(localStorage.getItem("posts")) || [];

    // Find the post we want to update
    const postIndex = posts.findIndex((post) => {
      return post.id === postId && post.authorId === currentUser.id;
    });

    if (postIndex === -1) {
      alert("Post not found or you don't have permission to edit it.");
      return;
    }

    // Update the post
    posts[postIndex] = {
      ...posts[postIndex],
      title: updatedTitle,
      image: updatedImage,
      content: updatedContent,
    };

    // Save the updated collection
    localStorage.setItem("posts", JSON.stringify(posts));

    alert("Post updated successfully!");

    window.location.href = "index.html";
  });
}
