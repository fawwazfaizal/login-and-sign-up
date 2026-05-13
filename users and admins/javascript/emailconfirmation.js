// Get the email from localStorage and display it
const email = localStorage.getItem("resetEmail");
const emailDisplay = document.getElementById("userEmail");

if (email) {
    emailDisplay.textContent = email;
} else {
    emailDisplay.textContent = "your email";
}