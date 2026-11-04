const form = document.getElementById("loginForm");
const message = document.getElementById("message");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.removeItem("loggedInUser");

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    
    const users= JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = users.find((user) => user.email === email && user.password === password);
    console.log(currentUser);

    if (!currentUser) {
        message.textContent = "Invalid email or password.";
        message.classList.add("error");
        return;
    }
    message.textContent = "Login successful!";
    message.classList.add("success");

    localStorage.setItem("loggedInUser", JSON.stringify(currentUser));

    form.reset();
})