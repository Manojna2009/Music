document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('register-username').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check for duplicate username
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        alert('Username already exists! Please choose a different one.');
        return;
    }
    
    // Add the new user to the list
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! Please log in.');
    window.location.href = 'login.html';
});
