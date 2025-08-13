// Elementos DOM
const loginBtn = document.getElementById('loginBtn');
const loginPasswordToggle = document.getElementById('loginPasswordToggle');

// Mensajes de error
const loginEmailError = document.getElementById('loginEmailError');
const loginPasswordError = document.getElementById('loginPasswordError');

// Alternar visibilidad de contraseña
loginPasswordToggle.addEventListener('click', function() {
    const passwordInput = document.getElementById('loginPassword');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
});

// Validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validar contraseña
function validatePassword(password) {
    return password.length >= 6;
}

// Resetear errores
function resetFormErrors() {
    loginEmailError.style.display = 'none';
    loginPasswordError.style.display = 'none';
}

// Login
loginBtn.addEventListener('click', function() {
    resetFormErrors();
    let isValid = true;
    
    // Validar email
    const email = document.getElementById('loginEmail').value;
    if (!validateEmail(email)) {
        loginEmailError.style.display = 'block';
        isValid = false;
    }
    
    // Validar contraseña
    const password = document.getElementById('loginPassword').value;
    if (!validatePassword(password)) {
        loginPasswordError.style.display = 'block';
        isValid = false;
    }
    
    if (isValid) {
        // Simular inicio de sesión exitoso
        // En un caso real, redirigir a la biblioteca
        // window.location.href = "biblioteca.html";
    }
});