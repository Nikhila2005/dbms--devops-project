// API Configuration
const API_BASE_URL = 'https://dbms-back-iota.vercel.app';

// Signup Form Handler
document.getElementById('signupForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(this));
    
    try {
        const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        
        const result = await res.text();
        alert(result);
        
        if (res.ok) {
            // Redirect to signin page on successful signup
            window.location.href = 'signin.html';
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

// Signin Form Handler
document.getElementById('signinForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(this));
    
    try {
        const res = await fetch(`${API_BASE_URL}/api/auth/signin`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        
        const result = await res.text();
        alert(result);
        
        if (res.ok) {
            // Redirect to dashboard on successful signin
            window.location.href = 'dashboard.html';
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});
