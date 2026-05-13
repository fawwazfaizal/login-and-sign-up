// Check if user is logged in
const user = JSON.parse(localStorage.getItem('loggedInUser'));
if (!user) {
    window.location.href = '../html/login.html';
} else {
    // Welcome message
    document.getElementById('usernameDisplay').textContent = user.username;

    // Cards
    document.getElementById('cardUsername').textContent = user.username;
    document.getElementById('cardEmail').textContent = user.email;
    document.getElementById('cardStatus').textContent = 'Active ✅';

    // Member since - today's date
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('cardDate').textContent = today.toLocaleDateString('en-MY', options);

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('loggedInUser');
        window.location.href = '../html/login.html';
    });
}