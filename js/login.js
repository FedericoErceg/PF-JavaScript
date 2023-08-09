const sesionUsuario = document.getElementById("loginUser");
const sesionContraseña = document.getElementById("loginPassword");
const btnStartSecion = document.getElementById("btnInicioDeSesion");

btnStartSecion.addEventListener("click", () => {
  const usuarioRegistrado = JSON.parse(localStorage.getItem("usuarios")) || [];
  const busquedaDeUsuario = usuarioRegistrado.find((user) => {
    return (
      user.usuario === sesionUsuario.value &&
      user.contraseña === sesionContraseña.value
    );
  });

  if (sesionUsuario.value === "" && sesionContraseña.value === "") {
    Toastify({
      text: "Por favor, complete los campos",
      duration: 1400,
      className: "emptyInfo",
      gravity: "bottom",
      posotion: "right",
      style: {
        background: "linear-gradient(to right, #D8ABAB, red)",
      },
    }).showToast();
  } else if (busquedaDeUsuario) {
    console.log("Inicio de sesión exitoso");

    Toastify({
      text: "Inicio de sesión exitoso",
      duration: 600,
      className: "info",
      gravity: "bottom",
      posotion: "right",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();

    setTimeout(() => {
      window.location.href = "./paginas/ecomerce.html";
    }, 1200);
  } else {
    console.log("Inicio de sesión fallido");
    swal.fire({
      title: "Inicio de sesión fallido",
      text: "por favor vuelva a intentarlo",
      icon: "error",
    });
  }
});
