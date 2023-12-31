async function obtenerProductos() {
  const llamadoProductos = await fetch("../data.json");
  const data = await llamadoProductos.json();
  const mainElement = document.querySelector("main");

  let barraBusqueda = document.getElementById("barraDeBusqueda");
  let menuDesplegable = document.getElementById("menuDesplegable");

  function buscadorInput() {
    let buscador = barraBusqueda.value.toLowerCase();
    let resultadoBusqueda = data.filter((prod) => {
      return prod.nombre.toLowerCase().includes(buscador);
    });

    menuDesplegable.innerHTML = "";
    resultadoBusqueda.forEach((prod) => {
      const li = document.createElement("li");
      li.textContent = prod.nombre;
      menuDesplegable.style.color = "black";
      menuDesplegable.appendChild(li);
    });

    menuDesplegable.style.display =
      resultadoBusqueda.length > 0 && buscador !== "" ? "block" : "none";

    document.addEventListener("click", (event) => {
      if (
        !menuDesplegable.contains(event.target) &&
        event.target !== barraBusqueda
      ) {
        menuDesplegable.style.display = "none";
      }
    });
  }
  barraBusqueda.addEventListener("input", buscadorInput);

  menuDesplegable.addEventListener("click", (event) => {
    const nombreProductoSeleccionado = event.target.textContent;
    const productoSeleccionado = data.find(
      (producto) => producto.nombre === nombreProductoSeleccionado
    );

    if (productoSeleccionado) {
      const productoEnCarrito =
        JSON.parse(localStorage.getItem("productoEnCarrito")) || [];
      const productoExistente = productoEnCarrito.find(
        (producto) => producto.id === productoSeleccionado.id
      );

      if (!productoExistente) {
        productoEnCarrito.push({ ...productoSeleccionado, cantidad: 1 });
      } else {
        productoExistente.cantidad++;
      }
      const precioTotal = productoEnCarrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);

      localStorage.setItem(
        "productoEnCarrito",
        JSON.stringify(productoEnCarrito)
      );

      localStorage.setItem("precioTotalCarrito", `$${precioTotal}`);

      Toastify({
        text: "Producto agregado al Carrito",
        className: "info",
        gravity: "bottom",
        position: "right",
        duration: 1500,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    }
  });

  const container = document.createElement("div");
  container.classList.add("row");

  data.forEach((e) => {
    const productoDiv = document.createElement("div");
    productoDiv.classList.add(
      "col",
      "col-md-6",
      "col-xl-4",
      "col-xxl-3",
      "mb-4"
    );
    productoDiv.innerHTML = `
        <div class="col">
            <div class="card" style="width: 25rem;">
                <img src="${e.imagen}" class="card-img-top img-pla" alt="Filamente PLA 3d de NTH Grilon3, insumo para impresora 3d">
                <div class="card-body">
                    <h5 class="card-title text-center p-1">${e.nombre}</h5>
                    <p class="card-text text-center">${e.descripcion}</p>
                    <h6 class="text-center pb-1"> Precio: $${e.precio} x unidad </h6>
                    <div class="d-flex justify-content-center">
                        <button id="${e.id}" class="btn btn-personalizado" tipy="button">Agregar al Carrito</button>
                    </div>
                </div>
            </div>
        </div>
      `;
    let botonCarrito = productoDiv.querySelector(".btn-personalizado");
    botonCarrito.addEventListener("click", () => {
      const productoEnCarrito =
        JSON.parse(localStorage.getItem("productoEnCarrito")) || [];

      const productoExistente = productoEnCarrito.find(
        (producto) => producto.id === e.id
      );

      if (!productoExistente) {
        productoEnCarrito.push({ ...e, cantidad: 1 });
      } else {
        productoExistente.cantidad++;
      }

      const precioTotal = productoEnCarrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);

      localStorage.setItem(
        "productoEnCarrito",
        JSON.stringify(productoEnCarrito)
      );
      localStorage.setItem("precioTotalCarrito", precioTotal);


      Toastify({
        text: "Producto agregado al Carrito",
        className: "info",
        gravity: "bottom",
        position: "right",
        duration: 1500,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    });

    container.appendChild(productoDiv);
  });

  mainElement.appendChild(container);
}

obtenerProductos();
