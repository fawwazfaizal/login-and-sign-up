import { supabase } from './supabase.js'

const form = document.querySelector("form");

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:5500/users%20and%20admins/html/changepassword.html'
    })

    if (error) {
        alert('❌ ' + error.message);
        return;
    }

    // Save email to show on next page
    localStorage.setItem("resetEmail", email);

    // Redirect to email confirmation page
    window.location.href = "../html/emailconfirmation.html";
});
