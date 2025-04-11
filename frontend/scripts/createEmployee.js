(() => {
    const host = "http://localhost";
    const port = "8080";
    const endpoint = "/api/employee/createEmployee";

    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById('create-employee-form').addEventListener('submit', function (e) {
            const jobInput = document.getElementById('form-selected-job');
            const jobLabel = document.querySelector('label[for="form-selected-job"]');

            if (!jobInput.value) {
                alert("Por favor, selecciona un trabajo antes de continuar.");
                jobLabel.classList.add('text-danger');
                jobLabel.classList.remove('form-label');
                e.preventDefault();
                return;
            } else {
                jobLabel.classList.remove('text-danger');
                jobLabel.classList.add('form-label');
            }

            const employee = {
                name: document.getElementById('name').value,
                lastName: document.getElementById('lastName').value,
                job: {
                    idJob: parseInt(jobInput.value, 10)
                },
                phone: document.getElementById('phone').value,
                imageUrl: document.getElementById('imageUrl').value,
            };

            // Obtener el token del almacenamiento local
            const token = localStorage.getItem("jwt");
            if (!token) {
                alert("No se encontró un token de autenticación. Por favor inicia sesión.");
                e.preventDefault();
                return;
            }

            // Enviar datos del empleado con encabezado Authorization
            axios.post(`${host}:${port}${endpoint}`, employee, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log("Empleado creado exitosamente:", response.data);
                    alert("Empleado creado exitosamente.");
                    window.location.reload();
                })
                .catch(error => {
                    console.error("Error al crear empleado:", error);
                    alert("Error al crear empleado. Por favor, revisa los datos e inténtalo nuevamente.");
                });

            e.preventDefault();
        });

        const dropdownMenu = document.getElementById('dropdown-create-employee-menu');
        dropdownMenu.addEventListener('click', function (event) {
            if (event.target.classList.contains('dropdown-item')) {
                event.preventDefault();
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