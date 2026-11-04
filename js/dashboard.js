const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));

if (!currentUser) {
    window.location.href = '../login.html';
}

const logoutButton = document.querySelector('.logout');

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = '../login.html';
});