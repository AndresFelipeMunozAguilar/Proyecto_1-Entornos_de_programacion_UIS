const url = 'http://localhost:8080';
const requestMapping = '/api/employee';
let endpoint = '/getAllEmployees';

const containerId = 'employees-cards-here';


// Definición de la función que crea el componente
function EmployeeComponent(containerId) {
    // Almacena el contenedor donde se insertará el componente.
    this.container = document.getElementById(containerId);

    // Método para inicializar y renderizar el componente
    this.init = function () {
        // Primero, mostramos un mensaje de carga
        this.container.innerHTML = '<p>Cargando empleados...</p>';

        // Llamada a la API con axios
        axios.get(url + requestMapping + endpoint)
            .then(response => {
                // La respuesta contiene el arreglo de empleados
                console.log('Empleados obtenidos:', response.data);
                this.renderEmployees(response.data);
            })
            .catch(error => {
                // Manejo de errores
                console.error('Error al obtener los empleados:', error);
                this.container.innerHTML = '<p>Error al cargar los empleados.</p>';
            });
    }

    // Método para renderizar las cards de cada empleado
    this.renderEmployees = function (employees) {
        // Creamos un contenedor para las cards, usando clases de Bootstrap
        let row = document.createElement('div');
        row.className = 'row mt-3 mx-3 bg-body';

        // Recorrer cada objeto empleado y crear su card correspondiente
        employees.forEach(employee => {
            // Columna que contendrá la card (ajustable según el diseño deseado)
            let col = document.createElement('div');
            col.className = 'col-md-4 mb-4';

            // Creación de la card usando el formato de Bootstrap
            let card = document.createElement('div');
            card.className = 'card shadow';
            card.id = 'employee-card';

            // Cuerpo de la card donde se mostrará el nombre
            let cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            // Elemento que muestra el nombre completo del empleado
            let fullNameElement = document.createElement('h4');
            fullNameElement.className = 'card-title';
            fullNameElement.textContent = `${employee.name} ${employee.lastName}`;

            // Elemento que muestra el código del empleado
            let codeElement = document.createElement('h5');
            codeElement.className = 'card-subtitle mb-2 text-muted';
            codeElement.textContent = `Código: ${employee.employeeCode}`;

            // Elemento que muestra el trabajo del empleado
            let jobElement = document.createElement('p');
            jobElement.className = 'card-text';
            jobElement.textContent = `Trabajo: ${employee.job.name}`;

            // Elemento que muestra el teléfono del empleado
            let phoneElement = document.createElement('p');
            phoneElement.className = 'card-text';
            phoneElement.textContent = `Teléfono: ${employee.phone}`;

            // Elemento que muestra la imagen del empleado
            let imageElement = document.createElement('img');
            imageElement.className = 'card-img-top';
            imageElement.src = employee.imageUrl;
            imageElement.alt = `${employee.name} ${employee.lastName} image`;

            // Ensamblamos los nuevos elementos en el cuerpo de la card
            card.appendChild(imageElement);
            cardBody.appendChild(fullNameElement);
            cardBody.appendChild(codeElement);
            cardBody.appendChild(jobElement);
            cardBody.appendChild(phoneElement);
            card.appendChild(cardBody);
            col.appendChild(card);
            row.appendChild(col);
        });

        // Se reemplaza el contenido del contenedor con el nuevo contenido generado
        this.container.innerHTML = '';
        this.container.appendChild(row);
    }
}

// Inicialización del componente en el elemento con id 'employeeComponent'
document.addEventListener('DOMContentLoaded', function () {
    const employeeComponent = new EmployeeComponent(containerId);
    employeeComponent.init();
});