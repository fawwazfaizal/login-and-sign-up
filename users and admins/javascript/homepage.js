import { supabase } from './supabase.js'

const admin = JSON.parse(localStorage.getItem('loggedInAdmin'));
if (!admin) {
    window.location.href = '../html/login.html';
} else {
    document.getElementById('welcomeMsg').textContent = 'Welcome, ' + admin.username + '!';

    async function loadUsers() {
        const { data: users, error } = await supabase
            .from('users')
            .select('*')

        const tableBody = document.getElementById('userTable');
        tableBody.innerHTML = '';

        if (error || !users || users.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="4" class="no-users">No users registered yet.</td></tr>';
            return;
        }

        users.forEach(function(user) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.username || user.email}</td>
                <td>${user.email}</td>
                <td>••••••</td>
                <td><button class="delete-btn" onclick="window.deleteUser('${user.id}')">Delete</button></td>
            `;
            tableBody.appendChild(row);
        });
    }

    window.deleteUser = async function(id) {
    const confirm = window.confirm('Are you sure you want to delete this user?');
    if (!confirm) return;

    // Call the SQL function to delete from auth too!
    const { error } = await supabase.rpc('delete_user', { user_id: id })

    if (error) {
        alert('❌ ' + error.message);
        return;
    }

    alert('✅ User deleted successfully!');
    loadUsers();
}

    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('loggedInAdmin');
        window.location.href = '../html/login.html';
    });

    loadUsers();
}
