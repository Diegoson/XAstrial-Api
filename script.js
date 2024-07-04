document.addEventListener('DOMContentLoaded', () => {
      const storedUsername = localStorage.getItem('username');
      const storedPassword = localStorage.getItem('password');

      if (storedUsername && storedPassword) {
        document.getElementById('signupUsername').value = storedUsername;
        document.getElementById('signupPassword').value = storedPassword;
      }
    });

    document.getElementById('signupForm').addEventListener('submit', (event) => {
      event.preventDefault();

      const signupUsername = document.getElementById('signupUsername').value;
      const signupPassword = document.getElementById('signupPassword').value;
      const signupEmail = document.getElementById('signupEmail').value;

      localStorage.setItem('username', signupUsername);
      localStorage.setItem('password', signupPassword);
