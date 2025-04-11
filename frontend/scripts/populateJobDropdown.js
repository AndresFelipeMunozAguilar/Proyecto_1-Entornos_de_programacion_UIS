(() => {
    // Variables para configurar la conexión con la API.
    const host = "http://localhost";
    const port = "8080";
    const endpoint = "/api/job";

    // Esperar a que el DOM esté completamente cargado antes de ejecutar el código.
    document.addEventListener("DOMContentLoaded", () => {
        // Obtener el token del almacenamiento local.
        const token = localStorage.getItem("jwt");
        if (!token) {
            console.error("Token JWT no encontrado en localStorage.");
            return;
        }

        // Obtener el menú desplegable donde se insertarán los trabajos para la creación
        const createDropdownMenu = document.getElementById("dropdown-create-employee-menu");
        // Obtener el menú desplegable donde se insertarán los trabajos para la actualización
        const updateDropdownMenu = document.getElementById("update-dropdown-job-menu");

        // Realizar una solicitud a la API para obtener los trabajos disponibles
        axios.get(`${host}:${port}${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                const jobs = response.data.map(job => ({
                    id: job.idJob,
                    name: job.name
                }));

                if (jobs.length === 0) {
                    console.error("No se encontraron trabajos en la respuesta.");
                    return;
                }

                // Crear un elemento de lista para cada trabajo y agregarlo a ambos menús
                jobs.forEach(job => {
                    const createListItem = document.createElement("li");
                    const createLink = document.createElement("a");
                    createLink.className = "dropdown-item";
                    createLink.href = "#";
                    createLink.dataset.value = job.id;
                    createLink.textContent = job.name;

                    createListItem.appendChild(createLink);
                    createDropdownMenu.appendChild(createListItem);

                    const updateListItem = createListItem.cloneNode(true);
                    updateDropdownMenu.appendChild(updateListItem);
                });
            })
            .catch(error => {
                console.error("Error al obtener los trabajos:", error);
            });
    });
})();