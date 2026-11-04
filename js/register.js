//select my elements

const form = document.getElementById("registerForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value;

    //validate form inputs
    if (!name || !email || !password) {
        console.log("Please fill in all fields");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find((user) => user.email.toLowerCase() === email.toLowerCase());

    if (userExists) {
        alert("Email already exists");
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

    alert("Registration successful! You can now log in.");

    form.reset();

    window.location.href = "login.html";
})