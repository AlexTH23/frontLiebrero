// Using a reliable CORS proxy service
const CORS_PROXY = 'https://corsproxy.io/?';
const API_BASE_URL = 'https://liebrero-st86n.ondigitalocean.app/libros';
const FULL_API_URL = CORS_PROXY + encodeURIComponent(API_BASE_URL);

async function savePost() {
    console.log("Función savePost ejecutándose");

    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const descripcion = document.getElementById('txdescripcion').value;
    const genero = document.getElementById('genero').value;
    const idioma = document.getElementById('idioma').value;
    const anoPublicacion = document.getElementById('anoPublicacion').value;
    const portadaJSON = document.getElementById('portada').value;
    const archivoJSON = document.getElementById('archivo').value;

    if (!titulo.trim() || !descripcion.trim()) {
        alert('Título y descripción son obligatorios');
        return;
    }

    const postData = { 
        titulo: titulo, 
        autor: autor,
        descripcion: descripcion, 
        genero: genero, 
        idioma: idioma, 
        anoPublicacion: parseInt(anoPublicacion) || 2024, 
        portadaJSON: portadaJSON, 
        archivoJSON: archivoJSON
    };

    console.log("Datos a enviar:", postData);

    try {
        console.log("Enviando datos a:", API_BASE_URL);

        const res = await fetch(FULL_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        console.log("Response status:", res.status);
        console.log("Response headers:", res.headers);
        
        const responseText = await res.text();
        console.log("Raw response:", responseText);
        
        let data;
        try {
            data = JSON.parse(responseText);
            console.log("Parsed response:", data);
        } catch (e) {
            console.error("Failed to parse JSON:", e);
            throw new Error(`Invalid JSON response: ${responseText}`);
        }
        
        if (!res.ok) {
            throw new Error(`Error del servidor: ${res.status} - ${responseText}`);
        }
        
        alert('Libro creado exitosamente');
        
        // Limpiar el formulario después de guardar
        clearForm();
        
    } catch (error) {
        console.error('Error en savePost:', error);
        alert('Error al guardar el libro: ' + error.message);
    }
}

function clearForm() {
    document.getElementById('titulo').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('txdescripcion').value = '';
    document.getElementById('genero').value = '';
    document.getElementById('idioma').value = '';
    document.getElementById('anoPublicacion').value = '';
    document.getElementById('portada').value = '';
    document.getElementById('archivo').value = '';
}

// Función temporal para reemplazar showMainAppScreen
function showMainAppScreen() {
    console.log("showMainAppScreen llamada - implementar según necesites");
    clearForm();
}

// Función para verificar todos los libros en la base de datos
async function verifyBooks() {
    console.log("Verificando libros en la base de datos...");
    
    try {
        const res = await fetch(FULL_API_URL);
        console.log("GET Response status:", res.status);
        
        const responseText = await res.text();
        console.log("GET Raw response:", responseText);
        
        let data;
        try {
            data = JSON.parse(responseText);
            console.log("Libros encontrados:", data);
            
            // Handle different API response structures
            let booksArray = [];
            if (Array.isArray(data)) {
                booksArray = data;
            } else if (data && data.libros && Array.isArray(data.libros)) {
                booksArray = data.libros;
            } else if (data && data.books && Array.isArray(data.books)) {
                booksArray = data.books;
            } else if (data && Array.isArray(data.data)) {
                booksArray = data.data;
            } else {
                console.warn("Unexpected API response structure:", data);
                booksArray = [];
            }
            
            // Mostrar los libros en el HTML
            displayBooks(booksArray);
            
        } catch (e) {
            console.error("Failed to parse GET response:", e);
            alert("Error al verificar libros: " + responseText);
            document.getElementById('booksList').innerHTML = '<p>Error al cargar los libros.</p>';
        }
        
    } catch (error) {
        console.error("Error al verificar libros:", error);
        alert("Error al conectar con la API: " + error.message);
        document.getElementById('booksList').innerHTML = '<p>Error de conexión.</p>';
    }
}

// Función para mostrar los libros en el HTML
function displayBooks(books) {
    const booksList = document.getElementById('booksList');
    
    // Ensure books is an array
    if (!Array.isArray(books)) {
        console.error("Expected array but got:", typeof books, books);
        booksList.innerHTML = '<p>Error: Formato de datos incorrecto.</p>';
        return;
    }
    
    if (books.length === 0) {
        booksList.innerHTML = '<p>No se encontraron libros en la base de datos.</p>';
        return;
    }
    
    let html = '<div style="display: grid; gap: 10px;">';
    
    books.forEach(book => {
        if (book && typeof book === 'object') {
            html += `
                <div style="border: 1px solid #ddd; padding: 10px; border-radius: 5px; background-color: #f9f9f9;">
                    <h4>${book.titulo || 'Sin título'}</h4>
                    <p><strong>Autor:</strong> ${book.autor || 'Desconocido'}</p>
                    <p><strong>Género:</strong> ${book.genero || 'No especificado'}</p>
                    <p><strong>Idioma:</strong> ${book.idioma || 'No especificado'}</p>
                    <p><strong>Año:</strong> ${book.anoPublicacion || 'No especificado'}</p>
                    <p><strong>Descripción:</strong> ${book.descripcion || 'Sin descripción'}</p>
                </div>
            `;
        }
    });
    
    html += '</div>';
    booksList.innerHTML = html;
}

// Función para buscar libro por título
async function searchBookByTitle() {
    const tituloInput = document.getElementById('tituloBusqueda');
    const titulo = tituloInput.value.trim();
    
    if (!titulo) {
        alert('Por favor ingrese un título para buscar');
        return;
    }
    
    console.log(`Buscando libro con título: ${titulo}`);
    
    // Mostrar mensaje de carga
    document.getElementById('searchResult').innerHTML = '<p>Buscando libro...</p>';
    
    try {
        // Construir URL específica para búsqueda por título
        const searchUrl = `https://liebrero-st86n.ondigitalocean.app/libros/titulo/${encodeURIComponent(titulo)}`;
        const fullSearchUrl = `https://corsproxy.io/?${encodeURIComponent(searchUrl)}`;
        
        console.log("URL de búsqueda:", searchUrl);
        
        const res = await fetch(fullSearchUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        const responseText = await res.text();
        console.log("Respuesta de búsqueda:", responseText);
        
        if (!res.ok) {
            throw new Error(`Error del servidor: ${res.status}`);
        }
        
        let data;
        try {
            data = JSON.parse(responseText);
            console.log("Libro encontrado:", data);
            
            // Handle different response formats
            let bookData = data;
            if (data.libros && Array.isArray(data.libros) && data.libros.length > 0) {
                bookData = data.libros[0]; // Take first book from libros array
            } else if (Array.isArray(data) && data.length > 0) {
                bookData = data[0]; // Take first book if array
            } else if (data.libro) {
                bookData = data.libro;
            } else if (data.book) {
                bookData = data.book;
            }
            
            // Mostrar resultado de búsqueda
            displaySearchResult(bookData);
            
        } catch (e) {
            console.error("Error al parsear respuesta:", e);
            document.getElementById('searchResult').innerHTML = '<p>No se encontró ningún libro con ese título.</p>';
        }
        
    } catch (error) {
        console.error("Error al buscar libro:", error);
        document.getElementById('searchResult').innerHTML = `<p>Error al buscar libro: ${error.message}</p>`;
    }
}

// Función para mostrar resultado de búsqueda
function displaySearchResult(book) {
    console.log("displaySearchResult called with:", book);
    const searchResult = document.getElementById('searchResult');
    console.log("searchResult element:", searchResult);
    
    if (!searchResult) {
        console.error("ERROR: searchResult element not found!");
        return;
    }
    
    if (!book || typeof book !== 'object') {
        console.log("No book found or invalid book data");
        searchResult.innerHTML = '<p style="color: red;">No se encontró ningún libro con ese título.</p>';
        return;
    }
    
    // Ensure we have valid book data
    const bookInfo = {
        titulo: book.titulo || book.title || 'Sin título',
        autor: book.autor || book.author || 'Desconocido',
        genero: book.genero || book.genre || 'No especificado',
        idioma: book.idioma || book.language || 'No especificado',
        anoPublicacion: book.anoPublicacion || book.year || book.publicationYear || 'No especificado',
        descripcion: book.descripcion || book.description || 'Sin descripción'
    };
    
    console.log("Displaying book:", bookInfo);
    
    let html = `
        <div style="border: 2px solid #007bff; padding: 15px; border-radius: 8px; background-color: #e7f3ff; margin-top: 10px;">
            <h3 style="color: #007bff; margin-top: 0;">📚 Libro Encontrado</h3>
            <h4 style="color: #333; margin: 10px 0;">${bookInfo.titulo}</h4>
            <p><strong>Autor:</strong> ${bookInfo.autor}</p>
            <p><strong>Género:</strong> ${bookInfo.genero}</p>
            <p><strong>Idioma:</strong> ${bookInfo.idioma}</p>
            <p><strong>Año:</strong> ${bookInfo.anoPublicacion}</p>
            <p><strong>Descripción:</strong> ${bookInfo.descripcion}</p>
        </div>
    `;
    
    console.log("Setting HTML:", html);
    searchResult.innerHTML = html;
    console.log("HTML set successfully");
}

// Función de prueba para verificar que el display funciona
function testDisplay() {
    console.log("Testing display...");
    const testBook = {
        titulo: "Libro de Prueba",
        autor: "Autor de Prueba",
        genero: "Ficción",
        idioma: "Español",
        anoPublicacion: 2024,
        descripcion: "Este es un libro de prueba"
    };
    displaySearchResult(testBook);
}

// Función para actualizar ícono del botón de modo oscuro en index.html
function updateDarkModeIcon() {
    const darkModeBtn = document.getElementById('darkModeBtn');
    if (darkModeBtn) {
        const icon = darkModeBtn.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.className = 'fas fa-sun';
            darkModeBtn.title = 'Cambiar a modo claro';
        } else {
            icon.className = 'fas fa-moon';
            darkModeBtn.title = 'Cambiar a modo oscuro';
        }
    }
}

// Actualizar ícono cuando cambie el modo
document.addEventListener('DOMContentLoaded', () => {
    // Esperar a que el darkModeManager esté listo
    setTimeout(updateDarkModeIcon, 100);
});

// Escuchar cambios en el modo oscuro
document.addEventListener('darkModeChanged', updateDarkModeIcon);
