import { supabase } from './supabase.js'

document.querySelector('form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;
    const captcha = document.getElementById('captcha').checked;
    const message = document.getElementById('message');

    if (!captcha) {
        message.style.color = 'red';
        message.textContent = '❌ Please verify you are not a robot!';
        return;
    }
    if (!terms) {
        message.style.color = 'red';
        message.textContent = '❌ Please agree to the Terms and Conditions!';
        return;
    }
    if (password !== confirmPassword) {
        message.style.color = 'red';
        message.textContent = '❌ Passwords do not match!';
        return;
    }
    if (password.length < 6) {
        message.style.color = 'red';
        message.textContent = '❌ Password must be at least 6 characters!';
        return;
    }

    // Supabase signup only - trigger handles users table automatically!
    const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
        data: { username: username },
        emailRedirectTo: 'http://127.0.0.1:5500/users%20and%20admins/html/login.html'
        }
    })

    if (error) {
        message.style.color = 'red';
        message.textContent = '❌ ' + error.message;
        return;
    }

    // Success
    message.style.color = 'green';
    message.textContent = '✅ Account created! Redirecting...';
    setTimeout(() => {
        window.location.href = '../html/userpage.html';
    }, 1500);
});