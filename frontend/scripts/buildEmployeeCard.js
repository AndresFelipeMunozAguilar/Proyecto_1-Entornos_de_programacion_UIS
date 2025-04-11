export class EmployeeComponent {
    constructor(containerId) {
        const host = "http://localhost";
        const port = "8080";
        const getEmployeesEndpoint = '/api/employee/getAllEmployees';
        const deleteEmployeeEndpoint = '/api/employee/deleteByCode/';
        const updateEmployeeEndpoint = '/api/employee/updateEmployeeById/'

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

                updateButton.addEventListener('click', () => {
                    // Precargar los datos del empleado en el formulario de actualización
                    document.getElementById('update-employee-id').value = employee.idEmployee;
                    document.getElementById('update-name').value = employee.name;
                    document.getElementById('update-lastName').value = employee.lastName;
                    document.getElementById('update-phone').value = employee.phone;
                    document.getElementById('update-form-selected-job').value = employee.job.idJob;
                    document.getElementById('update-dropdownMenuButton').textContent = `Cargo seleccionado: ${employee.job.name}`;
                    document.getElementById('update-imageUrl').value = employee.imageUrl;

                    // Mostrar el modal de actualización
                    const updateModal = new bootstrap.Modal(document.getElementById('update-employee-modal'));
                    updateModal.show();
                });

                // Botón para eliminar al empleado.
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

        // Manejar la selección de un trabajo en el menú desplegable de actualización
        const updateDropdownMenu = document.getElementById('update-dropdown-job-menu');
        updateDropdownMenu.addEventListener('click', function (event) {
            if (event.target.classList.contains('dropdown-item')) {
                event.preventDefault();

                // Actualizar el botón y el campo oculto con el trabajo seleccionado
                const selectedValue = event.target.getAttribute('data-value');
                const selectedValueText = event.target.textContent.trim();
                const button = document.getElementById('update-dropdownMenuButton');
                const hiddenInput = document.getElementById('update-form-selected-job');

                button.textContent = `Cargo seleccionado: ${selectedValueText}`;
                hiddenInput.value = selectedValue;
            }
        });

        // Manejar el envío del formulario de actualización
        document.getElementById('update-employee-form').addEventListener('submit', (e) => {
            e.preventDefault();

            const updatedEmployee = {
                idEmployee: parseInt(document.getElementById('update-employee-id').value, 10),
                name: document.getElementById('update-name').value,
                lastName: document.getElementById('update-lastName').value,
                job: { idJob: parseInt(document.getElementById('update-form-selected-job').value, 10) },
                phone: document.getElementById('update-phone').value,
                imageUrl: document.getElementById('update-imageUrl').value,
            };

            console.log('Empleado actualizado:', updatedEmployee);

            axios.put(`${host}:${port}${updateEmployeeEndpoint}${updatedEmployee.idEmployee}`, updatedEmployee)
                .then(() => {
                    alert('Empleado actualizado exitosamente.');
                    this.init(); // Recargar la lista de empleados
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Error al actualizar el empleado:', error);
                    alert('No se pudo actualizar el empleado. Por favor, inténtalo nuevamente.');
                });
        });
    }
}

// Inicializar el componente cuando el DOM esté completamente cargado.
document.addEventListener('DOMContentLoaded', function () {
    const employeeComponent = new EmployeeComponent('employees-cards-here');
    employeeComponent.init();
});