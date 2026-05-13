import { supabase } from './supabase.js'

const { data: { user } } = await supabase.auth.getUser();

if (!user) {
    window.location.href = '../html/login.html';
} else {
    const username = user.user_metadata.username || user.email;

    document.getElementById('usernameDisplay').textContent = username;
    document.getElementById('cardUsername').textContent = username;
    document.getElementById('cardEmail').textContent = user.email;
    document.getElementById('cardStatus').textContent = 'Active ✅';

    const joinDate = new Date(user.created_at);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('cardDate').textContent = joinDate.toLocaleDateString('en-MY', options);

    document.getElementById('logoutBtn').addEventListener('click', async function() {
        await supabase.auth.signOut();
        window.location.href = '../html/login.html';
    });
}
