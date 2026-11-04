const form = document.getElementById("loginForm");
const message = document.getElementById("message");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    //clear any previous session
    localStorage.removeItem("loggedInUser");

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    
    //get users from local storage and check if the user exists
    const users= JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = users.find((user) => user.email === email && user.password === password);

    if (!currentUser) {
        message.textContent = "Invalid email or password.";
        message.classList.add("error");
        return;
    }
    message.textContent = "Login successful!";
    message.classList.add("success");

    //save current user to local storage
    localStorage.setItem("loggedInUser", JSON.stringify(currentUser));
    form.reset();
    window.location.href = "../dashboard/index.html";
})