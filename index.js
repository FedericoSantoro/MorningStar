const listaProductos = document.getElementById("listaProducto");
const navegacion = document.getElementById("navegacion");
const boton1 = document.getElementById("boton1");
const boton2 = document.getElementById("boton2");
const paginas = document.getElementById("paginas");
const categoria1 = document.getElementById("categoria1");
const categoria2 = document.getElementById("categoria2");
const categoria3 = document.getElementById("categoria3");
const categoria4 = document.getElementById("categoria4");
const categoria5 = document.getElementById("categoria5");
const header = document.getElementById("header");
const carrito = document.getElementById("carrito");
const sesion = document.getElementById("sesion");
const registro = document.getElementById("registro");

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
        <a href="iniciarSesion.html">Iniciar Sesion</a>
        `;
    registro.setAttribute("style", "display:block");
    registro.innerHTML = `<a href="registrarse.html">Registrarse</a>`
  }
}

sesionIniciada();

window.addEventListener("storage", () => {
  sesionIniciada();
});

window.addEventListener("scroll", () => {
  const { scrollTop } = document.documentElement;
  const top = scrollTop === 0;
  if (top) {
    header.className = "";
    carrito.className = "fa-solid fa-cart-shopping carrito";
  } else {
    header.className = "color";
    carrito.className = "fa-solid fa-cart-shopping carrito rosita";
  }
});

async function getProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    productos = response.json();
    return productos;
  } catch (error) {
    console.log(error);
  }
}
let carroCompra;

function comprobarCantidadProductos () {
  let cantidad_Productos = 0;
  for (let i = 0; i < carroCompras.length; i++) {
    cantidad_Productos += carroCompras[i].cantidad
  }
  if ( cantidad_Productos !== 0 ) {
    document.getElementById(
      "cantidadProductos"
    ).innerHTML = `${cantidad_Productos}`;
    document.getElementById("cantidadProductos").setAttribute("class", "cantidadProductos")
  }
  else {
    document.getElementById("cantidadProductos").setAttribute("class", "cantidadProductos disabled")
  }
}

function comprobarCarro() {
  if (localStorage.getItem("carro")) {
    carroCompras = JSON.parse(localStorage.getItem("carro"));
    console.log("ya hay algo");
  } else {
    carroCompras = [];
    console.log("no hay nada");
  }
  comprobarCantidadProductos()
}

comprobarCarro();

function agregarCarrito(titulo, precio, imagen, idProducto, color) {
  let buscarProducto = carroCompras.find(
    (producto) => producto.idProducto === idProducto
  );
  if (buscarProducto) {
    nuevoCarro = carroCompras.map((producto) => {
      if (producto.idProducto === idProducto) {
        producto.cantidad++;
      }
      return producto;
    });
    carroCompra = nuevoCarro;
  } else {
    console.log(color);
    carroCompras = [
      ...carroCompras,
      { idProducto, titulo, precio, imagen, cantidad: 1, color },
    ];
  }
  localStorage.setItem("carro", JSON.stringify(carroCompras));
  comprobarCantidadProductos()
  console.log(carroCompras);
}

let categoria = "all",
  pagina = 0,
  paginaActual = 1;

async function renderizarProductos(categoria, pagina, paginaActual, productos) {
  try {
    listaProductos.innerHTML = ``;
    console.log("productos: ", productos);
    console.log("categoria: ", categoria);
    console.log("pagina actual: ", paginaActual);
    console.log("pagina: ", pagina);
    let productosFiltrados;
    let color;

    if (categoria === "all") {
      productosFiltrados = productos;
    } else {
      productosFiltrados = productos.filter(
        (producto) => producto.category === categoria
      );
    }
    paginas.innerHTML = paginaActual;
    if (paginaActual === 1) {
      boton1.className = "fa-solid fa-arrow-left flechaIzquierda disabled";
    } else {
      boton1.className = "fa-solid fa-arrow-left flechaIzquierda";
    }
    if (paginaActual === Math.ceil(productosFiltrados.length / 4)) {
      boton2.className = "fa-solid fa-arrow-right flechaDerecha disabled";
    } else {
      boton2.className = "fa-solid fa-arrow-right flechaDerecha";
    }
    for (let i = pagina; i < pagina + 4; i++) {
      if (productosFiltrados[i].category === "men's clothing") {
        color = "naranja";
      } else if (productosFiltrados[i].category === "electronics") {
        color = "verde";
      } else if (productosFiltrados[i].category === "jewelery") {
        color = "celeste";
      } else {
        color = "morado";
      }
      const botonAgregar = document.createElement("button");
      botonAgregar.setAttribute(
        "onclick",
        `agregarCarrito( "${productosFiltrados[i].title}", ${productosFiltrados[i].price}, "${productosFiltrados[i].image}", ${productosFiltrados[i].id},"${color}" )`
      );
      botonAgregar.innerText = "Agregar al carrito";
      listaProductos.innerHTML += `
                <div class="producto">
                    <span class="${color}"></span>
                    <div class="imagenProducto">
                      <img src="${productosFiltrados[i].image}" alt="Producto" />
                    </div>
                    <div class="informacionProducto">
                      <h3>${productosFiltrados[i].title}</h3>
                      <div class="rating-precio">
                        <div class="rating">
                          <p>Rating: ${productosFiltrados[i].rating.rate}</p>
                          <img src="Assets/Estrella.png" alt="estrellas" />
                        </div>
                        <p class="precio">$${productosFiltrados[i].price}</p>
                      </div>
                      <div id="botonCarrito${i}"></div>
                    </div>
                    <div class="imagenInformacion centered">
                      <div class="flechita">
                          <i class="fa-solid fa-circle-info icon-info" data-title="${productosFiltrados[i].description}"></i>
                      </div>
                    </div>
                  </div>
                `;
      document.getElementById(`botonCarrito${i}`).appendChild(botonAgregar);
    }
  } catch (error) {
    console.log(error);
  }
}

function cambiarCategoria(nuevaCategoria) {
  categoria = nuevaCategoria;
  pagina = 0;
  paginaActual = 1;
  switch ( nuevaCategoria ) {
    case "all":
    categoria1.setAttribute("class", "categoriaActiva")
    categoria2.setAttribute("class", "")
    categoria3.setAttribute("class", "")
    categoria4.setAttribute("class", "")
    categoria5.setAttribute("class", "")
    break;
    case "men's clothing":
    categoria2.setAttribute("class", "categoriaActiva")
    categoria1.setAttribute("class", "")
    categoria3.setAttribute("class", "")
    categoria4.setAttribute("class", "")
    categoria5.setAttribute("class", "")
    break;
    case "women's clothing":
    categoria3.setAttribute("class", "categoriaActiva")
    categoria2.setAttribute("class", "")
    categoria1.setAttribute("class", "")
    categoria4.setAttribute("class", "")
    categoria5.setAttribute("class", "")
    break;
    case "jewelery":
    categoria4.setAttribute("class", "categoriaActiva")
    categoria2.setAttribute("class", "")
    categoria3.setAttribute("class", "")
    categoria1.setAttribute("class", "")
    categoria5.setAttribute("class", "")
    break;
    case "electronics":
    categoria5.setAttribute("class", "categoriaActiva")
    categoria2.setAttribute("class", "")
    categoria3.setAttribute("class", "")
    categoria4.setAttribute("class", "")
    categoria1.setAttribute("class", "")
    break;
  }
}

function cambiarPagina(action) {
  if (action === "-") {
    pagina -= 4;
    paginaActual--;
  } else {
    pagina += 4;
    paginaActual++;
  }
}

async function init() {
  const productos = await getProducts();
  renderizarProductos(categoria, pagina, paginaActual, productos);
  boton1.addEventListener("click", () => {
    cambiarPagina("-");
    renderizarProductos(categoria, pagina, paginaActual, productos);
  });
  boton2.addEventListener("click", () => {
    cambiarPagina("+");
    renderizarProductos(categoria, pagina, paginaActual, productos);
  });
  categoria1.addEventListener("click", () => {
    cambiarCategoria("all");
    renderizarProductos(categoria, pagina, paginaActual, productos);
  });
  categoria2.addEventListener("click", () => {
    cambiarCategoria("men's clothing");
    renderizarProductos(categoria, pagina, paginaActual, productos);
  });
  categoria3.addEventListener("click", () => {
    cambiarCategoria("women's clothing");
    renderizarProductos(categoria, pagina, paginaActual, productos);
  });
  categoria4.addEventListener("click", () => {
    cambiarCategoria("jewelery");
    renderizarProductos(categoria, pagina, paginaActual, productos);
  });
  categoria5.addEventListener("click", () => {
    cambiarCategoria("electronics");
    renderizarProductos(categoria, pagina, paginaActual, productos);
  });
}

init();
