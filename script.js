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
      window.location.href = '/index.html';

  document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const formData = {
    username: document.getElementById('loginUsername').value,
    password: document.getElementById('loginPassword').value
  };

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error('Login error');
    }

    alert('Login successful!');
    window.location.href = '/index.html';

  } catch (error) {
    console.error(error);
    alert('Login error. Please check your username and password.');
  }
});

          
                                                           
