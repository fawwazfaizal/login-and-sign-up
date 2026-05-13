document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;
    const captcha = document.getElementById('captcha').checked;
    const message = document.getElementById('message');

    // Check captcha
    if (!captcha) {
        message.textContent = '❌ Please verify you are not a robot!';
        return;
    }

    // Check terms
    if (!terms) {
        message.textContent = '❌ Please agree to the Terms and Conditions!';
        return;
    }

    // Check passwords match
    if (password !== confirmPassword) {
        message.textContent = '❌ Passwords do not match!';
        return;
    }

    // Check password length
    if (password.length < 6) {
        message.textContent = '❌ Password must be at least 6 characters!';
        return;
    }

    // Check if username already exists
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = existingUsers.find(u => u.username === username);
    if (userExists) {
        message.textContent = '❌ Username already taken!';
        return;
    }

    // Save user to localStorage
    existingUsers.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // Success → go to login
    message.style.color = 'green';
    message.textContent = '✅ Account created! Redirecting to login...';
    setTimeout(() => {
        window.location.href = 'userpage.html';
    }, 1500);
});