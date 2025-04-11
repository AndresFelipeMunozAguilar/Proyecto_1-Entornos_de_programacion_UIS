const url = 'http://localhost:8080';
const requestMapping = '/api/employee';
let endpoint = '/getAllEmployees';

const containerId = 'employees-cards-here';

// Definición de la función que crea el componente
function EmployeeComponent(containerId) {
    this.container = document.getElementById(containerId);

    this.init = function () {
        // Mostrar mensaje de carga
        this.container.innerHTML = '<p>Cargando empleados...</p>';

        // Obtener el token del localStorage
        const token = localStorage.getItem("token");

        // Verificar si hay token
        if (!token) {
            this.container.innerHTML = '<p>No estás autenticado. Inicia sesión.</p>';
            return;
        }

        // Llamada a la API con axios y token en headers
        axios.get(url + requestMapping + endpoint, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        .then(response => {
            console.log('Empleados obtenidos:', response.data);
            this.renderEmployees(response.data);
        })
        .catch(error => {
            console.error('Error al obtener los empleados:', error);
            this.container.innerHTML = '<p>Error al cargar los empleados o no autorizado.</p>';
        });
    }

    this.renderEmployees = function (employees) {
        let row = document.createElement('div');
        row.className = 'row mt-3 mx-3 bg-body';

        employees.forEach(employee => {
            let col = document.createElement('div');
            col.className = 'col-md-4 mb-4';

            let card = document.createElement('div');
            card.className = 'card shadow';

            let imageElement = document.createElement('img');
            imageElement.className = 'card-img-top';
            imageElement.src = employee.imageUrl;
            imageElement.alt = `${employee.name} ${employee.lastName} image`;

            let cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            let fullNameElement = document.createElement('h4');
            fullNameElement.className = 'card-title';
            fullNameElement.textContent = `${employee.name} ${employee.lastName}`;

            let codeElement = document.createElement('h5');
            codeElement.className = 'card-subtitle mb-2 text-muted';
            codeElement.textContent = `Código: ${employee.employeeCode}`;

            let jobElement = document.createElement('p');
            jobElement.className = 'card-text';
            jobElement.textContent = `Trabajo: ${employee.job.name}`;

            let phoneElement = document.createElement('p');
            phoneElement.className = 'card-text';
            phoneElement.textContent = `Teléfono: ${employee.phone}`;

            // Ensamblado de la card
            card.appendChild(imageElement);
            cardBody.appendChild(fullNameElement);
            cardBody.appendChild(codeElement);
            cardBody.appendChild(jobElement);
            cardBody.appendChild(phoneElement);
            card.appendChild(cardBody);
            col.appendChild(card);
            row.appendChild(col);
        });

        this.container.innerHTML = '';
        this.container.appendChild(row);
    }
}

// Inicialización del componente
document.addEventListener('DOMContentLoaded', function () {
    const employeeComponent = new EmployeeComponent(containerId);
    employeeComponent.init();
});