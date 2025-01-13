document.addEventListener('DOMContentLoaded', function() {
    const cookies = document.cookie.split(';');
    const usernameCookie = cookies.find(cookie => cookie.trim().startsWith('username='));
    const emailCookie = cookies.find(cookie => cookie.trim().startsWith('email='));

    if (usernameCookie && emailCookie) {
        document.getElementById('username-display').textContent = usernameCookie.split('=')[1];
        document.getElementById('email-display').textContent = emailCookie.split('=')[1];
    } else {
        window.location.href = 'login.html';
    }

    document.getElementById('logout-button').addEventListener('click', function() {
        document.cookie = 'loggedIn=false; max-age=0; path=/';
        window.location.href = 'login.html';
    });
});
