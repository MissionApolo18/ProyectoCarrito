document.addEventListener("DOMContentLoaded", function () {
  // Elementos del DOM
  const toggleButton = document.getElementById("toggleButton");
  const formContainer = document.getElementById("formContainer");
  const carritoIcono = document.getElementById("carrito");
  const carritoContenido = document.getElementById("carrito-contenido");
  const contadorCarrito = document.getElementById("contador-carrito");
  const userButton = document.getElementById("userButton");
  const userDropdown = document.getElementById("userDropdown");
  const userMenu = document.getElementById("userMenu");
  const container = document.querySelector(".card-container");
  const select = document.getElementById("plataforma");

  // Mostrar el username o las opciones de login/registro
  const username = window.sessionStorage.getItem("username");

  if (userButton) {
    if (username) {
      userButton.textContent = username;
      formContainer.innerHTML = `
        <ul class="menu">
          <li><a href="/formas-pago">Mis formas de pago</a></li>
          <li><a href="#">Próximamente más</a></li>
        </ul>
      `;
    } else {
      userButton.textContent = "Usuario";
      formContainer.innerHTML = `
        <ul class="menu">
          <li><a href="/login">Iniciar sesión</a></li>
          <li><a href="/registro">Registrarse</a></li>
        </ul>
      `;
    }
  }

  // Mostrar/ocultar el formulario al presionar el botón de usuario
  toggleButton?.addEventListener("click", function () {
    if (formContainer.style.display === "" || formContainer.style.display === "none") {
      formContainer.style.display = "block"; // Mostrar
    } else {
      formContainer.style.display = "none"; // Ocultar
    }
  });

  // Alternar menú desplegable del usuario
  userDropdown?.addEventListener("click", (e) => {
    e.preventDefault();
    userMenu.classList.toggle("hidden");
    userMenu.classList.toggle("show");
  });

  // Cerrar el menú si se hace clic fuera de él
  document.addEventListener("click", (e) => {
    if (!userDropdown?.contains(e.target) && !userMenu?.contains(e.target)) {
      userMenu?.classList.add("hidden");
      userMenu?.classList.remove("show");
    }
  });

  // Función para renderizar juegos en el contenedor
  const renderJuegos = (juegos) => {
    if (!container) return;

    container.innerHTML = ""; // Limpiar contenido anterior
    juegos.forEach((juego) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${juego.image}" alt="${juego.title}">
        <h3>${juego.title}</h3>
        <p>Precio: $${juego.price}</p>
        <p>Stock: ${juego.stock}</p>
        <input type="number" placeholder="Cantidad" min="1">
        <button onclick="obtenerJuegoToCarrito(${juego.id}, '${juego.title}', '${juego.image}')">Agregar al carrito</button>
      `;
      container.appendChild(card);
    });
  };

  // Manejar cambios en el select de plataformas
  select?.addEventListener("change", async (event) => {
    const consolaId = event.target.value;

    try {
      const response = await fetch(`/juegos/${consolaId}`);
      if (!response.ok) throw new Error("Error al cargar juegos");
      const juegos = await response.json();
      renderJuegos(juegos);
    } catch (error) {
      console.error("Error al cargar los juegos:", error);
      container.innerHTML = "<p>Error al cargar los juegos</p>";
    }
  });

  // Carrito de compras
  const obtenerJuegoToCarrito = (id_juego, nombre, imagen) => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoExistente = carrito.find((item) => item.id_juego === id_juego);

    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carrito.push({ id_juego, nombre, imagen, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarritoVista();
  };

  // Actualizar la vista del carrito
  const actualizarCarritoVista = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const carritoItems = document.getElementById("carrito-items");
    if (!carritoItems) return;

    carritoItems.innerHTML = ""; // Limpiar contenido actual

    // Contador total de productos
    const totalCantidad = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    contadorCarrito.textContent = totalCantidad;

    // Mostrar productos
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

    agregarEventosEliminar();
  };

  // Eventos para eliminar productos
  const agregarEventosEliminar = () => {
    const removeButtons = document.querySelectorAll(".remove-item");

    removeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const id_juego = event.target.getAttribute("data-id");
        eliminarDelCarrito(id_juego);
      });
    });
  };

  // Eliminar productos del carrito
  const eliminarDelCarrito = (id_juego) => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter((item) => item.id_juego !== parseInt(id_juego));
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarritoVista();
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
