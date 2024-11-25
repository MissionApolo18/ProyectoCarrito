document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('toggleButton');
  const formContainer = document.getElementById('formContainer');
  const carritoIcono = document.getElementById('carrito');
  const carritoContenido = document.getElementById('carrito-contenido');
  const contadorCarrito = document.getElementById('contador-carrito');
  
  toggleButton.addEventListener('click', function () {
    console.log("Botón de usuario fue presionado");
    
    // Alterna el display del formulario
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
        <button onclick="obtenerJuegoToCarrito(${juego.id}, '${juego.title}', '${juego.image}')">Agregar al carrito</button>
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
  const obtenerJuegoToCarrito = (id_juego, nombre, imagen) => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoExistente = carrito.find(item => item.id_juego === id_juego);
  
    // Si el juego ya existe en el carrito, aumentamos la cantidad
    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      // Si el juego no existe en el carrito, lo agregamos con cantidad 1
      carrito.push({ id_juego, nombre, imagen, cantidad: 1 });
    }
  
    localStorage.setItem('carrito', JSON.stringify(carrito));
  
    actualizarCarritoVista();
  };

  // Actualizar la vista del carrito
  const actualizarCarritoVista = () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoItems = document.getElementById("carrito-items");
    carritoItems.innerHTML = ""; // Limpiar el contenido actual del carrito

    // Contador de productos en el carrito
    const totalCantidad = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    contadorCarrito.textContent = totalCantidad; // Mostrar cantidad total

    // Mostrar los productos del carrito
    carrito.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("carrito-item");
      div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px;">
        <p>Nombre: ${producto.nombre}</p>
        <p>Cantidad: ${producto.cantidad}</p>
        <button class="remove-item" data-id="${producto.id_juego}">❌ Eliminar</button>
      `;
      carritoItems.appendChild(div);
    });

    // Agregar evento de eliminar
    agregarEventosEliminar();
  };

  // Eliminar un producto del carrito
  const agregarEventosEliminar = () => {
    const removeButtons = document.querySelectorAll(".remove-item");

    removeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const id_juego = event.target.getAttribute("data-id");
        eliminarDelCarrito(id_juego);
      });
    });
  };

  // Eliminar un producto del carrito
  const eliminarDelCarrito = (id_juego) => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(item => item.id_juego !== id_juego); // Filtrar el juego que se quiere eliminar
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar el carrito actualizado
    actualizarCarritoVista(); // Actualizar la vista
  };

  // Mostrar/ocultar el carrito
  carritoIcono?.addEventListener("click", () => {
    carritoContenido.classList.toggle("visible");
    carritoContenido.classList.toggle("oculto");
  });
});







// Función para cambiar la plataforma seleccionada
function cambiarPlataforma() {
  const plataforma = document.getElementById("plataforma").value;
  window.location.href = `/juegos/${plataforma}`;
}
