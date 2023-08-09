async function obtenerProductos() {
  const llamadoProductos = await fetch("../data.json");
  const data = await llamadoProductos.json();
  const mainElement = document.querySelector("main");

  const container = document.createElement("div");
  container.classList.add("row");

  data.forEach((e) => {
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("col","col-md-6", "col-xl-4", "col-xxl-3", "mb-4");
    productoDiv.innerHTML = `
        <div class="col">
            <div class="card" style="width: 25rem;">
                <img src="${e.imagen}" class="card-img-top img-pla" alt="Filamente PLA 3d de NTH Grilon3, insumo para impresora 3d">
                <div class="card-body">
                    <h5 class="card-title text-center p-1">${e.nombre}</h5>
                    <p class="card-text text-center">${e.descripcion}</p>
                    <div class="d-flex justify-content-center">
                        <button id="${e.id}" class="btn btn-warning" tipy="button">Agregar al Carrito</button>
                    </div>
                </div>
            </div>
        </div>
      `;

      container.appendChild(productoDiv);
    });

    mainElement.appendChild(container);
}

obtenerProductos();
