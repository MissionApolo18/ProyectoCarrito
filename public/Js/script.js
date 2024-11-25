document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('toggleButton');
  const formContainer = document.getElementById('formContainer');

  toggleButton.addEventListener('click', function () {
    console.log("Botón de usuario fue presionado");

    // Alterna directamente el display del formulario
    if (formContainer.style.display === '' || formContainer.style.display === 'none') {
      formContainer.style.display = 'block';  // Muestra el formulario
    } else {
      formContainer.style.display = 'none';  // Oculta el formulario
    }
  });

  // Función para renderizar juegos
  const renderJuegos = (juegos) => {
    container.innerHTML = ""; // Limpiar contenedor

    juegos.forEach((juego) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${juego.image}" alt="${juego.title}">
        <h3>${juego.title}</h3>
        <p>Precio: $${juego.price}</p>
        <p>Stock: ${juego.stock}</p>
        <input type="number" placeholder="Cantidad Vendida" min="1">
        <button>Registrar Venta</button>
      `;
      container.appendChild(card);
    });
  };

  // Manejar cambios en el select
  select?.addEventListener("change", async (event) => {
    const consolaId = event.target.value;

    try {
      // Llamar al backend para obtener los juegos
      const response = await fetch(`/juegos/${consolaId}`);
      if (!response.ok) throw new Error("Error al cargar juegos");

      const juegos = await response.json();
      renderJuegos(juegos);
    } catch (error) {
      console.error("Error:", error);
      container.innerHTML = "<p>Error al cargar los juegos</p>";
    }
  });

  // Carrito de compras
  const carrito = [];
  const carritoIcono = document.getElementById("carrito");
  const carritoContenido = document.getElementById("carrito-contenido");
  const contadorCarrito = document.getElementById("contador-carrito");

  // Mostrar/ocultar el carrito
  carritoIcono?.addEventListener("click", () => {
    carritoContenido.classList.toggle("visible");
    carritoContenido.classList.toggle("oculto");
  });

  const agregarAlCarrito = (nombre, imagen) => {
    const productoExistente = carrito.find((item) => item.nombre === nombre);

    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carrito.push({ nombre, imagen, cantidad: 1 });
    }

    actualizarCarrito();
  };

  const actualizarCarrito = () => {
    const carritoItems = document.getElementById("carrito-items");
    carritoItems.innerHTML = "";

    const totalCantidad = carrito.reduce(
      (total, producto) => total + producto.cantidad,
      0
    );
    contadorCarrito.textContent = totalCantidad;

    carrito.forEach((producto, index) => {
      const div = document.createElement("div");
      div.classList.add("carrito-item");
      div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px;">
        <p>Nombre: ${producto.nombre}</p>
        <p>Cantidad: ${producto.cantidad}</p>
        <button class="remove-item" data-index="${index}">❌ Eliminar</button>
      `;
      carritoItems.appendChild(div);
    });

    agregarEventosEliminar();
  };

  const agregarEventosEliminar = () => {
    const removeButtons = document.querySelectorAll(".remove-item");
    removeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = parseInt(event.target.getAttribute("data-index"));
        carrito.splice(index, 1);
        actualizarCarrito();
      });
    });
  };

  
});

// Función para cambiar la plataforma seleccionada
function cambiarPlataforma() {
  const plataforma = document.getElementById("plataforma").value;
  window.location.href = `/juegos/${plataforma}`;
}
