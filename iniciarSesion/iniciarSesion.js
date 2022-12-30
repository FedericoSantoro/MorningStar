const formulario = document.getElementById("formulario");
const usuario = document.getElementById("usuario");
const mail = document.getElementById("mail");
const password = document.getElementById("password");
const hamburguesa = document.getElementById("hamburguesa");
const header = document.getElementById("header");
const navegacion = document.getElementById("navegacion");
const overlay = document.getElementById("overlay");
const volverContraseña = document.getElementById("volverContraseña");
const volverMail = document.getElementById("volverMail");
const volverUsuario = document.getElementById("volverUsuario");
const volverUsuarioIncumple = document.getElementById("volverUsuarioIncumple");

let mostrado = false;

function showAlert(id) {
  document.getElementById(id).setAttribute("class", "alertas mostrarAlerta");
  overlay.setAttribute("class", "overlay mostrarAlerta");
}

function handleSubmit(e) {
  e.preventDefault();
  if (usuario.value.length !== 0) {
    const email = mail.value;
    const pass = password.value;
    const comprobacion = JSON.parse(localStorage.getItem(usuario.value));
    if (comprobacion) {
      console.log(comprobacion);
      if (comprobacion.email === email) {
        if (comprobacion.pass === pass) {
          localStorage.setItem("logeado", true);
          formulario.reset();
          showAlert("alertaRegistro");
        } else {
          showAlert("alertaContraseña");
        }
      } else {
        showAlert("alertaMail");
      }
    } else {
      showAlert("alertaUsuario");
    }
  } else {
    showAlert("alertaUsuarioIncumple");
  }
}

function mostrarNavbar() {
  if (mostrado) {
    header.setAttribute("class", "");
    navegacion.setAttribute("class", "");
    mostrado = false;
  } else {
    header.setAttribute("class", "navbarMostradoHeader");
    navegacion.setAttribute("class", "navbarMostrado");
    mostrado = true;
  }
}

function deleteAlert(id) {
  document.getElementById(id).setAttribute("class", "alertas");
  overlay.setAttribute("class", "overlay");
}

function init() {
  volverUsuarioIncumple.addEventListener("click", () => deleteAlert("alertaUsuarioIncumple"))
  volverUsuario.addEventListener("click", () => deleteAlert("alertaUsuario"));
  volverContraseña.addEventListener("click", () =>
    deleteAlert("alertaContraseña")
  );
  volverMail.addEventListener("click", () => deleteAlert("alertaMail"));
  hamburguesa.addEventListener("click", mostrarNavbar);
  formulario.addEventListener("submit", handleSubmit);
}

init();
