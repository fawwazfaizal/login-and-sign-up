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

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', async function() {
        await supabase.auth.signOut();
        window.location.href = '../html/login.html';
    });

    // Delete own account
    document.getElementById('deleteAccountBtn').addEventListener('click', async function() {
        const confirm = window.confirm(
            '⚠️ Are you sure you want to delete your account?\nThis cannot be undone!'
        );
        if (!confirm) return;

        const secondConfirm = window.confirm(
            '⚠️ Last warning!\nAll your data will be permanently deleted!'
        );
        if (!secondConfirm) return;

        // Delete from auth using SQL function
        const { error } = await supabase.rpc('delete_user', { user_id: user.id })

        if (error) {
            alert('❌ ' + error.message);
            return;
        }

        await supabase.auth.signOut();
        alert('✅ Account deleted successfully!');
        window.location.href = '../html/login.html';
    });
}
