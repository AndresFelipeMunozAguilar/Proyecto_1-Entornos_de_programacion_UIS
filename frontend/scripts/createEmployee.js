document.getElementById('create-employee-form').addEventListener('submit', function (e) {
    // e.preventDefault(); // Previene el recargo de la página

    const employee = {
        name: document.getElementById('name').value,
        lastName: document.getElementById('lastName').value,
        phone: document.getElementById('phone').value,
        jobId: document.getElementById('form-selected-job').value,
        imageUrl: document.getElementById('imageUrl').value,
    };

    console.log("Datos del empleado:", employee);

    // Aquí usarás axios para enviar los datos al endpoint que especifiques
    // axios.post('http://localhost:8080/api/employee/addEmployee', employee)
    //   .then(response => console.log("Empleado creado:", response.data))
    //   .catch(error => console.error("Error al crear empleado:", error));
});


// Función para cambiar el contenido del dropdown button, 
// basado en la elección del usuario
// Escucha los clics en los ítems del dropdown
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function (event) {
        event.preventDefault();

        const selectedValue = this.getAttribute('data-value');
        const selectedValueText = this.textContent.trim();
        const button = document.getElementById('dropdownMenuButton1');
        /**
         * Recupera el elemento de entrada oculto utilizado para almacenar 
         * la información del trabajo seleccionado en el formulario. Este 
         * elemento es crucial para actualizar dinámicamente el texto del 
         * botón de modo que refleje el nombre trabajo seleccionado.
         */
        const hiddenInput = document.getElementById('form-selected-job');

        button.textContent = `Cargo seleccionado: ${selectedValueText}`;
        hiddenInput.value = selectedValue;
    });
});