async function obtenerProductos() {
    const llamadoProductos = await fetch('../data.json');
    const data = await llamadoProductos.json();
    console.log(data);

}
obtenerProductos();
