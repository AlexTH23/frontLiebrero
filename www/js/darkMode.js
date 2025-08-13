// Sistema de Modo Oscuro Centralizado
class DarkModeManager {
    constructor() {
        this.isDarkMode = this.getStoredPreference();
        this.init();
    }

    // Obtener preferencia guardada en localStorage
    getStoredPreference() {
        const stored = localStorage.getItem('darkMode');
        if (stored !== null) {
            return JSON.parse(stored);
        }
        // Por defecto, modo claro
        return false;
    }

    // Guardar preferencia en localStorage
    savePreference() {
        localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode));
    }

    // Aplicar modo oscuro
    applyDarkMode() {
        document.body.classList.toggle('dark-mode', this.isDarkMode);
        
        // Aplicar estilos específicos del modo oscuro
        if (this.isDarkMode) {
            this.applyDarkStyles();
        } else {
            this.applyLightStyles();
        }
    }

    // Aplicar estilos del modo oscuro
    applyDarkStyles() {
        const root = document.documentElement;
        root.style.setProperty('--bg-primary', '#1a1a1a');
        root.style.setProperty('--bg-secondary', '#2d2d2d');
        root.style.setProperty('--bg-tertiary', '#333333');
        root.style.setProperty('--text-primary', '#e0e0e0');
        root.style.setProperty('--text-secondary', '#b0b0b0');
        root.style.setProperty('--border-color', '#444444');
        root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.5)');
        root.style.setProperty('--accent-color', '#8B0000'); // Vino tinto (dark red)
        root.style.setProperty('--accent-hover', '#A52A2A'); // Vino tinto hover (indian red)
    }

    // Aplicar estilos del modo claro
    applyLightStyles() {
        const root = document.documentElement;
        root.style.setProperty('--bg-primary', '#f5f1e8');
        root.style.setProperty('--bg-secondary', '#ffffff');
        root.style.setProperty('--bg-tertiary', '#f8f4ed');
        root.style.setProperty('--text-primary', '#3a2c1e');
        root.style.setProperty('--text-secondary', '#5d4037');
        root.style.setProperty('--border-color', '#d7ccc8');
        root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.1)');
        root.style.setProperty('--accent-color', '#8B0000'); // Vino tinto (dark red)
        root.style.setProperty('--accent-hover', '#A52A2A'); // Vino tinto hover (indian red)
    }

    // Cambiar modo
    toggle() {
        this.isDarkMode = !this.isDarkMode;
        this.savePreference();
        this.applyDarkMode();
        this.updateToggleButtons();
        
        // Emitir evento personalizado
        document.dispatchEvent(new CustomEvent('darkModeChanged', {
            detail: { isDarkMode: this.isDarkMode }
        }));
    }

    // Actualizar botones de toggle
    updateToggleButtons() {
        const toggles = document.querySelectorAll('.dark-mode-toggle, #darkModeSwitch');
        toggles.forEach(toggle => {
            if (toggle.type === 'checkbox') {
                toggle.checked = this.isDarkMode;
            }
        });
    }

    // Inicializar
    init() {
        // Aplicar modo inmediatamente para evitar flash
        this.applyDarkMode();
        this.updateToggleButtons();
        
        // Escuchar cambios en el toggle
        document.addEventListener('change', (e) => {
            if (e.target.matches('.dark-mode-toggle, #darkModeSwitch')) {
                this.toggle();
            }
        });
    }
}

// Aplicar modo oscuro ANTES de que se renderice la página
// Esto previene el efecto "flashbang"
(function() {
    const isDarkMode = (() => {
        const stored = localStorage.getItem('darkMode');
        if (stored !== null) {
            return JSON.parse(stored);
        }
        return false;
    })();
    
    // Aplicar estilos inmediatamente
    if (isDarkMode) {
        document.documentElement.style.setProperty('--bg-primary', '#1a1a1a');
        document.documentElement.style.setProperty('--bg-secondary', '#2d2d2d');
        document.documentElement.style.setProperty('--bg-tertiary', '#333333');
        document.documentElement.style.setProperty('--text-primary', '#e0e0e0');
        document.documentElement.style.setProperty('--text-secondary', '#b0b0b0');
        document.documentElement.style.setProperty('--border-color', '#444444');
        document.documentElement.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.5)');
        document.documentElement.style.setProperty('--accent-color', '#8B0000'); // Vino tinto
        document.documentElement.style.setProperty('--accent-hover', '#A52A2A'); // Vino tinto hover
        
        // Agregar clase dark-mode al body inmediatamente
        document.body.classList.add('dark-mode');
    }
})();

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.darkModeManager = new DarkModeManager();
});

// Función global para cambiar modo desde otros scripts
function toggleDarkMode() {
    if (window.darkModeManager) {
        window.darkModeManager.toggle();
    }
}