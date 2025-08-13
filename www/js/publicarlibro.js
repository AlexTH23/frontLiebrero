document.addEventListener('DOMContentLoaded', function () {
    const API_URL = "https://liebrero-st86n.ondigitalocean.app"; // Cambia por tu dominio o IP local
    const form = document.getElementById('publicarLibroForm');
    const mensaje = document.getElementById('publicarMensaje');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        mensaje.textContent = '';

        const titulo = document.getElementById('titulo').value.trim();
        const autor = document.getElementById('autor').value.trim();
        const descripcion = document.getElementById('descripcion').value.trim();
        const genero = document.getElementById('genero').value.trim();
        const idioma = document.getElementById('idioma').value;
        const anoPublicacion = document.getElementById('anoPublicacion').value.trim();
        const portadaInput = document.getElementById('portada');
        const archivoInput = document.getElementById('archivo');

        if (!titulo || !descripcion) {
            mostrarError('Título y descripción son obligatorios');
            return;
        }
        if (!portadaInput.files[0]) {
            mostrarError('Selecciona una imagen de portada');
            return;
        }
        if (!archivoInput.files[0]) {
            mostrarError('Selecciona un archivo PDF');
            return;
        }

        mostrarCargando('Subiendo libro...');

        try {
            const portadaBase64 = await fileToBase64(portadaInput.files[0]);
            const archivoBase64 = await fileToBase64(archivoInput.files[0]);

            const postData = {
                titulo,
                autor,
                descripcion,
                genero,
                idioma,
                anoPublicacion: parseInt(anoPublicacion) || 2024,
                portadaJSON: portadaBase64,
                archivoJSON: archivoBase64
            };

            const res = await fetch(`${API_URL}/libros`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            const textResponse = await res.text();
            let data;
            try {
                data = JSON.parse(textResponse);
            } catch {
                data = null;
            }

            if (!res.ok) {
                mostrarError(`Error al guardar el libro: ${(data && data.message) || textResponse}`);
                return;
            }

            mostrarExito('Libro publicado exitosamente');
            form.reset();
        } catch (error) {
            mostrarError('Error al guardar el libro: ' + error.message);
        }
    });

    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result); // Incluye el data:image/...;base64
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    function mostrarError(msg) {
        mensaje.textContent = msg;
        mensaje.style.color = '#dc3545';
    }

    function mostrarExito(msg) {
        mensaje.textContent = msg;
        mensaje.style.color = '#28a745';
    }

    function mostrarCargando(msg) {
        mensaje.textContent = msg;
        mensaje.style.color = '#007bff';
    }
});
