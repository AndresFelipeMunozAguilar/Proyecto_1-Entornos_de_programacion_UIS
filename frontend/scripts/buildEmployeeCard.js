// Clase que representa el componente encargado de renderizar las tarjetas de empleados.
export class EmployeeComponent {
    constructor(containerId) {
        // Variables para configurar la conexión con la API.
        const host = "http://localhost";
        const port = "8080";
        const endpoint = '/api/employee/getAllEmployees';

        // Referencia al contenedor donde se renderizarán las tarjetas.
        this.container = document.getElementById(containerId);

        // Método para inicializar el componente y cargar los datos de empleados.
        this.init = function () {
            // Mostrar un mensaje de carga mientras se obtienen los datos.
            this.container.innerHTML = '<p>Cargando empleados...</p>';

            // Realizar una solicitud a la API para obtener los empleados.
            axios.get(`${host}:${port}${endpoint}`)
                .then(response => {
                    // Si la solicitud es exitosa, renderizar las tarjetas con los datos obtenidos.
                    console.log('Empleados obtenidos:', response.data);
                    this.renderEmployees(response.data);
                })
                .catch(error => {
                    // Si ocurre un error, mostrar un mensaje en el contenedor.
                    console.error('Error al obtener los empleados:', error);
                    this.container.innerHTML = '<p>Error al cargar los empleados.</p>';
                });
        };

        // Método para renderizar las tarjetas de empleados en el contenedor.
        this.renderEmployees = function (employees) {
            // Crear un contenedor para las tarjetas usando clases de Bootstrap.
            let row = document.createElement('div');
            row.className = 'row mt-3 mx-3 bg-body';

            // Iterar sobre los datos de los empleados y crear una tarjeta para cada uno.
            employees.forEach(employee => {
                let col = document.createElement('div');
                col.className = 'col-md-4 mb-4';

                let card = document.createElement('div');
                card.className = 'card shadow';

                let cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                // Crear elementos para mostrar la información del empleado.
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

                let imageElement = document.createElement('img');
                imageElement.className = 'card-img-top';
                imageElement.src = employee.imageUrl;
                imageElement.alt = `${employee.name} ${employee.lastName} image`;

                // Ensamblar los elementos en la tarjeta y agregarla al contenedor.
                card.appendChild(imageElement);
                cardBody.appendChild(fullNameElement);
                cardBody.appendChild(codeElement);
                cardBody.appendChild(jobElement);
                cardBody.appendChild(phoneElement);
                card.appendChild(cardBody);
                col.appendChild(card);
                row.appendChild(col);
            });

            // Reemplazar el contenido del contenedor con las tarjetas generadas.
            this.container.innerHTML = '';
            this.container.appendChild(row);
        };
    }
}

// Inicializar el componente cuando el DOM esté completamente cargado.
document.addEventListener('DOMContentLoaded', function () {
    // Crear una instancia del componente y pasar el ID del contenedor.
    const employeeComponent = new EmployeeComponent('employees-cards-here');
    // Llamar al método init para cargar y renderizar los empleados.
    employeeComponent.init();
});