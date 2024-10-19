document.getElementById("signin-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Simple validation for demonstration
    if (email === "user@example.com" && password === "password123") {
        document.getElementById("message").textContent = "Sign in successful!";
        document.getElementById("message").style.color = "green";
        // Redirect to another page or perform any action here
    } else {
        document.getElementById("message").textContent = "Invalid email or password!";
    }
});
