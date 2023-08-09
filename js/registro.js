let registroNombre = document.getElementById("registerNombre");
let registroApellido = document.getElementById("registerApellido");
let registroUsuario = document.getElementById("registerUser");
let registroEmail = document.getElementById("registerEmail");
let registroContraseña = document.getElementById("registerPassword");
let btnConfirmar = document.getElementById("btnRegistrar");

const datosRegistro = [];

class Usuario {
  constructor(nombre, apellido, usuario, email, contraseña) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.usuario = usuario;
    this.email = email;
    this.contraseña = contraseña;
  }
}

function registro() {
  btnConfirmar.onclick = () => {
    if (
      registroNombre.value === "" ||
      registroApellido.value === "" ||
      registroUsuario.value === "" ||
      registroEmail.value === "" ||
      registroContraseña.value === ""
    ) {
      Swal.fire({
        title: "Error",
        text: "Por favor complete todos los campos del formulario",
        icon: "error",
      });
      return false;
    }
    const newUser = new Usuario(
      registroNombre.value,
      registroApellido.value,
      registroUsuario.value,
      registroEmail.value,
      registroContraseña.value
    );

    const usuariosRegistrados =
      JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuariosRegistrado = usuariosRegistrados.find(
      (user) => user.usuario === newUser.usuario
    );

    if (usuariosRegistrado) {
      Swal.fire({
        title: "Error",
        text: "El nombre de usuario que intenta registrar, ya se encuentra registrado",
        icon: "error",
      });
    } else {
      datosRegistro.push(newUser);
      datosRegistro.sort((a, b) => a.nombre.localeCompare(b.nombre));
      localStorage.setItem("usuarios", JSON.stringify(datosRegistro));

      Swal.fire({
        title: "Registro exitoso",
        text: `Creación de usuario exitosa, su usuario es: ${newUser.usuario}`,
        icon: "success",
      }).then(() => (window.location.href = "../index.html"));
    }
    return false;
  };
}
registro();
