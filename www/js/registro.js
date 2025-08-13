        // Elementos DOM
        const registerBtn = document.getElementById('registerBtn');
        const registerPasswordToggle = document.getElementById('registerPasswordToggle');
        const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
        
        // Mensajes de error
        const firstNameError = document.getElementById('firstNameError');
        const lastNameError = document.getElementById('lastNameError');
        const emailError = document.getElementById('emailError');
        const phoneError = document.getElementById('phoneError');
        const passwordError = document.getElementById('passwordError');
        const confirmPasswordError = document.getElementById('confirmPasswordError');
        const registerSuccess = document.getElementById('registerSuccess');
        
        // Alternar visibilidad de contraseña
        function setupPasswordToggle(input, toggleBtn) {
            toggleBtn.addEventListener('click', function() {
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
            });
        }
        
        setupPasswordToggle(document.getElementById('registerPassword'), registerPasswordToggle);
        setupPasswordToggle(document.getElementById('registerConfirmPassword'), confirmPasswordToggle);
        
        // Validar email
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        // Validar teléfono
        function validatePhone(phone) {
            const re = /^[0-9\-\+\s\(\)]{7,15}$/;
            return re.test(phone);
        }
        
        // Validar contraseña
        function validatePassword(password) {
            return password.length >= 6;
        }
        
        // Resetear errores
        function resetFormErrors() {
            firstNameError.style.display = 'none';
            lastNameError.style.display = 'none';
            emailError.style.display = 'none';
            phoneError.style.display = 'none';
            passwordError.style.display = 'none';
            confirmPasswordError.style.display = 'none';
            registerSuccess.style.display = 'none';
        }
        
        // Registro
        registerBtn.addEventListener('click', function() {
            resetFormErrors();
            let isValid = true;
            
            // Validar nombre
            const firstName = document.getElementById('registerFirstName').value;
            if (!firstName.trim()) {
                firstNameError.style.display = 'block';
                isValid = false;
            }
            
            // Validar apellido
            const lastName = document.getElementById('registerLastName').value;
            if (!lastName.trim()) {
                lastNameError.style.display = 'block';
                isValid = false;
            }
            
            // Validar email
            const email = document.getElementById('registerEmail').value;
            if (!validateEmail(email)) {
                emailError.style.display = 'block';
                isValid = false;
            }
            
            // Validar teléfono
            const phone = document.getElementById('registerPhone').value;
            if (!validatePhone(phone)) {
                phoneError.style.display = 'block';
                isValid = false;
            }
            
            // Validar contraseña
            const password = document.getElementById('registerPassword').value;
            if (!validatePassword(password)) {
                passwordError.style.display = 'block';
                isValid = false;
            }
            
            // Validar confirmación de contraseña
            const confirmPassword = document.getElementById('registerConfirmPassword').value;
            if (password !== confirmPassword) {
                confirmPasswordError.style.display = 'block';
                isValid = false;
            }
            
            if (isValid) {
                // Simular registro exitoso
                registerSuccess.style.display = 'block';
                
                // Aquí iría la lógica para guardar el usuario en una base de datos real
                const user = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phone: phone,
                    password: password
                };
                
                console.log("Usuario registrado:", user);
                
                // Simular redirección después de 2 segundos
                setTimeout(() => {
                    // En un caso real, redirigir a la biblioteca
                    // window.location.href = "biblioteca.html";
                }, 2000);
            }
        });