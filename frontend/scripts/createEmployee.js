(() => {
    // Variables para configurar la conexión con la API.
    const host = "http://localhost";
    const port = "8080";
    const endpoint = "/api/employee/createEmployee";

    // Esperar a que el DOM esté completamente cargado antes de ejecutar el código.
    document.addEventListener("DOMContentLoaded", () => {
        // Agregar un evento al formulario para manejar el envío de datos.
        document.getElementById('create-employee-form').addEventListener('submit', function (e) {
            // Validar que se haya seleccionado un trabajo antes de enviar el formulario.
            const jobInput = document.getElementById('form-selected-job');
            const jobLabel = document.querySelector('label[for="form-selected-job"]');

            if (!jobInput.value) {
                // Mostrar un mensaje de error si no se seleccionó un trabajo.
                alert("Por favor, selecciona un trabajo antes de continuar.");
                jobLabel.classList.add('text-danger');
                jobLabel.classList.remove('form-label');
                e.preventDefault();
                return;
            } else {
                // Restaurar el estilo del label si la validación es exitosa.
                jobLabel.classList.remove('text-danger');
                jobLabel.classList.add('form-label');
            }

            // Crear un objeto con los datos del empleado a partir del formulario.
            const employee = {
                name: document.getElementById('name').value,
                lastName: document.getElementById('lastName').value,
                job: {
                    idJob: parseInt(document.getElementById('form-selected-job').value, 10)
                },
                phone: document.getElementById('phone').value,
                imageUrl: document.getElementById('imageUrl').value,
            };

            // Enviar los datos del empleado a la API mediante una solicitud POST.
            axios.post(`${host}:${port}${endpoint}`, employee)
                .then(response => {
                    // Mostrar un mensaje de éxito y recargar la página.
                    console.log("Empleado creado exitosamente:", response.data);
                    alert("Empleado creado exitosamente.");
                    window.location.reload();
                })
                .catch(error => {
                    // Mostrar un mensaje de error si la solicitud falla.
                    console.error("Error al crear empleado:", error);
                    alert("Error al crear empleado. Por favor, revisa los datos e inténtalo nuevamente.");
                });

            // Prevenir el envío predeterminado del formulario.
            e.preventDefault();
        });

        // Manejar la selección de un trabajo en el menú desplegable.
        const dropdownMenu = document.getElementById('dropdown-create-employee-menu');
        dropdownMenu.addEventListener('click', function (event) {
            if (event.target.classList.contains('dropdown-item')) {
                event.preventDefault();

                // Actualizar el botón y el campo oculto con el trabajo seleccionado.
                const selectedValue = event.target.getAttribute('data-value');
                const selectedValueText = event.target.textContent.trim();
                const button = document.getElementById('dropdownMenuButton1');

                const hiddenInput = document.getElementById('form-selected-job');

                button.textContent = `Cargo seleccionado: ${selectedValueText}`;
                hiddenInput.value = selectedValue;
            }
        });
    });
})();
