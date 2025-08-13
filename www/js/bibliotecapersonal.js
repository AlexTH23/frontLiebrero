        // Base de datos de libros con la estructura especificada
        const personalLibrary = [
            {
                id: "hp1",
                titulo: "Harry Potter y la piedra filosofal",
                autor: "J.K. Rowling",
                descripcion: "Harry Potter y la piedra filosofal es el primer libro de la serie literaria Harry Potter, escrito por la autora británica J.K. Rowling. Sigue la historia de Harry Potter, un niño que descubre en su undécimo cumpleaños que es un mago. Harry es invitado a asistir al Colegio Hogwarts de Magia y Hechicería, donde comienza a entrenar como mago.",
                genero: "Fantasía",
                idioma: "Español",
                anoPublicacion: 1997,
                portadaJSON: 'https://m.media-amazon.com/images/I/81qZ+QOjL9L._AC_UF1000,1000_QL80_.jpg',
                archivoJSON: "harry_potter_piedra_filosofal.json",
                status: "reading",
                favorite: true,
                initial: "HP"
            },
            {
                id: "got1",
                titulo: "Juego de Tronos",
                autor: "George R.R. Martin",
                descripcion: "Juego de Tronos es la primera novela de la serie de fantasía épica Canción de hielo y fuego. La novela se caracteriza por su gran número de personajes, sus múltiples líneas argumentales y su complejo mundo ficticio.",
                genero: "Fantasía épica",
                idioma: "Español",
                anoPublicacion: 1996,
                portadaJSON: 'https://m.media-amazon.com/images/I/91dSMhdIzTL._AC_UF1000,1000_QL80_.jpg',
                archivoJSON: "juego_tronos.json",
                status: "finished",
                favorite: true,
                initial: "GT"
            },
            {
                id: "lotr1",
                titulo: "El Señor de los Anillos",
                autor: "J.R.R. Tolkien",
                descripcion: "La novela narra el viaje del protagonista principal, Frodo Bolsón, hobbit de la Comarca, para destruir el Anillo Único y la consiguiente guerra que provocará el enemigo para recuperarlo.",
                genero: "Fantasía heroica",
                idioma: "Español",
                anoPublicacion: 1954,
                portadaJSON: 'https://m.media-amazon.com/images/I/71ZLavBjpRL._AC_UF1000,1000_QL80_.jpg',
                archivoJSON: "senior_anillos.json",
                status: "finished",
                favorite: true,
                initial: "SA"
            },
            {
                id: "cien-anios",
                titulo: "Cien años de soledad",
                autor: "Gabriel García Márquez",
                descripcion: "Es una novela que narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo. Considerada una obra maestra de la literatura hispanoamericana y universal.",
                genero: "Realismo mágico",
                idioma: "Español",
                anoPublicacion: 1967,
                portadaJSON: 'https://m.media-amazon.com/images/I/81eE+7tF5RL._AC_UF1000,1000_QL80_.jpg',
                archivoJSON: "cien_anios_soledad.json",
                status: "reading",
                favorite: false,
                initial: "CS"
            },
            {
                id: "fahrenheit",
                titulo: "Fahrenheit 451",
                autor: "Ray Bradbury",
                descripcion: "La novela presenta una sociedad estadounidense del futuro en la que los libros están prohibidos y existen 'bomberos' que queman cualquier libro que encuentren.",
                genero: "Ciencia ficción",
                idioma: "Español",
                anoPublicacion: 1953,
                portadaJSON: 'https://m.media-amazon.com/images/I/91B2+QaYtHL._AC_UF1000,1000_QL80_.jpg',
                archivoJSON: "fahrenheit_451.json",
                status: "wishlist",
                favorite: false,
                initial: "F"
            },
            {
                id: "orgullo",
                titulo: "Orgullo y prejuicio",
                autor: "Jane Austen",
                descripcion: "La novela describe la historia de Elizabeth Bennet, una de las cinco hijas del señor Bennet, que debe lidiar con los problemas del matrimonio, la moral y la ignorancia en la Inglaterra de la Regencia.",
                genero: "Novela romántica",
                idioma: "Español",
                anoPublicacion: 1813,
                portadaJSON: 'https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg',
                archivoJSON: "orgullo_prejuicio.json",
                status: "finished",
                favorite: true,
                initial: "OP"
            },
            {
                id: "moby-dick",
                titulo: "Moby Dick",
                autor: "Herman Melville",
                descripcion: "Narra la travesía del barco ballenero Pequod, comandado por el capitán Ahab, junto a Ismael y el arponero Queequog en la obsesiva y autodestructiva persecución de una gran ballena blanca.",
                genero: "Aventuras",
                idioma: "Español",
                anoPublicacion: 1851,
                portadaJSON: 'https://m.media-amazon.com/images/I/81dUikqUKgL._AC_UF1000,1000_QL80_.jpg',
                archivoJSON: "moby_dick.json",
                status: "wishlist",
                favorite: false,
                initial: "MD"
            },
            {
                id: "crimen-castigo",
                titulo: "Crimen y castigo",
                autor: "Fiódor Dostoievski",
                descripcion: "Es una novela de carácter psicológico que narra la vida de Rodión Raskólnikov, un estudiante que planea y lleva a cabo el asesinato de una vieja prestamista.",
                genero: "Novela psicológica",
                idioma: "Español",
                anoPublicacion: 1866,
                portadaJSON: 'https://m.media-amazon.com/images/I/81p+9+6eY7L._AC_UF1000,1000_QL80_.jpg',
                archivoJSON: "crimen_castigo.json",
                status: "reading",
                favorite: true,
                initial: "CC"
            }
        ];

        // Elementos DOM
        const backBtn = document.getElementById('backBtn');
        const searchBtn = document.getElementById('searchBtn');
        const closeSearch = document.getElementById('closeSearch');
        const searchContainer = document.getElementById('searchContainer');
        const searchInput = document.getElementById('searchInput');
        const bookList = document.getElementById('bookList');
        const bookDetail = document.getElementById('bookDetail');
        const detailBackBtn = document.getElementById('detailBackBtn');
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        // Estado de la aplicación
        let currentFilter = "all";
        
        // Inicializar biblioteca
        renderBooks(personalLibrary);
        
        // Función para renderizar libros
        function renderBooks(books) {
            bookList.innerHTML = '';
            
            books.forEach(book => {
                const statusText = getStatusText(book.status);
                const statusClass = getStatusClass(book.status);
                
                const bookItem = document.createElement('div');
                bookItem.className = 'book-item';
                bookItem.dataset.id = book.id;
                bookItem.innerHTML = `
                    <div class="book-cover" style="background-image: ${book.portadaJSON ? `url('${book.portadaJSON}')` : 'none'}; background-color: ${book.portadaJSON ? 'transparent' : '#d7ccc8'};">
                        <div class="book-spine"></div>
                        ${book.portadaJSON ? '' : `<span class="initial">${book.initial}</span>`}
                        <div class="book-status ${statusClass}">${statusText}</div>
                    </div>
                    <div class="book-info">
                        <div class="book-title">${book.titulo}</div>
                        <div class="book-author">${book.autor}</div>
                        <div class="book-meta">
                            <span>${book.genero}</span>
                            <span>${book.anoPublicacion}</span>
                        </div>
                    </div>
                `;
                
                bookItem.addEventListener('click', () => showBookDetail(book.id));
                bookList.appendChild(bookItem);
            });
        }
        
        // Función para mostrar detalles del libro
        function showBookDetail(bookId) {
            const book = personalLibrary.find(b => b.id === bookId);
            if (!book) return;
            
            document.getElementById('detailTitle').textContent = book.titulo;
            document.getElementById('detailAuthor').textContent = book.autor;
            document.getElementById('detailDescription').textContent = book.descripcion;
            document.getElementById('detailGenre').textContent = book.genero;
            document.getElementById('detailLanguage').textContent = book.idioma;
            document.getElementById('detailYear').textContent = book.anoPublicacion;
            document.getElementById('detailStatus').textContent = getStatusText(book.status);
            document.getElementById('detailInitial').textContent = book.initial;
            
            // Configurar portada
            const detailCover = document.getElementById('detailCover');
            detailCover.style.backgroundImage = book.portadaJSON ? `url('${book.portadaJSON}')` : 'none';
            detailCover.style.backgroundColor = book.portadaJSON ? 'transparent' : '#d7ccc8';
            document.getElementById('detailInitial').style.display = book.portadaJSON ? 'none' : 'block';
            
            // Actualizar botón de favoritos
            const favoriteBtn = document.getElementById('favoriteBtn');
            favoriteBtn.innerHTML = book.favorite 
                ? '<i class="fas fa-star"></i> Quitar favorito' 
                : '<i class="far fa-star"></i> Marcar favorito';
            
            bookDetail.classList.add('active');
        }
        
        // Obtener texto para estado
        function getStatusText(status) {
            const statusMap = {
                reading: "Leyendo",
                finished: "Terminado",
                wishlist: "Por leer"
            };
            return statusMap[status] || "Sin estado";
        }
        
        // Obtener clase CSS para estado
        function getStatusClass(status) {
            const classMap = {
                reading: "reading-status",
                finished: "finished-status",
                wishlist: "wishlist-status"
            };
            return classMap[status] || "";
        }
        
        // Filtrar libros
        function filterBooks(filter) {
            currentFilter = filter;
            
            // Actualizar botones de filtro
            filterButtons.forEach(btn => {
                if (btn.dataset.filter === filter) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            
            let filteredBooks = personalLibrary;
            
            switch(filter) {
                case "reading":
                    filteredBooks = personalLibrary.filter(book => book.status === "reading");
                    break;
                case "finished":
                    filteredBooks = personalLibrary.filter(book => book.status === "finished");
                    break;
                case "favorites":
                    filteredBooks = personalLibrary.filter(book => book.favorite);
                    break;
                case "wishlist":
                    filteredBooks = personalLibrary.filter(book => book.status === "wishlist");
                    break;
                case "fantasia":
                    filteredBooks = personalLibrary.filter(book => 
                        book.genero.toLowerCase().includes("fantasía") || 
                        book.genero.toLowerCase().includes("fantasia")
                    );
                    break;
            }
            
            renderBooks(filteredBooks);
        }
        
        // Event Listeners
        backBtn.addEventListener('click', () => {
            window.location.href = 'inicio.html';
        });
        
        detailBackBtn.addEventListener('click', () => {
            bookDetail.classList.remove('active');
        });
        
        // Función para mostrar buscador
        function showSearch() {
            searchContainer.style.display = 'block';
            mainContent.style.opacity = '0.3';
            mainContent.style.pointerEvents = 'none';
            searchInput.focus();
        }
        
        // Función para ocultar buscador
        function hideSearch() {
            searchContainer.style.display = 'none';
            mainContent.style.opacity = '1';
            mainContent.style.pointerEvents = 'all';
            searchInput.value = '';
            filterBooks(currentFilter);
        }
        
        searchBtn.addEventListener('click', showSearch);
        
        // Botón de búsqueda de la navegación inferior
        document.getElementById('navSearch').addEventListener('click', showSearch);
        
        closeSearch.addEventListener('click', hideSearch);
        
        // Buscar libros al escribir
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            if (searchTerm === '') {
                filterBooks(currentFilter);
                return;
            }
            
            const filteredBooks = personalLibrary.filter(book => 
                book.titulo.toLowerCase().includes(searchTerm) || 
                book.autor.toLowerCase().includes(searchTerm) ||
                book.genero.toLowerCase().includes(searchTerm)
            );
            
            renderBooks(filteredBooks);
        });
        
        // Botones de filtro
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBooks(btn.dataset.filter);
            });
        });
        
        // Botón de favoritos
        document.getElementById('favoriteBtn').addEventListener('click', function() {
            const bookTitle = document.getElementById('detailTitle').textContent;
            const book = personalLibrary.find(b => b.titulo === bookTitle);
            if (book) {
                book.favorite = !book.favorite;
                this.innerHTML = book.favorite 
                    ? '<i class="fas fa-star"></i> Quitar favorito' 
                    : '<i class="far fa-star"></i> Marcar favorito';
                
                // Actualizar vista si estamos en favoritos
                if (currentFilter === "favorites") {
                    filterBooks("favorites");
                }
            }
        });
        
        // Botón de lectura
        document.getElementById('readBtn').addEventListener('click', function() {
            const bookTitle = document.getElementById('detailTitle').textContent;
            const book = personalLibrary.find(b => b.titulo === bookTitle);
            if (book) {
                // Iniciar lectura del libro
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
                
                // Cambiar vista según selección
                if (this.id === 'navLibrary') {
                    document.querySelector('.title').textContent = 'MI BIBLIOTECA';
                } else if (this.id === 'navConfig') {
                    // El botón de configuración ya tiene onclick en el HTML
                } else {
                    // Navegar a otra sección
                }
            });
        });
        
        // Filtro inicial
        filterBooks('all');