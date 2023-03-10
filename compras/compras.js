const sesion = document.getElementById("sesion");
const registro = document.getElementById("registro");
const carritoCompra = document.getElementById("carritoCompra");
const hamburguesa = document.getElementById("hamburguesa");
const navegacionHamburguesa = document.getElementById("navegacion");
const iconoCantidadProductos = document.getElementById("cantidadProductos");
const volverCompra = document.getElementById("volverCompra");
const volverSesion = document.getElementById("volverSesion");
const volverNoSesion = document.getElementById("volverNoSesion");
const volverVacio = document.getElementById("volverVacio");

let mostrado = false;
let carroCompras = cargarDatos();

function showAlert(id) {
  document.getElementById(id).setAttribute("class", "alertas mostrarAlerta");
  overlay.setAttribute("class", "overlay mostrarAlerta");
}

function deleteAlert( id ) {
  document.getElementById(id).setAttribute("class", "alertas");
  overlay.setAttribute("class", "overlay");
}

function mostrarNavbar() {
  if (mostrado) {
    header.setAttribute("class", "");
    navegacionHamburguesa.setAttribute("class", "");
    iconoCantidadProductos.setAttribute(
      "class",
      "cantidadProductos cantidadProductosDisabled"
    );
    mostrado = false;
  } else {
    if (carroCompras.length > 0) {
      iconoCantidadProductos.setAttribute("class", "cantidadProductos");
    } else {
      iconoCantidadProductos.setAttribute(
        "class",
        "cantidadProductos cantidadProductosDisabled"
      );
    }
    header.setAttribute("class", "navbarMostradoHeader");
    navegacionHamburguesa.setAttribute("class", "navbarMostrado");
    mostrado = true;
  }
}

function deslogear() {
  localStorage.setItem("logeado", false);
  showAlert("alertaSesion");
  sesionIniciada();
}

function sesionIniciada() {
  const comprobacion = JSON.parse(localStorage.getItem("logeado"));

  if (comprobacion) {
    console.log("Esta logeado");
    sesion.innerHTML = "";
    const boton = document.createElement("button");
    boton.setAttribute("onclick", "deslogear()");
    boton.setAttribute("class", "cerrarSesion");
    boton.innerText = "Cerrar Sesi??n";
    sesion.appendChild(boton);
    registro.setAttribute("style", "display:none");
  } else {
    console.log("No esta logeado");
    sesion.innerHTML = `
          <a href="../iniciarSesion/iniciarSesion.html">Iniciar Sesion</a>
          `;
    registro.setAttribute("style", "display:block");
    registro.innerHTML = `<a href="../registrarse/registrarse.html">Registrarse</a>`;
  }
}

function cargarDatos() {
  if (JSON.parse(localStorage.getItem("carro"))) {
    console.log("Ya hay algo en el carro");
    return JSON.parse(localStorage.getItem("carro"));
  } else {
    console.log("No hay nada en el carro");
    return [];
  }
}

function cambiarCantidad(accion, index) {
  let nuevoCarro;
  if (accion === "-") {
    nuevoCarro = carroCompras.map((producto) => {
      if (producto.idProducto === index) {
        producto.cantidad--;
      }
      return producto;
    });
    carroCompras = nuevoCarro.filter((producto) => producto.cantidad != 0);
  } else if (accion === "+") {
    nuevoCarro = carroCompras.map((producto) => {
      if (producto.idProducto === index) {
        producto.cantidad++;
      }
      return producto;
    });
    carroCompras = nuevoCarro;
  } else {
    carroCompras = carroCompras.filter(
      (producto) => producto.idProducto !== index
    );
  }
  localStorage.setItem("carro", JSON.stringify(carroCompras));
  renderizarCarrito();
}

function comprobacionRequisitos() {
  if (carroCompras.length > 0) {
    if (JSON.parse(localStorage.getItem("logeado")) === true) {
      showAlert("alertaCompra");
    } else {
      showAlert("alertaNoSesion");
    }
  } else {
    showAlert("alertaVacio");
  }
}

function renderizarCarrito() {
  console.log("Productos en el carro: ", carroCompras);
  carritoCompra.innerHTML = ``;
  let precioTotal = 0,
    cantidad_Productos = 0;
  if (carroCompras.length > 0) {
    for (let i = 0; i < carroCompras.length; i++) {
      const botonMas = document.createElement("button");
      botonMas.innerHTML += `<i class="fa-solid fa-plus"></i>`;
      botonMas.setAttribute("class", "botonMas");
      botonMas.setAttribute("onclick", "cambiarCantidad('+')");
      botonMas.setAttribute(
        "onclick",
        `cambiarCantidad("+", ${carroCompras[i].idProducto})`
      );
      const botonMenos = document.createElement("button");
      botonMenos.innerHTML = `<i class="fa-solid fa-minus"></i>`;
      botonMenos.setAttribute("class", "botonMenos");
      botonMenos.setAttribute(
        "onclick",
        `cambiarCantidad("-", ${carroCompras[i].idProducto})`
      );
      const botonBorrar = document.createElement("button");
      botonBorrar.innerHTML = `<i class="fa-solid fa-trash"></i>`;
      botonBorrar.setAttribute("class", "botonBorrar");
      botonBorrar.setAttribute("title", "Borrar Producto");
      botonBorrar.setAttribute(
        "onclick",
        `cambiarCantidad("borrar", ${carroCompras[i].idProducto})`
      );
      let precio = carroCompras[i].precio * carroCompras[i].cantidad;
      precioTotal += precio;
      carritoCompra.innerHTML += `
      <div class="producto">
      <span class="${carroCompras[i].color}"></span>
      <div class="imagen-caracteristicas">
        <div class="imagen"> 
        <img loading="lazy"
          src="${carroCompras[i].imagen}"
          alt="Imagen producto"
        />
        </div>
        <div class="nombre-precio">
          <h3 class="nombre">${carroCompras[i].titulo}</h3>
          <h3 class="precio">$${precio.toFixed(2)}</h3>
        </div>
      </div>
      <div class="cantidad">
            <div id="botonMenos${i}"><button class="botonMenos"></button></div>
            <h3>${carroCompras[i].cantidad}</h3>
            <div id="botonMas${i}"><button class="botonMas"></button></div>
          </div>
          <div id="botonBorrar${i}"></div>
    </div>
    `;
      document.getElementById(`botonMenos${i}`).appendChild(botonMenos);
      document.getElementById(`botonMas${i}`).appendChild(botonMas);
      document.getElementById(`botonBorrar${i}`).appendChild(botonBorrar);
      document.getElementById(
        "precioTotal"
      ).innerHTML = `$${precioTotal.toFixed(2)}`;
      cantidad_Productos += carroCompras[i].cantidad;
    }
    iconoCantidadProductos.innerHTML = `${cantidad_Productos}`;
    iconoCantidadProductos.setAttribute("class", "cantidadProductos");
  } else {
    iconoCantidadProductos.setAttribute("class", "cantidadProductosDisabled");

    carritoCompra.innerHTML = `
    <div class="carroVacio">
          <i class="fa-regular fa-face-sad-tear"></i>
          <h3>Todav??a no hay nada en el carrito</h3>
        </div>
    `;
    document.getElementById("precioTotal").innerHTML = `Total: $${precioTotal}`;
    //document.getElementById("botonPagar").setAttribute("class", "disabled")
  }
  document
    .getElementById("botonPagar")
    .setAttribute("onclick", "comprobacionRequisitos()");
}

function init() {
  volverVacio.addEventListener("click", () => deleteAlert("alertaVacio"));
  volverNoSesion.addEventListener("click", () => deleteAlert("alertaNoSesion"));
  volverSesion.addEventListener("click", () => deleteAlert("alertaSesion"));
  volverCompra.addEventListener("click", () => deleteAlert("alertaCompra"));
  sesionIniciada();
  hamburguesa.addEventListener("click", mostrarNavbar);
  renderizarCarrito();
}

init();
