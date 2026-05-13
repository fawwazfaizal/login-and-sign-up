// Check if admin is logged in
const admin = JSON.parse(localStorage.getItem('loggedInAdmin'));
if (!admin) {
    window.location.href = '../html/login.html';
} else {
    document.getElementById('welcomeMsg').textContent = 'Welcome, ' + admin.username + '!';

    function loadUsers() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const tableBody = document.getElementById('userTable');
        tableBody.innerHTML = '';

        if (users.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="4" class="no-users">No users registered yet.</td></tr>';
            return;
        }

        users.forEach(function(user, index) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.password}</td>
                <td><button class="delete-btn" onclick="window.deleteUser(${index})">Delete</button></td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Make deleteUser global so onclick can access it
    window.deleteUser = function(index) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        loadUsers();
    }

    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('loggedInAdmin');
        window.location.href = '../html/login.html';
    });

    loadUsers();
}