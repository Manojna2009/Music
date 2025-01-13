// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

     // Debugging logs
    console.log('Users from localStorage:', users);
    console.log('Login attempt:', { username, password });    

    // Find the user matching the entered credentials
    const user = users.find(u => u.username === username && u.password === password);

    console.log('User found:', user);

    if (user) {
        // Set cookies for authentication
        document.cookie = `username=${user.username}; max-age=3600; path=/`;
        document.cookie = `email=${user.email}; max-age=3600; path=/`;
        document.cookie = `loggedIn=true; max-age=3600; path=/`;

        // Redirect to the music player page
        window.location.href = 'index.html';
    } else {
        alert('Invalid username or password!');
    }
});

// Utility function to check login status (optional for reuse in other scripts)
function isLoggedIn() {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
    }, {});

    return cookies.loggedIn === 'true';
}

// Redirect to login page if the user is not logged in
if (!isLoggedIn() && !window.location.pathname.endsWith('login.html')) {
    alert('You must log in first!');
    window.location.href = 'login.html';
}
