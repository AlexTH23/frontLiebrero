(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const API_URL = "https://liebrero-st86n.ondigitalocean.app";
    const btnRegistrar = document.getElementById('registerBtn');

// Mensajes de estado
const mensajeExito = document.getElementById('registerSuccess');
const errores = {
  firstName: document.getElementById('firstNameError'),
  lastName: document.getElementById('lastNameError'),
  email: document.getElementById('emailError'),
  phone: document.getElementById('phoneError'),
  password: document.getElementById('passwordError'),
  confirmPassword: document.getElementById('confirmPasswordError'),
};

// Ocultar todos los mensajes de error
function ocultarErrores() {
  Object.values(errores).forEach(el => {
    if (el) el.style.display = 'none';
  });
  if (mensajeExito) mensajeExito.style.display = 'none';
}

function mostrarError(clave) {
  const el = errores[clave];
  if (el) el.style.display = 'block';
}

// Controles de visibilidad de contraseña (opcional)
function configurarTogglePassword(entradaId, toggleBtnId) {
  const input = document.getElementById(entradaId);
  const btn = document.getElementById(toggleBtnId);
  if (!input || !btn) return;
  btn.addEventListener('click', function () {
    const modoTexto = input.type === 'text';
    input.type = modoTexto ? 'password' : 'text';
    btn.innerHTML = modoTexto
      ? '<i class="fas fa-eye-slash"></i>'
      : '<i class="fas fa-eye"></i>';
  });
}

// Configurar toggles de contraseña
configurarTogglePassword('registerPassword', 'registerPasswordToggle');
configurarTogglePassword('registerConfirmPassword', 'confirmPasswordToggle');

btnRegistrar.addEventListener('click', async function (e) {
  e.preventDefault();
  ocultarErrores();

  const nombre = document.getElementById('registerFirstName')?.value?.trim() || '';
  const apellido = document.getElementById('registerLastName')?.value?.trim() || '';
  const email = document.getElementById('registerEmail')?.value?.trim() || '';
  const telefono = document.getElementById('registerPhone')?.value?.trim() || '';
  const password = document.getElementById('registerPassword')?.value?.trim() || '';
  const confirmPassword = document.getElementById('registerConfirmPassword')?.value?.trim() || '';

  let valido = true;

  // Validaciones
  if (!nombre) { mostrarError('firstName'); valido = false; }
  if (!apellido) { mostrarError('lastName'); valido = false; }
  if (!email || !/\S+@\S+\.\S+/.test(email)) { mostrarError('email'); valido = false; }
  if (!telefono) { mostrarError('phone'); valido = false; }
  if (!password || password.length < 6) { mostrarError('password'); valido = false; }
  if (password !== confirmPassword) { mostrarError('confirmPassword'); valido = false; }

  if (!valido) return;

  // Mostrar cargando
  btnRegistrar.disabled = true;
  btnRegistrar.textContent = 'Registrando...';

  try {
    const res = await fetch(`${API_URL}/auth/registro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre,
        apellido,
        email,
        telefono,
        password
      })
    });

    // Intentar parsear JSON; si falla, tratar como error genérico
    let data;
    try {
      data = await res.json();
    } catch (err) {
      data = null;
    }

    if (!res.ok) {
      const mensaje = data?.mensaje || 'Error al registrar';
      alert(mensaje);
      return;
    }

    if (mensajeExito) mensajeExito.style.display = 'block';
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);

  } catch (error) {
    alert('Error de conexión: ' + (error?.message ?? 'Desconocido'));
  } finally {
    btnRegistrar.disabled = false;
    btnRegistrar.textContent = 'Registrarse';
  }
});
  });
})();