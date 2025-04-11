export class EmployeeComponent {
    constructor(containerId) {
        const host = "http://localhost";
        const port = "8080";
        const getEmployeesEndpoint = '/api/employee/getAllEmployees';
        const deleteEmployeeEndpoint = '/api/employee/deleteByCode/';

        this.container = document.getElementById(containerId);

        this.init = function () {
            // Obtener token del localStorage
            const token = localStorage.getItem("jwt");

            // Validar existencia del token
            if (!token) {
                this.container.innerHTML = '<p>Debes iniciar sesión para ver los empleados.</p>';
                return;
            }

            // Mostrar mensaje de carga
            this.container.innerHTML = '<p>Cargando empleados...</p>';

            // Petición GET con token en el header
            axios.get(`${host}:${port}${getEmployeesEndpoint}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log('Empleados obtenidos:', response.data);
                    this.renderEmployees(response.data);
                })
                .catch(error => {
                    console.error('Error al obtener los empleados:', error);

                    // Manejo específico del error 403
                    if (error.response && error.response.status === 403) {
                        this.container.innerHTML = '<p>No tienes permisos para ver esta información.</p>';
                    } else {
                        this.container.innerHTML = '<p>Error al cargar los empleados.</p>';
                    }
                });
        };

        this.renderEmployees = function (employees) {
            let row = document.createElement('div');
            row.className = 'row mt-3 mx-3 bg-body';

            employees.forEach(employee => {
                let col = document.createElement('div');
                col.className = 'col-md-4 mb-4';

                let card = document.createElement('div');
                card.className = 'card shadow';

                let cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                let fullNameElement = document.createElement('h4');
                fullNameElement.className = 'card-title';
                fullNameElement.textContent = `${employee.name} ${employee.lastName}`;

                let codeElement = document.createElement('h5');
                codeElement.className = 'card-subtitle mb-3 text-muted';
                codeElement.textContent = `Código: ${employee.employeeCode}`;

                let jobElement = document.createElement('p');
                jobElement.className = 'card-text mb-1';
                jobElement.textContent = `Trabajo: ${employee.job.name}`;

                let phoneElement = document.createElement('p');
                phoneElement.className = 'card-text mb-1';
                phoneElement.textContent = `Teléfono: ${employee.phone}`;

                let imageElement = document.createElement('img');
                imageElement.className = 'card-img-top';
                imageElement.src = employee.imageUrl;
                imageElement.alt = `${employee.name} ${employee.lastName} image`;

                let actionContainer = document.createElement('div');
                actionContainer.className = 'd-flex justify-content-end pt-2';

                let updateButton = document.createElement('button');
                updateButton.className = 'btn btn-primary me-3';
                updateButton.textContent = 'Actualizar';

                let deleteButton = document.createElement('button');
                deleteButton.className = 'btn btn-danger';
                deleteButton.textContent = 'Eliminar';

                deleteButton.addEventListener('click', () => {
                    if (confirm(`¿Estás seguro de que deseas eliminar al empleado con código ${employee.employeeCode}?`)) {
                        const token = localStorage.getItem("jwt");

                        axios.delete(`${host}:${port}${deleteEmployeeEndpoint}${employee.employeeCode}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                            .then(() => {
                                alert('Empleado eliminado exitosamente.');
                                this.init(); // Recargar empleados
                            })
                            .catch(error => {
                                console.error('Error al eliminar el empleado:', error);
                                if (error.response && error.response.status === 403) {
                                    alert('No tienes permisos para eliminar este empleado.');
                                } else {
                                    alert('No se pudo eliminar el empleado. Por favor, inténtalo nuevamente.');
                                }
                            });
                    }
                });

                actionContainer.appendChild(updateButton);
                actionContainer.appendChild(deleteButton);

                card.appendChild(imageElement);
                cardBody.appendChild(fullNameElement);
                cardBody.appendChild(codeElement);
                cardBody.appendChild(jobElement);
                cardBody.appendChild(phoneElement);
                cardBody.appendChild(actionContainer);
                card.appendChild(cardBody);
                col.appendChild(card);
                row.appendChild(col);
            });

            // Limpiar y mostrar los empleados
            this.container.innerHTML = '';
            this.container.appendChild(row);
        };
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const employeeComponent = new EmployeeComponent('employees-cards-here');
    employeeComponent.init();
});