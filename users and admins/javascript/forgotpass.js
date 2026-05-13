const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;

    // Save email to show on next page
    localStorage.setItem("resetEmail", email);

    // Redirect to email confirmation page
    window.location.href = "emailconfirmation.html";
});