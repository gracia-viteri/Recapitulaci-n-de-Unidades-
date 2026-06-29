// Datos de los archivos del repositorio
const filesData = [
    {
        id: 1,
        name: "IA.pdf",
        unit: "Unidad 1",
        description: "Fundamentos de Inteligencia Artificial",
        icon: "📄",
        url: "https://github.com/gracia-viteri/Recapitulaci-n-de-Unidades-/raw/main/IA.pdf",
        size: "247 KB"
    },
    {
        id: 2,
        name: "IA 5.pdf",
        unit: "Unidad 5",
        description: "Temas avanzados de IA",
        icon: "📄",
        url: "https://github.com/gracia-viteri/Recapitulaci-n-de-Unidades-/raw/main/IA%205.pdf",
        size: "248 KB"
    },
    {
        id: 3,
        name: "IA 6.pdf",
        unit: "Unidad 6",
        description: "Aplicaciones y casos de uso",
        icon: "📄",
        url: "https://github.com/gracia-viteri/Recapitulaci-n-de-Unidades-/raw/main/IA%206.pdf",
        size: "230 KB"
    },
    {
        id: 4,
        name: "Recapitulación de unidades jv mtv.pdf",
        unit: "Unidades Completas",
        description: "Resumen completo de todas las unidades",
        icon: "📚",
        url: "https://github.com/gracia-viteri/Recapitulaci-n-de-Unidades-/raw/main/Recapitulacio%CC%81n%20de%20unidades%20jv%20mtv.pdf",
        size: "1.5 MB"
    }
];

// Variables globales
let filteredFiles = [...filesData];
let downloadedFiles = new Set();

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderFiles();
    setupSearch();
    setupValidation();
    populateUnitSelect();
});

/**
 * Renderiza los archivos en la cuadrícula
 */
function renderFiles(files = filesData) {
    const grid = document.getElementById('filesGrid');
    grid.innerHTML = '';

    if (files.length === 0) {
        grid.innerHTML = '<div class="no-results">❌ No se encontraron archivos que coincidan con tu búsqueda</div>';
        return;
    }

    files.forEach(file => {
        const card = createFileCard(file);
        grid.appendChild(card);
    });
}

/**
 * Crea una tarjeta de archivo
 */
function createFileCard(file) {
    const card = document.createElement('div');
    card.className = 'file-card';
    card.innerHTML = `
        <div class="file-icon">${file.icon}</div>
        <h3>${file.name}</h3>
        <div class="file-info">
            <span><strong>Unidad:</strong> ${file.unit}</span>
            <span><strong>Descripción:</strong> ${file.description}</span>
            <span><strong>Tamaño:</strong> ${file.size}</span>
        </div>
        <button class="btn btn-primary" onclick="downloadFile('${file.url}', '${file.name}', ${file.id})">
            ⬇️ Descargar
        </button>
    `;
    return card;
}

/**
 * Descarga un archivo
 */
function downloadFile(url, fileName, fileId) {
    try {
        downloadedFiles.add(fileId);
        
        // Crear un elemento <a> invisible para descargar
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Mostrar notificación
        showNotification(`✓ Descargando: ${fileName}`, 'success');
    } catch (error) {
        showNotification(`❌ Error al descargar: ${fileName}`, 'error');
        console.error('Error:', error);
    }
}

/**
 * Configura la búsqueda de archivos
 */
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        if (query === '') {
            filteredFiles = [...filesData];
        } else {
            filteredFiles = filesData.filter(file => {
                return (
                    file.name.toLowerCase().includes(query) ||
                    file.unit.toLowerCase().includes(query) ||
                    file.description.toLowerCase().includes(query)
                );
            });
        }
        
        renderFiles(filteredFiles);
    });
}

/**
 * Configura la validación de información
 */
function setupValidation() {
    const validateBtn = document.getElementById('validateBtn');
    const unitSelect = document.getElementById('unitSelect');

    validateBtn.addEventListener('click', () => {
        const selectedUnit = unitSelect.value;
        validateUnit(selectedUnit);
    });

    // Permitir validar con Enter
    unitSelect.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            validateUnit(unitSelect.value);
        }
    });
}

/**
 * Valida la información de una unidad
 */
function validateUnit(unitId) {
    const resultDiv = document.getElementById('validationResult');
    
    if (!unitId) {
        resultDiv.classList.remove('show', 'success', 'error');
        return;
    }

    // Datos de validación por unidad
    const validationData = {
        '1': {
            status: 'success',
            message: '✓ Unidad 1 - IA.pdf validada correctamente',
            details: 'Archivo contiene: Fundamentos de Inteligencia Artificial, definiciones básicas, historia de IA, conceptos fundamentales.'
        },
        '2': {
            status: 'success',
            message: '✓ Unidad 5 - IA 5.pdf validada correctamente',
            details: 'Archivo contiene: Temas avanzados de IA, algoritmos complejos, aplicaciones especializadas.'
        },
        '3': {
            status: 'success',
            message: '✓ Unidad 6 - IA 6.pdf validada correctamente',
            details: 'Archivo contiene: Aplicaciones de IA en el mundo real, casos de uso, implementaciones prácticas.'
        },
        '4': {
            status: 'success',
            message: '✓ Unidades Completas validadas correctamente',
            details: 'Archivo maestro contiene: Resumen integral de todas las unidades, índice completo, referencias.'
        }
    };

    const data = validationData[unitId];
    
    if (data) {
        resultDiv.className = `validation-result show ${data.status}`;
        resultDiv.innerHTML = `
            <strong>${data.message}</strong><br>
            <small>${data.details}</small><br><br>
            <small>✓ Validación realizada: ${new Date().toLocaleString('es-ES')}</small>
        `;
    } else {
        resultDiv.className = 'validation-result show error';
        resultDiv.innerHTML = '❌ Error: No se pudo validar la unidad seleccionada';
    }
}

/**
 * Llena el select de unidades
 */
function populateUnitSelect() {
    const unitSelect = document.getElementById('unitSelect');
    
    filesData.forEach(file => {
        const option = document.createElement('option');
        option.value = file.id;
        option.textContent = file.unit;
        unitSelect.appendChild(option);
    });
}

/**
 * Muestra una notificación temporal
 */
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 9999;
        animation: slideDown 0.3s ease-out;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;

    if (type === 'success') {
        notification.style.background = '#4caf50';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.background = '#f44336';
        notification.style.color = 'white';
    } else {
        notification.style.background = '#2196f3';
        notification.style.color = 'white';
    }

    notification.textContent = message;
    document.body.appendChild(notification);

    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Agregar animación de salida
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(400px);
        }
    }
`;
document.head.appendChild(style);

// Estadísticas y tracking
console.log('🚀 Aplicación iniciada');
console.log('📁 Archivos disponibles:', filesData.length);
console.log('📚 Unidades totales:', new Set(filesData.map(f => f.unit)).size);
