const listaProductos = document.getElementById("listaProducto");
const navegacion = document.getElementById("navegacion");
const boton1 = document.getElementById("boton1");
const boton2 = document.getElementById("boton2");
const boton3 = document.getElementById("boton3");
const boton4 = document.getElementById("boton4");
const boton5 = document.getElementById("boton5");
const categoria1 = document.getElementById("categoria1");
const categoria2 = document.getElementById("categoria2");
const categoria3 = document.getElementById("categoria3");
const categoria4 = document.getElementById("categoria4");
const categoria5 = document.getElementById("categoria5");

$(window).scroll(function () {
  if ($(window).scrollTop()) {
    $("header").addClass("color");
  } else {
    $("header").removeClass("color");
  }
});

async function getProducts(categoria = "all") {
  try {
    if (categoria === "all") {
      const response = await fetch(
        "https://fakestoreapi.com/products?Offset=4"
      );
      const productos = await response.json();
      return productos;
    } else {
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${categoria}`
      );
      const productos = await response.json();
      return productos;
    }
  } catch (error) {
    console.log(error);
  }
}

async function renderizarProductos(
  e,
  categoria = "all",
  principio = 0,
  final = 4
) {
  try {
    listaProductos.innerHTML = ``;
    console.log(await getProducts(categoria));
    const productos = await getProducts(categoria);
    // renderizarBotones(productos.length);
    console.log(categoria);
    for (let i = principio; i < final; i++) {
      let color;
      if (productos[i].category === "men's clothing") {
        color = "naranja";
      } else if (productos[i].category === "electronics") {
        color = "verde";
      } else if (productos[i].category === "jewelery") {
        color = "celeste";
      } else {
        color = "morado";
      }
      listaProductos.innerHTML += `
          <div class="producto">
                <span class="${color}"></span>
                <div class="imagenProducto">
                  <img src="${productos[i].image}" alt="Producto" />
                </div>
                <div class="informacionProducto">
                  <h3>${productos[i].title}</h3>
                  <div class="rating-precio">
                    <div class="rating">
                      <p>Rating: ${productos[i].rating.rate}</p>
                      <img src="Assets/Estrella.png" alt="estrellas" />
                    </div>
                    <p class="precio">$${productos[i].price}</p>
                  </div>
                  <button>Agregar al carrito</button>
                </div>
                <div class="imagenInformacion">
                  <img src="Assets/informacion.png" alt="informacion"/>
                </div>
              </div>
          `;
    }
  } catch (error) {
    console.log(error);
  }
}

// function renderizarBotones(largoProductos) {
//   navegacion.innerHTML = ``;
//   let numeroPagina = 1;
//   for (let i = 1; i < largoProductos + 1; i = i + 4) {
//     navegacion.innerHTML += `
//       <button id="boton${numeroPagina}">${numeroPagina}</button>
//     `;
//     numeroPagina++;
//   }
// }

const productos = getProducts();

async function getProductsCategory(categoria) {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/category/${categoria}`
    );
    const productos = await response.json();
    return productos;
  } catch (error) {
    console.log(error);
  }
}

/* async function renderizarProductosGategoria (e, categoria, principio = 0, final = 4) {
  try {
    console.log(categoria)
    e.preventDefault()
    listaProductos.innerHTML = ``;
    console.log(await getProductsCategory(categoria));
    const productos = await getProductsCategory(categoria);
    renderizarBotones(productos.length);
    let cantidadPaginas = 0, itemsContados = 0;
    while ( productos.length-itemsContados > 0 ) {
      cantidadPaginas++;
      itemsContados+=4
    }
    console.log(cantidadPaginas)
    for (let i = principio; i < final; i++) {
      let color;
      if (productos[i].category === "men's clothing") {
        color = "naranja";
      } else if (productos[i].category === "electronics") {
        color = "verde";
      } else if (productos[i].category === "jewelery") {
        color = "celeste";
      } else {
        color = "morado";
      }
      listaProductos.innerHTML += `
        <div class="producto">
              <span class="${color}"></span>
              <div class="imagenProducto">
                <img src="${productos[i].image}" alt="Producto" />
              </div>
              <div class="informacionProducto">
                <h3>${productos[i].title}</h3>
                <div class="rating-precio">
                  <div class="rating">
                    <p>Rating: ${productos[i].rating.rate}</p>
                    <img src="Assets/Estrella.png" alt="estrellas" />
                  </div>
                  <p class="precio">$${productos[i].price}</p>
                </div>
                <button>Agregar al carrito</button>
              </div>
              <div class="imagenInformacion">
                <img src="Assets/informacion.png" alt="informacion"/>
              </div>
            </div>
        `;
    }
  } catch (error) {
    console.log(error)
  }
} */

let categoria = "all";

function cambiarCategoria(nuevaCategoria) {
  categoria = nuevaCategoria;
}

async function init() {
  try {
    await renderizarProductos();
    boton1.addEventListener(
      "click",
      (e) =>
        async function () {
          await renderizarProductos(e, categoria, 0, 4);
        }
    );
    boton2.addEventListener(
      "click",
      (e) =>
        async function () {
          console.log("HOLA")
          await renderizarProductos(e, categoria, 4, 8);
        }
    );
    boton3.addEventListener(
      "click",
      (e) =>
        async function () {
          await renderizarProductos(e, categoria, 8, 12);
        }
    );
    boton4.addEventListener(
      "click",
      (e) =>
        async function () {
          await renderizarProductos(e, categoria, 12, 16);
        }
    );
    boton5.addEventListener(
      "click",
      (e) =>
        async function () {
          await renderizarProductos(e, categoria, 16, 20);
        }
    );
    categoria1.addEventListener(
      "click",
      (e) =>
        async function () {
          cambiarCategoria("all");
          await renderizarProductos();
        }
    );
    categoria2.addEventListener(
      "click",
      (e) =>
        async function () {
          cambiarCategoria("men's clothing");
          await renderizarProductos();
        }
    );
    categoria3.addEventListener(
      "click",
      (e) =>
        async function () {
          cambiarCategoria("women's clothing");
          await renderizarProductos();
        }
    );
    categoria4.addEventListener(
      "click",
      (e) =>
        async function () {
          cambiarCategoria("jewelery");
          await renderizarProductos();
        }
    );
    categoria5.addEventListener(
      "click",
      (e) =>
        async function () {
          cambiarCategoria("electronics");
          await renderizarProductos();
        }
    );
  } catch (error) {
    console.log(error);
  }
}

init()
