import { supabase } from './supabase.js'

// Handle the token from email link first
supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'PASSWORD_RECOVERY') {
        // User came from email link, show the form
        document.querySelector('form').style.display = 'block';
    }
});

// Hide form initially until token is verified
document.querySelector('form').style.display = 'none';

document.querySelector('form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const message = document.getElementById('message');

    if (newPassword !== confirmPassword) {
        message.style.color = 'red';
        message.textContent = '❌ Passwords do not match!';
        return;
    }

    if (newPassword.length < 6) {
        message.style.color = 'red';
        message.textContent = '❌ Password must be at least 6 characters!';
        return;
    }

    const { error } = await supabase.auth.updateUser({
        password: newPassword
    })

    if (error) {
        message.style.color = 'red';
        message.textContent = '❌ ' + error.message;
        return;
    }

    message.style.color = 'green';
    message.textContent = '✅ Password changed successfully!';
    localStorage.removeItem('resetEmail');

    setTimeout(() => {
        window.location.href = '../html/login.html';
    }, 1500);
});
