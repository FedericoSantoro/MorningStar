const formulario = document.getElementById("formulario");
const usuario = document.getElementById("usuario");
const mail = document.getElementById("mail");
const password = document.getElementById("password");

function handleSubmit(e) {
  const email = mail.value;
  const pass = password.value;
  const comprobacion = JSON.parse(localStorage.getItem(usuario.value));
  if (comprobacion) {
    console.log(comprobacion);
    console.log(" mail viejo: ", comprobacion.email, " y mail nuevo: ", email);
    if (comprobacion.email === email) {
      if (comprobacion.pass === pass) {
        alert("Iniciaste Sesion correctamente");
        localStorage.setItem("logeado", true);
        formulario.reset();
      } else {
        alert("Contraseña incorrecta");
        e.preventDefault();
      }
    } else {
      alert("Mail incorrecto");
      e.preventDefault();
    }
  } else {
    alert("Usuario " + usuario.value + " no encontrado");
    e.preventDefault();
  }
}

formulario.addEventListener("submit", handleSubmit);
