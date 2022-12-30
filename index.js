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
const hamburguesa = document.getElementById("hamburguesa");
const navegacionHamburguesa = document.getElementById("navegacion");
const iconoCantidadProductos = document.getElementById("cantidadProductos");
const mostrarCategorias = document.getElementById("mostrarCategorias");
const ocultarCategorias = document.getElementById("ocultarCategorias");
const listaCategorias = document.getElementById("listaCategorias");
const volverSesion = document.getElementById("volverSesion");
const volverProducto = document.getElementById("volverProducto");
const volverConsulta = document.getElementById("volverConsulta");
const volverNombre = document.getElementById("volverNombre");
const volverTelefono = document.getElementById("volverTelefono");
const volverMail = document.getElementById("volverMail");
const volverMensaje = document.getElementById("volverMensaje");
const formulario = document.getElementById("formulario");
const nombre = document.getElementById("nombre");
const mail = document.getElementById("mail");
const telefono = document.getElementById("telefono");
const mensaje = document.getElementById("mensaje");
const volverErrorConsulta = document.getElementById("volverErrorConsulta");

let categoria = "all";
let pagina = 0;
let paginaActual = 1;
let mostrado = false;
let carroCompras;

async function handleFormSubmit(e) {
  e.preventDefault();
  try {
    const emailRegex =
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (nombre.value.length !== 0) {
      if (emailRegex.test(mail.value)) {
        if (telefono.value.length > 8) {
          if (mensaje.value.length >= 10) {
            const consultaValores = {
              name: nombre.value,
              phone: telefono.value,
              email: mail.value,
              message: mensaje.value,
            };
            console.log("Datos de la consulta: ", consultaValores);
            const response = await fetch(`https://web-prodsuction-130d.up.railway.app/api/send-email`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(consultaValores),
            });
            if ( response.status === 200 ) {
              showAlert("alertaConsulta");
              formulario.reset();
            }
          } else {
            showAlert("alertaMensaje");
          }
        } else {
          showAlert("alertaTelefono");
        }
      } else {
        showAlert("alertaMail");
      }
    } else {
      showAlert("alertaNombre");
    }
  } catch (error) {
    console.log(error);
    showAlert("errorConsulta")
  }
}

function showAlert(id) {
  document.getElementById(id).setAttribute("class", "alertas mostrarAlerta");
  overlay.setAttribute("class", "overlay mostrarAlerta");
}

function deleteAlert(id) {
  document.getElementById(id).setAttribute("class", "alertas");
  overlay.setAttribute("class", "overlay");
}

function mostrarFiltros(mostrado) {
  if (mostrado) {
    ocultarCategorias.setAttribute("class", "");
    mostrarCategorias.setAttribute("class", "mostrarFlecha");
    listaCategorias.setAttribute("class", "");
  } else {
    ocultarCategorias.setAttribute("class", "mostrarFlecha");
    mostrarCategorias.setAttribute("class", "");
    listaCategorias.setAttribute("class", "mostrarCategorias");
  }
}

function headerNegro() {
  const { scrollTop } = document.documentElement;
  const top = scrollTop === 0;
  if (!mostrado && top) {
    header.className = "";
    carrito.className = "fa-solid fa-cart-shopping carrito";
  } else {
    header.className = "color";
    carrito.className = "fa-solid fa-cart-shopping carrito rosita";
  }
}

function mostrarNavbar() {
  if (mostrado) {
    header.setAttribute("class", "");
    navegacionHamburguesa.setAttribute("class", "");
    mostrado = false;
  } else {
    header.setAttribute("class", "navbarMostradoHeader");
    navegacionHamburguesa.setAttribute("class", "navbarMostrado");
    mostrado = true;
  }
  headerNegro();
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
    boton.innerText = "Cerrar Sesión";
    sesion.appendChild(boton);
    registro.setAttribute("style", "display:none");
  } else {
    console.log("No esta logeado");
    sesion.innerHTML = `
        <a href="./iniciarSesion/iniciarSesion.html">Iniciar Sesion</a>
        `;
    registro.setAttribute("style", "display:block");
    registro.innerHTML = `<a href="./registrarse/registrarse.html">Registrarse</a>`;
  }
}

async function getProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    boton1.setAttribute("class", "fa-solid fa-arrow-left flechaIzquierda");
    boton2.setAttribute("class", "fa-solid fa-arrow-right flechaDerecha");
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

function comprobarCantidadProductos() {
  let cantidad_Productos = 0;
  for (const producto of carroCompras) {
    cantidad_Productos += producto.cantidad;
  }
  if (cantidad_Productos !== 0) {
    iconoCantidadProductos.innerHTML = `${cantidad_Productos}`;
    document
      .getElementById("cantidadProductos")
      .setAttribute("class", "cantidadProductos");
  } else {
    document
      .getElementById("cantidadProductos")
      .setAttribute("class", "cantidadProductos disabled");
  }
}

function comprobarCarro() {
  if (localStorage.getItem("carro")) {
    carroCompras = JSON.parse(localStorage.getItem("carro"));
    console.log("Ya hay algo en el carro");
  } else {
    carroCompras = [];
    console.log("No hay nada en el carro");
  }
  comprobarCantidadProductos();
}

function agregarCarrito(titulo, precio, imagen, idProducto, color) {
  showAlert("alertaProducto");
  let buscarProducto = carroCompras.find(
    (producto) => producto.idProducto === idProducto
  );
  if (buscarProducto) {
    let nuevoCarro = carroCompras.map((producto) => {
      if (producto.idProducto === idProducto) {
        producto.cantidad++;
      }
      return producto;
    });
    carroCompras = nuevoCarro;
  } else {
    console.log(color);
    carroCompras = [
      ...carroCompras,
      { idProducto, titulo, precio, imagen, cantidad: 1, color },
    ];
  }
  localStorage.setItem("carro", JSON.stringify(carroCompras));
  comprobarCantidadProductos();
  console.log(carroCompras);
}

async function renderizarProductos(categoria, pagina, paginaActual, productos) {
  try {
    listaProductos.innerHTML = ``;
    console.clear();
    console.log("Productos: ", productos);
    console.log("Categoria: ", categoria);
    console.log("Pagina actual: ", paginaActual);
    console.log("Muestra productos: ", pagina, " - ", pagina + 4);
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
                      <img loading="lazy" src="${productosFiltrados[i].image}" alt="Producto" />
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
  switch (nuevaCategoria) {
    case "all":
      categoria1.setAttribute("class", "categoriaActiva");
      categoria2.setAttribute("class", "");
      categoria3.setAttribute("class", "");
      categoria4.setAttribute("class", "");
      categoria5.setAttribute("class", "");
      break;
    case "men's clothing":
      categoria2.setAttribute("class", "categoriaActiva");
      categoria1.setAttribute("class", "");
      categoria3.setAttribute("class", "");
      categoria4.setAttribute("class", "");
      categoria5.setAttribute("class", "");
      break;
    case "women's clothing":
      categoria3.setAttribute("class", "categoriaActiva");
      categoria2.setAttribute("class", "");
      categoria1.setAttribute("class", "");
      categoria4.setAttribute("class", "");
      categoria5.setAttribute("class", "");
      break;
    case "jewelery":
      categoria4.setAttribute("class", "categoriaActiva");
      categoria2.setAttribute("class", "");
      categoria3.setAttribute("class", "");
      categoria1.setAttribute("class", "");
      categoria5.setAttribute("class", "");
      break;
    case "electronics":
      categoria5.setAttribute("class", "categoriaActiva");
      categoria2.setAttribute("class", "");
      categoria3.setAttribute("class", "");
      categoria4.setAttribute("class", "");
      categoria1.setAttribute("class", "");
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
  volverErrorConsulta.addEventListener("click", () => deleteAlert("errorConsulta"))
  formulario.addEventListener("submit", (e) => handleFormSubmit(e));
  volverConsulta.addEventListener("click", () => deleteAlert("alertaConsulta"));
  volverProducto.addEventListener("click", () => deleteAlert("alertaProducto"));
  volverSesion.addEventListener("click", () => deleteAlert("alertaSesion"));
  volverNombre.addEventListener("click", () => deleteAlert("alertaNombre"));
  volverTelefono.addEventListener("click", () => deleteAlert("alertaTelefono"));
  volverMail.addEventListener("click", () => deleteAlert("alertaMail"));
  volverMensaje.addEventListener("click", () => deleteAlert("alertaMensaje"));
  window.addEventListener("scroll", headerNegro);
  ocultarCategorias.addEventListener("click", () => mostrarFiltros(true));
  mostrarCategorias.addEventListener("click", () => mostrarFiltros(false));
  comprobarCarro();
  sesionIniciada();
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
  hamburguesa.addEventListener("click", mostrarNavbar);
  window.addEventListener("storage", () => {
    sesionIniciada();
  });
}

init();
