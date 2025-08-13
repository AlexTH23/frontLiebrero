document.addEventListener('DOMContentLoaded', function() {
    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const backBtn = document.getElementById('backBtn');
    const successMessage = document.getElementById('successMessage');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    
    // Guardar cambios
    saveBtn.addEventListener('click', function() {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        
        // Actualizar perfil
        userName.textContent = `${firstName} ${lastName}`;
        userEmail.textContent = email;
        
        // Mostrar mensaje de éxito con animación
        successMessage.style.display = 'block';
        
        // Ocultar mensaje después de 3 segundos
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
        
        // Efecto visual en botón
        this.classList.add('btn-clicked');
        setTimeout(() => {
            this.classList.remove('btn-clicked');
        }, 300);
    });
    
    // Botón de cancelar
    cancelBtn.addEventListener('click', function() {
        // Restaurar valores originales
        document.getElementById('firstName').value = 'Carlos';
        document.getElementById('lastName').value = 'García';
        document.getElementById('email').value = 'carlos@biblioteca.com';
        document.getElementById('phone').value = '+34 678 901 234';
        
        // Ocultar mensaje si está visible
        successMessage.style.display = 'none';
        
        // Efecto visual
        this.classList.add('btn-clicked');
        setTimeout(() => {
            this.classList.remove('btn-clicked');
        }, 300);
    });
    
    // Botón de volver
    backBtn.addEventListener('click', function() {
        window.location.href = 'inicio.html';
    });
    
    // Botón de cambiar contraseña
    document.querySelector('.btn-change-password').addEventListener('click', function() {
        // Redirigir a la pantalla de cambio de contraseña
    });
    
    // Botón de cambiar foto
    document.querySelector('.change-photo').addEventListener('click', function() {
        // Seleccionar nueva foto de perfil
    });
});