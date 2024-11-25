# Pug index
// Contenedor para la selección de la plataforma
    .selection-container
      label(for='platform') Seleccionar Plataforma:
      select#platform(name="platform" onchange='showGamesForCompany()')
        option(value='') -- Selecciona una plataforma --
        option(value='xbox') Xbox
        option(value='psp') PSP
        option(value='nintendo') Nintendo

    // Contenido que se actualizará dinámicamente
    .platform-content#platform-content
      h2 Selecciona una plataforma para ver los juegos disponibles.

      // Sección para mostrar los videojuegos según la plataforma seleccionada
      .card-container#card-container
        each game in games
          .card
            img(src=`/images/${game.image}` alt=game.title)
            h3= game.title
            p Precio: $#{game.price}
            button Comprar Ahora

    footer
      p © 2024 Tienda de Videojuegos
      script(src='Js/script.js')

# Pug juegos

extends index.pug

block content
  h1 Ventas para #{plataforma}
  .platform-content
    .card-container
      each game in games
        .card
          img(src=game.image, alt=game.title)
          h3= game.title
          p Precio: $#{game.price}
          p Stock disponible: #{game.stock}
          input(type="number" placeholder="Cantidad Vendida" min="1" max=game.stock)
          button Registrar Venta