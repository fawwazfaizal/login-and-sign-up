import { supabase } from './supabase.js'

document.querySelector('form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    let message = document.getElementById('message');
    if (!message) {
        message = document.createElement('p');
        message.id = 'message';
        document.querySelector('form').prepend(message);
    }

    // Check admin first
    if (email === 'admin@admin.com' && password === 'admin123') {
        localStorage.setItem('loggedInAdmin', JSON.stringify({ username: 'admin' }));
        alert('✅ Welcome Admin!');
        window.location.href = '../html/homepage.html';
        return;
    }

    // Supabase login
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })

    if (error) {
        message.style.color = 'red';
        message.textContent = '❌ Invalid email or password!';
        return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify(data.user));
    alert('✅ Login successful! Welcome!');
    window.location.href = '../html/userpage.html';
});
