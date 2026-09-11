// Base de datos de productos de ejemplo
const productos = [
  {
    id: 1,
    nombre: "Corpiño de Encaje Rosa",
    categoria: "corpinos",
    precio: 18500,
    imagen: "https://via.placeholder.com/200x200?text=Corpino+Encaje",
    talles: ["85", "90", "95", "100"],
    colores: ["Rosa", "Negro", "Blanco"]
  },
  {
    id: 2,
    nombre: "Bombacha Less Regulable",
    categoria: "bombachas",
    precio: 8200,
    imagen: "https://via.placeholder.com/200x200?text=Less+Regulable",
    talles: ["1 (S/M)", "2 (L/XL)"],
    colores: ["Rojo", "Negro", "Beige"]
  },
  {
    id: 3,
    nombre: "Conjunto Seducción Satinado",
    categoria: "conjuntos",
    precio: 29000,
    imagen: "https://via.placeholder.com/200x200?text=Conjunto+Saten",
    talles: ["90", "95", "100"],
    colores: ["Vino", "Negro"]
  }
];

let carrito = [];

// Inicialización de la tienda
document.addEventListener('DOMContentLoaded', () => {
  renderizarProductos(productos);
});

// Función para mostrar los productos en pantalla
function renderizarProductos(listaProductos) {
  const catalogo = document.getElementById('catalogo');
  catalogo.innerHTML = '';

  listaProductos.forEach(producto => {
    // Generar opciones de talles
    const opcionesTalle = producto.talles.map(t => `<option value="${t}">${t}</option>`).join('');
    
    // Generar opciones de colores
    const opcionesColor = producto.colores.map(c => `<option value="${c}">${c}</option>`).join('');

    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta-producto';
    tarjeta.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <div>
        <h3>${producto.nombre}</h3>
        <p class="precio">$${producto.precio.toLocaleString()}</p>
        <div class="opciones">
          <select id="talle-${producto.id}">${opcionesTalle}</select>
          <select id="color-${producto.id}">${opcionesColor}</select>
        </div>
      </div>
      <button class="btn-agregar" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
    `;
    catalogo.appendChild(tarjeta);
  });
}

// Filtrar por categoría
function filtrarProductos(categoria) {
  if (categoria === 'todos') {
    renderizarProductos(productos);
  } else {
    const filtrados = productos.filter(p => p.categoria === categoria);
    renderizarProductos(filtrados);
  }
}

// Lógica del Carrito
function agregarAlCarrito(productoId) {
  const producto = productos.find(p => p.id === productoId);
  const talleSeleccionado = document.getElementById(`talle-${productoId}`).value;
  const colorSeleccionado = document.getElementById(`color-${productoId}`).value;

  const itemCarrito = {
    id: producto.id,
    nombre: producto.nombre,
    precio: producto.precio,
    talle: talleSeleccionado,
    color: colorSeleccionado
  };

  carrito.push(itemCarrito);
  actualizarCarritoUI();
}

function actualizarCarritoUI() {
  const lista = document.getElementById('carrito-lista');
  const contador = document.getElementById('carrito-contador');
  const total = document.getElementById('carrito-total');

  // Actualizar contador
  contador.textContent = carrito.length;

  if (carrito.length === 0) {
    lista.innerHTML = '<li class="vacio">El carrito está vacío.</li>';
    total.textContent = '0.00';
    return;
  }

  // Renderizar ítems agregados
  lista.innerHTML = '';
  let sumaTotal = 0;

  carrito.forEach((item, index) => {
    sumaTotal += item.precio;
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.nombre} <br>
      <small>Talle: ${item.talle} | Color: ${item.color}</small><br>
      <strong>$${item.precio.toLocaleString()}</strong>
    `;
    lista.appendChild(li);
  });

  total.textContent = sumaTotal.toLocaleString();
}

function finalizarCompra() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }
  alert("¡Gracias por tu compra! Procesando pedido...");
  carrito = [];
  actualizarCarritoUI();
}