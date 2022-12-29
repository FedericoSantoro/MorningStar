const formulario = document.getElementById("formulario");
const usuario = document.getElementById("usuario");
const mail = document.getElementById("mail");
const pass1 = document.getElementById("pass1");
const pass2 = document.getElementById("pass2");
const hamburguesa = document.getElementById("hamburguesa");
const header = document.getElementById("header");
const navegacion = document.getElementById("navegacion");

function handleSubmit(e) {
  emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  const comprobacion = JSON.parse(localStorage.getItem(usuario.value));
  if (!comprobacion) {
    if (emailRegex.test(mail.value)) {
      if (pass1.value.length > 8) {
        if (pass1.value === pass2.value) {
          const email = mail.value;
          const pass = pass1.value;
          localStorage.setItem(usuario.value, JSON.stringify({ email, pass }));
          alert("Usuario registrado correctamente");
          formulario.reset();
        } else {
          alert("Las contraseñas no coinciden");
          e.preventDefault();
        }
      } else {
        alert("La contraseña debe tener al menos 8 caracteres");
        e.preventDefault();
      }
    } else {
      alert("Mail introducido es incorrecto");
      e.preventDefault();
    }
  } else {
    alert("Usuario " + usuario.value + " ya fue ingresado");
    e.preventDefault();
  }
}

let mostrado = false;

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

hamburguesa.addEventListener("click", mostrarNavbar);
formulario.addEventListener("submit", handleSubmit);
