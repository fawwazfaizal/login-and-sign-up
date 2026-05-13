document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    let message = document.getElementById('message');
    if (!message) {
        message = document.createElement('p');
        message.id = 'message';
        document.querySelector('form').prepend(message);
    }

    // Check admin first
    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('loggedInAdmin', JSON.stringify({ username }));
        alert('✅ Welcome ' + username + '!');
        window.location.href = '../html/homepage.html';
        return;
    }

    // Check normal user
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = existingUsers.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        alert('✅ Login successful! Welcome, ' + username + '!');
        window.location.href = '../html/userpage.html';
    } else {
        message.style.color = 'red';
        message.textContent = '❌ Invalid username or password!';
    }
});
