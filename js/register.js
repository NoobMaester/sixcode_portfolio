//select my elements
const form = document.getElementById("registerForm");
const message = document.getElementById("message");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    //validate form inputs
    if (!name || !email || !password) {
        message.textContent = "Please fill in all fields";
        message.classList.add("error");
        return;
    }

    //check if user already exists
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find((user) => user.email.toLowerCase() === email.toLowerCase());
    if (userExists) {
        message.textContent = "Email already exists";
        message.classList.add("error");
        return;
    }

    //create user object
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
    };

    //save user to local storage
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    message.textContent = "Registration successful!";
    message.classList.add("success");

    form.reset();

    window.location.href = "login.html";
})