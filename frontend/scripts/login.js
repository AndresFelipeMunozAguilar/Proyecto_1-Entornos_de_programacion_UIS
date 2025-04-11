document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita el envío por defecto del formulario

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:8080/api/account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password })
    });

    if (response.ok) {
        const token = await response.text();
        localStorage.setItem("jwt", token); // CORREGIDO: usar 'jwt' como clave
        window.location.href = "../index.html";
    } else {
        alert("Credenciales incorrectas.");
    }
});