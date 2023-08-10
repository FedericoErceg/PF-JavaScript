const productosDelCarrito = JSON.parse(
  localStorage.getItem("productoEnCarrito")
);
const precioTotal = JSON.parse(localStorage.getItem("precioTotalCarrito"));
const mainElement = document.querySelector("main");

const container = document.createElement("div");
container.classList.add("row");

function actualizarCarrito() {
  container.innerHTML = "";
}

const productosEnCarrito = productosDelCarrito.filter(producto => producto.cantidad > 0);


productosEnCarrito.forEach((e) => {
  if (e.cantidad > 0) {
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("col-lg-3", "col-sm-6", "col", "my-5");
    productoDiv.innerHTML = `
      <div class="text-center">
          <div class="mb-2">
              <h5 class="pb-2">${e.nombre} </h5>
              <img class="img-personalizada" src="${e.imagen}" alt="Producto">
              <h6 class="ps-2" id="cantidad${e.id}">cantidad: ${e.cantidad}</h6>
      <h6 class="ps-2" id="precio${e.id}">$${e.precio * e.cantidad}</h6>
          </div>
          <div class="">
              <button id="prod${e.id}Mas" class="btn btn-carrito" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
                      <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
                      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                  </svg>
              </button>
              <button id="prod${
                e.id
              }Menos" class="btn btn-carrito" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart-dash" viewBox="0 0 16 16">
                      <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z"/>
                      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                  </svg>
              </button>
          </div>
      </div>
    `;
    const botonMas = productoDiv.querySelector(`#prod${e.id}Mas`);
    const botonMenos = productoDiv.querySelector(`#prod${e.id}Menos`);
    const cantidadElemento = productoDiv.querySelector(`#cantidad${e.id}`);
    const precioProductoElemento = productoDiv.querySelector(`#precio${e.id}`);

    botonMas.addEventListener("click", () => {
      e.cantidad++;
      actualizarCantidadYTotalDOM(e, cantidadElemento, precioProductoElemento);
      actualizarLocalStorageYDom();
      actualizarTotal();
    });

    botonMenos.addEventListener("click", () => {
      if (e.cantidad > 1) {
        e.cantidad--;
        actualizarCantidadYTotalDOM(e, cantidadElemento, precioProductoElemento);
        actualizarLocalStorageYDom();
        actualizarTotal();
      } else {
        eliminarProducto(e.id);
        actualizarCarrito();
      }
    });

    container.appendChild(productoDiv);
  }
});

function eliminarProducto(id) {
  const index = productosEnCarrito.findIndex((producto) => producto.id === id);
  if (index !== -1) {
    productosEnCarrito.splice(index, 1);
    actualizarLocalStorageYDom();
    actualizarTotal();
    actualizarCarrito();
  }
}

function actualizarLocalStorageYDom() {
  localStorage.setItem(
    "productoEnCarrito",
    JSON.stringify(productosEnCarrito)
  );
}
function actualizarTotal() {
  const nuevoTotal = productosEnCarrito.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0
  );
  localStorage.setItem("precioTotalCarrito", `${nuevoTotal}`);
}
function actualizarCantidadYTotalDOM(
  producto,
  cantidadElemento,
  precioProductoElemento
) {
  cantidadElemento.textContent = `cantidad: ${producto.cantidad}`;
  precioProductoElemento.textContent = `$${
    producto.precio * producto.cantidad
  }`;
}
mainElement.appendChild(container);

function btnFianlizaCompra() {
  let container = document.createElement("div");
  container.className = "row";
  container.innerHTML = `
  <div class="col d-flex justify-content-center">
    <button id="btnFinal" class="btn btn-personalizado">Finalizar Compra</button>
  </div>
  `;
  mainElement.appendChild(container);

  const btnFinCompra = container.querySelector("#btnFinal");
  btnFinCompra.addEventListener("click", () => {
    if (productosEnCarrito.length > 0) {
      swal.fire({
        title: "Compra finalizada Exitosamente",
        text: `el total de su compra es $${precioTotal}`,
        icon: "success",
      });
    } else {
      swal.fire({
        title: "no hay productos en el carrito",
        text: "Debe de tener almenos un producto en el carrito de compras",
        icon: "error",
      });
    }
  });
}
btnFianlizaCompra();
