document.addEventListener("DOMContentLoaded", function () {
  // Referencias del DOM
  const toggleButton = document.getElementById("toggleButton");
  const formContainer = document.getElementById("formContainer");
  const userButton = document.getElementById("userButton");
  const userDropdown = document.getElementById("userDropdown");
  const userMenu = document.getElementById("userMenu");
  const container = document.querySelector(".card-container");
  const select = document.getElementById("plataforma");
  const carrito = [];
  const username = window.localStorage.getItem("username");
  const idUsuario = window.localStorage.getItem("id_usuario");

  // Mostrar el menú de usuario según estado de sesión
  if (username) configurarMenuUsuario(username);

  // Manejar eventos de usuario y formulario
  toggleButton?.addEventListener("click", () => {
    formContainer.style.display =
      formContainer.style.display === "block" ? "none" : "block";
  });

  userDropdown?.addEventListener("click", (e) => {
    e.preventDefault();
    userMenu.classList.toggle("hidden");
    userMenu.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (!userDropdown?.contains(e.target) && !userMenu?.contains(e.target)) {
      userMenu?.classList.add("hidden");
      userMenu?.classList.remove("show");
    }
  });

  // Manejar el cambio de plataforma y renderizar juegos
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

  // Funciones principales
  function configurarMenuUsuario(username) {
    userDropdown.textContent = username;
    userMenu.innerHTML = `
      <li><a href="/metodos-pago">Métodos de pago</a></li>
      <li><a href="#">Próximamente más</a></li>
      <li><a href="#" id="logout">Cerrar sesión</a></li>
    `;
    document.getElementById("logout").addEventListener("click", cerrarSesion);
  }

  function cerrarSesion() {
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("id_usuario");
    window.location.href = "/";
  }

  function renderJuegos(juegos) {
    if (!container) return;
    container.innerHTML = ""; // Limpiar contenido anterior

    juegos.forEach((juego) => {
      if (!juego.id || !juego.title || !juego.image) return;

      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${juego.image}" alt="${juego.title}">
        <h3>${juego.title}</h3>
        <p>Precio: $${juego.price}</p>
        <p>Stock: ${juego.stock}</p>
        <input type="number" placeholder="Cantidad" min="1">
        <button class="add-to-cart">Agregar al carrito</button>
      `;
      card.querySelector(".add-to-cart").addEventListener("click", () => {
        obtenerJuegoToCarrito(juego.id, juego.title, juego.image);
      });
      container.appendChild(card);
    });
  }

  function actualizarCarrito() {
    const carritoItems = document.getElementById("carrito-items");
    carritoItems.innerHTML = "";
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    document.getElementById("contador-carrito").textContent = totalCantidad;

    carrito.forEach((producto, index) => {
      const div = document.createElement("div");
      div.classList.add("carrito-item");
      div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px;">
        <p>${producto.nombre} - Cantidad: ${producto.cantidad}</p>
        <button class="remove-item" data-index="${index}">❌</button>
      `;
      carritoItems.appendChild(div);
    });

    document.querySelectorAll(".remove-item").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        carrito.splice(index, 1);
        actualizarCarrito();
      })
    );
  }

  async function obtenerJuegoToCarrito(id_juego, nombre, imagen) {
    if (!idUsuario) return alert("Inicia sesión para agregar al carrito.");

    try {
      const response = await fetch("/carrito/agregar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_usuario: idUsuario, id_juego, cantidad: 1 }),
      });

      if (!response.ok) throw new Error(await response.json());
      alert("Producto agregado al carrito.");
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      alert("No se pudo agregar al carrito.");
    }
  }

  // Verificar sesión con el servidor al cargar
  (async () => {
    try {
      const response = await fetch("/perfil", { credentials: "include" });
      if (response.ok) {
        const data = await response.json();
        const username = data.message.split(", ")[1];
        window.localStorage.setItem("username", username);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error al verificar la sesión:", error);
    }
  })();
});

// Cambiar plataforma
window.cambiarPlataforma = function () {
  const plataforma = document.getElementById("plataforma").value;
  window.location.href = `/juegos/${plataforma}`;
};
