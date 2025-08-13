const PROXY = '';
const API_BASE_URL = 'https://liebrero-st86n.ondigitalocean.app/libros';

async function savePost() {
    console.log("Función savePost ejecutándose");

    const title = document.getElementById('titulo').value;
    const descripc = document.getElementById('txdescripcion').value;
    const genero = document.getElementById('genero').value;
    const idioma = document.getElementById('idioma').value;
    const anoPublicacion = document.getElementById('anoPublicacion').value;
    const portada = document.getElementById('portada').value;
    const archivo = document.getElementById('archivo').value;

    if (!title.trim() || !descripc.trim()) {
        alert('Título y descripción son obligatorios');
        return;
    }

    const postData = { 
        titulo: title, 
        descripcion: descripc, 
        genero: genero, 
        idioma: idioma, 
        anoPublicacion: anoPublicacion, 
        portada: portada, 
        archivo: archivo
    };

    try {
        console.log("Enviando datos a:", API_BASE_URL);

        const res = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        if (!res.ok) throw new Error('Error en la respuesta del servidor');

        const data = await res.json();
        alert('Libro creado exitosamente');
        showMainAppScreen();

    } catch (error) {
        console.error('Error en savePost:', error);
        alert('Error al guardar el libro: ' + error.message);
    }
}