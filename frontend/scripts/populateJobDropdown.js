(() => {
    // Variables para configurar la conexión con la API.
    const host = "http://localhost";
    const port = "8080";
    const endpoint = "/api/job";

    // Esperar a que el DOM esté completamente cargado antes de ejecutar el código.
    document.addEventListener("DOMContentLoaded", () => {
        // Obtener el menú desplegable donde se insertarán los trabajos.
        const dropdownMenu = document.getElementById("dropdown-create-employee-menu");

        // Realizar una solicitud a la API para obtener los trabajos disponibles.
        axios.get(`${host}:${port}${endpoint}`)
            .then(response => {
                // Mapear los datos de los trabajos para obtener solo los campos necesarios.
                const jobs = response.data.map(job => ({
                    id: job.idJob,
                    name: job.name
                }));

                if (jobs.length === 0) {
                    // Mostrar un mensaje de error si no se encontraron trabajos.
                    console.error("No se encontraron trabajos en la respuesta.");
                    return;
                }

                // Crear un elemento de lista para cada trabajo y agregarlo al menú.
                jobs.forEach(job => {
                    const listItem = document.createElement("li");
                    const link = document.createElement("a");
                    link.className = "dropdown-item";
                    link.href = "#";
                    link.dataset.value = job.id;
                    link.textContent = job.name;

                    listItem.appendChild(link);
                    dropdownMenu.appendChild(listItem);
                });
            })
            .catch(error => {
                // Mostrar un mensaje de error si la solicitud falla.
                console.error("Error al obtener los trabajos:", error);
            });
    });
})();
