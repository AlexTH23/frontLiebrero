        // Elementos DOM
        const backBtn = document.getElementById('backBtn');
        const configView = document.getElementById('configView');
        const feedbackView = document.getElementById('feedbackView');
        const feedbackBtn = document.getElementById('feedbackBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const sendFeedbackBtn = document.getElementById('sendFeedbackBtn');
        const navProfile = document.getElementById('navProfile');
        const navItems = document.querySelectorAll('.nav-item');
        const darkModeSwitch = document.getElementById('darkModeSwitch');
        
        // Mostrar vista de configuración por defecto
        configView.style.display = 'flex';
        
        // Función para cambiar vista
        function showView(view) {
            // Ocultar todas las vistas
            configView.style.display = 'none';
            feedbackView.style.display = 'none';
            
            // Mostrar la vista seleccionada
            if (view === 'config') {
                configView.style.display = 'flex';
                document.querySelector('.title').textContent = 'CONFIGURACIÓN';
            } else if (view === 'feedback') {
                feedbackView.style.display = 'flex';
                document.querySelector('.title').textContent = 'DANOS TU OPINIÓN';
            }
        }
        
        // Botón de retroceso
        backBtn.addEventListener('click', function() {
            if (feedbackView.style.display === 'flex') {
                showView('config');
            } else {
                window.location.href = 'inicio.html';
            }
        });
        
        // Botón "Danos tu opinión"
        feedbackBtn.addEventListener('click', function() {
            showView('feedback');
        });
        
        // Botón "Cerrar sesión"
        logoutBtn.addEventListener('click', function() {
            if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
                alert('Sesión cerrada con éxito');
                // Aquí iría la lógica real de cierre de sesión
            }
        });
        
        // Enviar opinión
        sendFeedbackBtn.addEventListener('click', function() {
            const email = document.getElementById('emailInput').value;
            const subject = document.getElementById('subjectInput').value;
            const comments = document.getElementById('commentsInput').value;
            
            if (!email || !subject || !comments) {
                alert('Por favor completa todos los campos');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Por favor ingresa un email válido');
                return;
            }
            
            // Simular envío de feedback
            alert(`¡Gracias por tu opinión!\n\nEmail: ${email}\nAsunto: ${subject}\nComentarios: ${comments}\n\nTu feedback ha sido enviado.`);
            showView('config');
        });
        
        // Validar email
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        // Navegación inferior
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remover clase activa de todos
                navItems.forEach(el => {
                    el.classList.remove('active');
                });
                
                // Agregar clase activa al seleccionado
                this.classList.add('active');
                
                // Cambiar vista según selección
                if (this.id === 'navProfile') {
                    showView('config');
                } else if (this.id === 'navConfig') {
                    // El botón de configuración ya tiene onclick en el HTML
                } else {
                    // Navegar a otra sección
                }
            });
        });
        
        // Modo oscuro
        darkModeSwitch.addEventListener('change', function() {
            if (this.checked) {
                document.body.style.backgroundColor = '#1a1a1a';
                document.body.style.color = '#e0e0e0';
                document.querySelectorAll('.config-section, .feedback-section').forEach(el => {
                    el.style.background = '#2d2d2d';
                    el.style.color = '#e0e0e0';
                });
                document.querySelectorAll('.config-header').forEach(el => {
                    el.style.background = '#252525';
                    el.style.color = '#d0d0d0';
                });
                document.querySelectorAll('.form-input').forEach(el => {
                    el.style.background = '#333';
                    el.style.color = '#e0e0e0';
                    el.style.borderColor = '#444';
                });
            } else {
                document.body.style.backgroundColor = '#f5f1e8';
                document.body.style.color = '#3a2c1e';
                document.querySelectorAll('.config-section, .feedback-section').forEach(el => {
                    el.style.background = 'white';
                    el.style.color = '#3a2c1e';
                });
                document.querySelectorAll('.config-header').forEach(el => {
                    el.style.background = '#f8f4ed';
                    el.style.color = '#5d4037';
                });
                document.querySelectorAll('.form-input').forEach(el => {
                    el.style.background = '#fcf9f4';
                    el.style.color = '#3a2c1e';
                    el.style.borderColor = '#d7ccc8';
                });
            }
        });
        
        // Editar perfil
        document.getElementById('editProfile').addEventListener('click', function() {
            // Función de editar perfil activada
        });
        
        // Configuraciones adicionales
        document.getElementById('notifications').addEventListener('click', function() {
            // Configuración de notificaciones
        });
        
        document.getElementById('downloads').addEventListener('click', function() {
            // Administrar descargas
        });
        
        document.getElementById('appSettings').addEventListener('click', function() {
            // Configuración de la aplicación
        });