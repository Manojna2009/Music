document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    // Retrieve existing users from localStorage or initialize an empty array
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the username or email already exists
    const userExists = users.some(user => user.username === username || user.email === email);
    if (userExists) {
        alert('Username or email already exists!');
        return;
    }

    // Add the new user to the list
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! Please log in.');
    window.location.href = 'login.html';
});
