const sesion = document.getElementById("sesion");
const registro = document.getElementById("registro");
const carritoCompra = document.getElementById("carritoCompra");

function deslogear() {
  localStorage.setItem("logeado", false);
  alert("Sesión cerrada correctamente");
  sesionIniciada();
}

function sesionIniciada() {
  const comprobacion = JSON.parse(localStorage.getItem("logeado"));
  console.log(comprobacion);
  if (comprobacion) {
    sesion.innerHTML = "";
    const boton = document.createElement("button");
    boton.setAttribute("onclick", "deslogear()");
    boton.setAttribute("class", "cerrarSesion");
    boton.innerText = "Cerrar Sesión";
    sesion.appendChild(boton);
    registro.setAttribute("style", "display:none");
  } else {
    sesion.innerHTML = `
          <a href="../iniciarSesion/iniciarSesion.html">Iniciar Sesion</a>
          `;
    registro.setAttribute("style", "display:block");
    registro.innerHTML = `<a href="../registrarse/registrarse.html">Registrarse</a>`;
  }
}

let carroCompras = JSON.parse(localStorage.getItem("carro"));

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
      alert("Procediendo con la compra");
    } else {
      alert("No ha iniciado sesión, por favor hagalo y vuelva a intentar");
    }
  } else {
    alert("Debe tener al menos un item en el carrito");
  }
}

function renderizarCarrito() {
  console.log(carroCompras);
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
        <img
          src="${carroCompras[i].imagen}"
          alt="Imagen producto"
        />
        <div class="nombre-precio">
          <h3 class="nombre">${carroCompras[i].titulo}</h3>
          <h3 class="precio">$${precio}</h3>
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
      ).innerHTML = `Total: $${precioTotal}`;
      cantidad_Productos += carroCompras[i].cantidad;
    }
    document.getElementById(
      "cantidadProductos"
    ).innerHTML = `${cantidad_Productos}`;
    document
      .getElementById("cantidadProductos")
      .setAttribute("class", "cantidadProductos");
  } else {
    document
      .getElementById("cantidadProductos")
      .setAttribute("class", "cantidadProductos disabled");

    carritoCompra.innerHTML = `
    <div class="carroVacio">
          <i class="fa-regular fa-face-sad-tear"></i>
          <h3>Todavía no hay nada en el carrito</h3>
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
  sesionIniciada();
  renderizarCarrito();
}

init();
