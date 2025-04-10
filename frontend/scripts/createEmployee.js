document.getElementById('create-employee-form').addEventListener('submit', function (e) {
    // e.preventDefault(); // Previene el recargo de la página

    const employee = {
        name: document.getElementById('name').value,
        lastName: document.getElementById('lastName').value,
        phone: document.getElementById('phone').value,
        imageUrl: document.getElementById('imageUrl').value,
    };

    console.log("Datos del empleado:", employee);

    // Aquí usarás axios para enviar los datos al endpoint que especifiques
    // axios.post('http://localhost:8080/api/employee/addEmployee', employee)
    //   .then(response => console.log("Empleado creado:", response.data))
    //   .catch(error => console.error("Error al crear empleado:", error));
});
