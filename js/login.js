const users = [
    { username: 'user1', password: 'password1', email: 'user1@example.com' },
    { username: 'user2', password: 'password2', email: 'user2@example.com' }
];

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        document.cookie = `username=${user.username}; email=${user.email}; loggedIn=true; max-age=3600; path=/`;
        window.location.href = 'index.html';
    } else {
        alert('Invalid credentials');
    }
});
