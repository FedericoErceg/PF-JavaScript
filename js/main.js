async function obtenerProductos() {
  const llamadoProductos = await fetch("../data.json");
  const data = await llamadoProductos.json();
  data.forEach((e) => {
    const container = document.createElement("div");
    container.innerHTML = `
        <div class="card" style="width: 25rem;">
      <img src="${e.imagen}" class="card-img-top img-pla" alt="Filamente PLA 3d de NTH Grilon3, insumo para impresora 3d">
      <div class="card-body">
        <h5 class="card-title">${e.nombre}</h5>
        <p class="card-text">${e.descripcion}</p>
        <button id="${e.id}" class="btn btn-warning">Agregar al Carrito</button>
      </div>
    </div>
        `;
    document.body.appendChild(container);
  });
}
obtenerProductos();
