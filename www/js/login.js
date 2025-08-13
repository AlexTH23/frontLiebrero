(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const API_URL = "https://liebrero-st86n.ondigitalocean.app";

// Elementos del formulario
const btnIniciarSesion = document.getElementById('loginBtn');
const inputEmail = document.getElementById('loginEmail');
const inputPassword = document.getElementById('loginPassword');

// Mensajes de estado
const errorEmail = document.getElementById('loginEmailError');
const errorPassword = document.getElementById('loginPasswordError');
const mensajeExito = document.getElementById('loginSuccess'); // opcional, puedes eliminar si no existe

// Ocultar mensajes
function ocultarMensajes() {
  [errorEmail, errorPassword, mensajeExito].forEach(el => {
    if (el) el.style.display = 'none';
  });
}

// Mostrar error específico
function mostrarError(key) {
  if (key === 'email' && errorEmail) errorEmail.style.display = 'block';
  if (key === 'password' && errorPassword) errorPassword.style.display = 'block';
}

// Toggle de contraseña
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

// Configurar toggle para contraseña
configurarTogglePassword('loginPassword', 'loginPasswordToggle');

btnIniciarSesion.addEventListener('click', async function (e) {
  e.preventDefault();
  ocultarMensajes();

  const correo = inputEmail.value.trim();
  const password = inputPassword.value.trim();

  let valido = true;

  if (!correo || !/\S+@\S+\.\S+/.test(correo)) {
    mostrarError('email');
    valido = false;
  }
  if (!password || password.length < 6) {
    mostrarError('password');
    valido = false;
  }

  if (!valido) return;

  // Mostrar estado de carga
  btnIniciarSesion.disabled = true;
  btnIniciarSesion.textContent = 'Iniciando...';

  try {
    const respuesta = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: correo, password })
    });

    // Intentar parsear JSON
    let datos;
    try {
      datos = await respuesta.json();
    } catch (err) {
      datos = null;
    }

    if (!respuesta.ok) {
      const mensaje = datos?.mensaje || 'Error al iniciar sesión';
      alert(mensaje);
      return;
    }

    // Guardar token JWT si existe
    const token = datos?.token || datos?.jwt || null;
    if (token) {
      localStorage.setItem('token', token);
    }

    // Opcional: storing user info si la API lo devuelve
    // localStorage.setItem('usuario', JSON.stringify(datos.usuario || {}));

    // Redireccionar a la biblioteca (o donde quieras)
    if (typeof window !== 'undefined') {
      window.location.href = "inicio.html";
    }

  } catch (error) {
    alert('Error de conexión: ' + (error?.message ?? 'Desconocido'));
  } finally {
    btnIniciarSesion.disabled = false;
    btnIniciarSesion.textContent = 'Iniciar Sesión';
  }
});
  });
})();

