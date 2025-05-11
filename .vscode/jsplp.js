
const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const strengthBar = document.getElementById('strengthBar');

// Enterprise email validation
const isValidEnterpriseEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email) && email.endsWith('.com');
};

// Password strength calculator
const calculateStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
};

// Real-time validation
passwordInput.addEventListener('input', () => {
    const strength = calculateStrength(passwordInput.value);
    strengthBar.style.width = `${strength}%`;
    
    if (passwordInput.value.length < 8) {
        document.getElementById('passwordError').style.display = 'block';
    } else {
        document.getElementById('passwordError').style.display = 'none';
    }
});

emailInput.addEventListener('input', () => {
    document.getElementById('emailError').style.display = 
        isValidEnterpriseEmail(emailInput.value) ? 'none' : 'block';
});

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isEmailValid = isValidEnterpriseEmail(emailInput.value);
    const isPasswordValid = passwordInput.value.length >= 8;

    if (isEmailValid && isPasswordValid) {
        document.getElementById('successMessage').style.display = 'block';
        form.reset();
        strengthBar.style.width = '0%';
        
        // Simulate API call
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 2000);
    }
});
