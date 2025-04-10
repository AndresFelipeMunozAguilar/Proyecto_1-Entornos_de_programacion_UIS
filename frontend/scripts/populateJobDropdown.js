document.addEventListener("DOMContentLoaded", () => {
    const dropdownMenu = document.getElementById("dropdown-create-employee-menu");

    const jobs = [
        { id: 1, name: "UI/UX" },
        { id: 2, name: "Programador" },
        { id: 3, name: "Administrador de Bases de Datos" }
    ];

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
});
