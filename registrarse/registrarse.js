const formulario = document.getElementById("formulario");
const usuario = document.getElementById("usuario");
const mail = document.getElementById("mail");
const pass1 = document.getElementById("pass1");
const pass2 = document.getElementById("pass2");
const hamburguesa = document.getElementById("hamburguesa");
const header = document.getElementById("header");
const navegacion = document.getElementById("navegacion");
const volverContraseñaDiferente = document.getElementById(
  "volverContraseñaDiferente"
);
const volverContraseñaIncumple = document.getElementById(
  "volverContraseñaIncumple"
);
const volverMail = document.getElementById("volverMail");
const volverUsuario = document.getElementById("volverUsuario");
const volverUsuarioIncumple = document.getElementById("volverUsuarioIncumple");
const overlay = document.getElementById("overlay");

let mostrado = false;

function showAlert(id) {
  document.getElementById(id).setAttribute("class", "alertas mostrarAlerta");
  overlay.setAttribute("class", "overlay mostrarAlerta");
}

function handleSubmit(e) {
  e.preventDefault();
  const emailRegex =
    /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  if (usuario.value.length !== 0) {
    const comprobacion = JSON.parse(localStorage.getItem(usuario.value));
    if (!comprobacion && usuario.value.length !== 0) {
      if (emailRegex.test(mail.value)) {
        if (pass1.value.length > 8) {
          if (pass1.value === pass2.value) {
            const email = mail.value;
            const pass = pass1.value;
            localStorage.setItem(
              usuario.value,
              JSON.stringify({ email, pass })
            );
            showAlert("alertaRegistro");
            formulario.reset();
          } else {
            showAlert("alertaContraseñaDiferente");
          }
        } else {
          showAlert("alertaContraseñaIncumple");
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

function deleteAlert( id ) {
  document.getElementById(id).setAttribute("class", "alertas");
  overlay.setAttribute("class", "overlay");
}

function init() {
  hamburguesa.addEventListener("click", mostrarNavbar);
  formulario.addEventListener("submit", handleSubmit);
  volverContraseñaDiferente.addEventListener("click", () => deleteAlert("alertaContraseñaDiferente"));
  volverContraseñaIncumple.addEventListener("click", () => deleteAlert("alertaContraseñaIncumple"));
  volverMail.addEventListener("click", () => deleteAlert("alertaMail"));
  volverUsuario.addEventListener("click", () => deleteAlert("alertaUsuario"));
  volverUsuarioIncumple.addEventListener("click", () => deleteAlert("alertaUsuarioIncumple"));
}

init();
