document.getElementById("register-form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const employeeId = document.getElementById("employeeId").value;

  const accountData = {
    email: email,
    password: password,
    id_employee: {
      idEmployee: parseInt(employeeId) 
    }
  };

  try {
    const response = await fetch("http://localhost:8080/api/account/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(accountData)
    });

    if (response.ok) {
      alert("Cuenta creada exitosamente. Ahora puedes iniciar sesión.");
      window.location.href = "./login.html";
    } else {
      const errorMsg = await response.text();
      alert("Error al crear la cuenta: " + errorMsg);
    }
  } catch (error) {
    console.error("Error de red:", error);
    alert("Error de red al intentar registrar.");
  }
});