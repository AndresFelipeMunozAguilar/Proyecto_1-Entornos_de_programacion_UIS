document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logout-btn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("jwt"); // Elimina el token JWT
            window.location.href = "../pages/MainPage/login.html"; // Redirige al login
        });
    }
});