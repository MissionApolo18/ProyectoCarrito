document.addEventListener("DOMContentLoaded", function () {
  // Elementos del DOM
  const toggleButton = document.getElementById("toggleButton");
  const formContainer = document.getElementById("formContainer");
  const userButton = document.getElementById("userButton");
  const userDropdown = document.getElementById("userDropdown");
  const userMenu = document.getElementById("userMenu");
  const container = document.querySelector(".card-container");
  const select = document.getElementById("plataforma");

  // Mostrar el username o las opciones de login/registro
  const username = window.sessionStorage.getItem("username");

  if (username) {
    // Usuario autenticado: cambiar texto y opciones del menú
    userDropdown.textContent = "Mi cuenta";
    userMenu.innerHTML = `
      <li>
        <a href="/metodos-pago">Métodos de pago</a>
      </li>
      <li>
        <a href="#">Próximamente más</a>
      </li>
      <li>
        <a href="#" id="logout">Cerrar sesión</a>
      </li>
    `;

    // Manejar el cierre de sesión
    const logoutButton = document.getElementById("logout");
    logoutButton.addEventListener("click", () => {
      window.sessionStorage.removeItem("username");
      window.location.href = "/"; // Redirigir al inicio
    });
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
  }
  );

  // Array para almacenar los productos en el carrito
  const carrito = [];

  // Función para mostrar los juegos de la consola seleccionada y ocultar el resto
  function mostrarJuegos(consolaId) {
    // Ocultar todas las secciones de juegos
    const seccionesJuegos = document.querySelectorAll('.juegos');
    seccionesJuegos.forEach(seccion => seccion.style.display = 'none');

    // Mostrar solo la sección de juegos correspondiente a la consola seleccionada
    const seccionSeleccionada = document.getElementById(consolaId);
    seccionSeleccionada.style.display = 'flex';
  }

  // Seleccionar los botones de "Agregar al carrito" y agregar eventos
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
      const productoImagen = event.target.getAttribute('data-img');
      const productoNombre = event.target.previousElementSibling.getAttribute('alt');
      agregarAlCarrito(productoNombre, productoImagen);
    });
  });

  // Seleccionar la imagen del carrito y el contenedor del contenido
  const carritoIcono = document.getElementById('carrito');
  const carritoContenido = document.getElementById('carrito-contenido');
  const contadorCarrito = document.getElementById('contador-carrito');

  // Muestra y oculta el contenido del carrito al hacer clic en el icono
  carritoIcono.addEventListener('click', () => {
    carritoContenido.classList.toggle('visible');
    carritoContenido.classList.toggle('oculto');
  });

  // Función para agregar productos al carrito
  function agregarAlCarrito(nombre, imagen) {
    const productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
      // Incrementa la cantidad si el producto ya existe en el carrito
      productoExistente.cantidad += 1;
    } else {
      // Agrega el nuevo producto al carrito
      carrito.push({ nombre, imagen, cantidad: 1 });
    }

    actualizarCarrito();
  }

  // Función para actualizar el contenido del carrito y el contador
  function actualizarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    carritoItems.innerHTML = ''; // Limpia el contenido actual del carrito

    // Actualiza el contador de productos en el carrito
    const totalCantidad = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    contadorCarrito.textContent = totalCantidad;

    // Muestra los productos en el carrito
    carrito.forEach((producto, index) => {
      const div = document.createElement('div');
      div.classList.add('carrito-item');
      div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px;">
            <p>Nombre: ${producto.nombre}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <button class="remove-item" data-index="${index}">❌ Eliminar</button>
        `;
      carritoItems.appendChild(div);
    });

    agregarEventosEliminar(); // Agrega los eventos para eliminar productos
  }

  // Función para agregar eventos de eliminación a cada botón "Eliminar"
  function agregarEventosEliminar() {
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const index = parseInt(event.target.getAttribute('data-index'));

        // Elimina el producto del array 'carrito' y actualiza el carrito
        carrito.splice(index, 1);
        actualizarCarrito();
      });
    });
  }

});

window.obtenerJuegoToCarrito = async (id_juego, nombre, imagen) => {
  const id_usuario = window.sessionStorage.getItem("id_usuario");
  const cantidad = 1;

  try {
    const response = await fetch("/carrito/agregar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_usuario, id_juego, cantidad }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Agregado al carrito:", data);
    } else {
      console.error("Error al agregar:", data.message);
    }
  } catch (error) {
    console.error("Error de conexión:", error);
  }
};





// Función para cambiar la plataforma seleccionada
function cambiarPlataforma() {
  const plataforma = document.getElementById("plataforma").value;
  window.location.href = `/juegos/${plataforma}`;
}
