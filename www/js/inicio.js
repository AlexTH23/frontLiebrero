// Elementos DOM
const searchBtn = document.getElementById('searchBtn');
const closeSearch = document.getElementById('closeSearch');
const searchContainer = document.getElementById('searchContainer');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const bookDetail = document.getElementById('bookDetail');
const detailBackBtn = document.getElementById('detailBackBtn');
const navSearch = document.getElementById('navSearch');
const mainContent = document.getElementById('mainContent');
const backBtn = document.getElementById('backBtn');


// Configuración de la API
const CORS_PROXY = 'https://corsproxy.io/?';
const API_BASE_URL = 'https://liebrero-st86n.ondigitalocean.app/libros';
const FULL_API_URL = CORS_PROXY + encodeURIComponent(API_BASE_URL);

// Almacén de libros
let books = {};

// Función para obtener iniciales del título
function getInitials(title) {
    const words = title.split(' ');
    let initials = '';
    for (let i = 0; i < words.length; i++) {
        if (words[i].length > 0) {
            initials += words[i][0];
            if (initials.length >= 2) break;
        }
    }
    return initials.substring(0, 2).toUpperCase();
}

// Función para obtener libros de la API
async function fetchBooks() {
    try {
        // Mostrar mensajes de carga
        document.getElementById('section1').innerHTML = '<div class="loading-section">Cargando libros...</div>';
        document.getElementById('section2').innerHTML = '<div class="loading-section">Cargando libros...</div>';
        
        const response = await fetch(FULL_API_URL);
        if (!response.ok) throw new Error('Error al cargar libros');
        const data = await response.json();
        
        // Procesar respuesta
        let libros = [];
        if (Array.isArray(data)) {
            libros = data;
        } else if (data.libros) {
            libros = data.libros;
        } else if (data.books) {
            libros = data.books;
        }
        
        // Organizar en secciones (primera mitad en sección 1, segunda en sección 2)
        const half = Math.ceil(libros.length / 2);
        const section1 = libros.slice(0, half);
        const section2 = libros.slice(half);
        
        // Crear elementos DOM para los libros
        renderBooks(section1, 'section1');
        renderBooks(section2, 'section2');
        
        // Almacenar libros en objeto global
        libros.forEach(libro => {
            books[libro.id] = {
                title: libro.titulo,
                author: libro.autor,
                description: libro.descripcion,
                initial: getInitials(libro.titulo)
            };
        });
        
    } catch (error) {
        console.error('Error fetching books:', error);
        // Mostrar mensaje de error
        document.getElementById('section1').innerHTML = '<div class="error-section">Error cargando libros</div>';
        document.getElementById('section2').innerHTML = '';
    }
}

// Función para renderizar libros
function renderBooks(libros, sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    section.innerHTML = '';
    
    libros.forEach(libro => {
        const bookElement = document.createElement('div');
        bookElement.className = 'book-item';
        bookElement.setAttribute('data-book', libro.id);
        
        bookElement.innerHTML = `
            <div class="book-cover">
                <div class="book-spine"></div>
                <span>${getInitials(libro.titulo)}</span>
            </div>
            <div class="book-title">${libro.titulo}</div>
        `;
        
        section.appendChild(bookElement);
        
        // Agregar evento clic
        bookElement.addEventListener('click', function() {
            showBookDetail(libro.id);
        });
    });
}

// Mostrar detalle de libro
function showBookDetail(bookId) {
    const book = books[bookId];
    if (book) {
        document.getElementById('detailTitle').textContent = book.title;
        document.getElementById('detailAuthor').textContent = book.author;
        document.getElementById('detailDescription').textContent = book.description;
        document.getElementById('bookInitial').textContent = book.initial;
        bookDetail.classList.add('active');
        // Atenuar y deshabilitar el contenido principal
        mainContent.style.opacity = '0.3';
        mainContent.style.pointerEvents = 'none';
    }
}

// Ocultar detalle de libro
function hideBookDetail() {
    bookDetail.classList.remove('active');
    // Restaurar el contenido principal
    mainContent.style.opacity = '1';
    mainContent.style.pointerEvents = 'all';
}

// Mostrar buscador
function showSearch() {
    searchContainer.style.display = 'block';
    mainContent.style.opacity = '0.3';
    mainContent.style.pointerEvents = 'none';
    searchInput.focus();
}

// Ocultar buscador
function hideSearch() {
    searchContainer.style.display = 'none';
    mainContent.style.opacity = '1';
    mainContent.style.pointerEvents = 'all';
    searchInput.value = '';
    searchResults.style.display = 'none';
}

// Event Listeners
searchBtn.addEventListener('click', showSearch);
navSearch.addEventListener('click', showSearch);
closeSearch.addEventListener('click', hideSearch);
detailBackBtn.addEventListener('click', hideBookDetail);
backBtn.addEventListener('click', function() {
    // Si el detalle está visible, lo ocultamos
    if (bookDetail.classList.contains('active')) {
        hideBookDetail();
    } 
    // Si el buscador está visible, lo ocultamos
    else if (searchContainer.style.display === 'block') {
        hideSearch();
    }
});



// Buscar libros al escribir
searchInput.addEventListener('input', function() {
    if (this.value.length > 0) {
        searchResults.style.display = 'block';
        
        // Filtrar libros
        const searchTerm = this.value.toLowerCase();
        let resultsHTML = '<h3>Resultados de búsqueda:</h3>';
        let resultsCount = 0;
        
        for (const id in books) {
            const book = books[id];
            if (book.title.toLowerCase().includes(searchTerm)) {
                resultsHTML += `<div class="result-item" data-book="${id}">${book.title}</div>`;
                resultsCount++;
            }
        }
        
        if (resultsCount === 0) {
            resultsHTML += '<p>No se encontraron resultados</p>';
        }
        
        searchResults.innerHTML = resultsHTML;
        
        // Agregar eventos a los resultados
        document.querySelectorAll('.result-item').forEach(item => {
            item.addEventListener('click', function() {
                const bookId = this.getAttribute('data-book');
                hideSearch();
                showBookDetail(bookId);
            });
        });
        
    } else {
        searchResults.style.display = 'none';
    }
});

// Navegación inferior
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        // Remover clase activa de todos
        document.querySelectorAll('.nav-item').forEach(el => {
            el.classList.remove('active');
        });
        
        // Agregar clase activa al seleccionado
        this.classList.add('active');
    });
});



// Iniciar carga de libros
document.addEventListener('DOMContentLoaded', fetchBooks);