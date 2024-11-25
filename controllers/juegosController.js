import JuegoConsola from "../models/juegoConsola.js";
const plataformas = {
  1: "Xbox",
  2: "PSP",
  3: "Nintendo",
};

const juegosInfo = {
  1: [ // Xbox
    { id: 1, title: "Halo Infinite", image: "/images/halo.jpg" },
    { id: 2, title: "Gears of War", image: "/images/gears_of_war.jpg" },
    { id: 3, title: "Forza Horizon", image: "/images/forza_horizon.jpg" },
    { id: 4, title: "Sea of Thieves", image: "/images/sea_of_thieves.jpg" },
    { id: 5, title: "Fable", image: "/images/fable.jpg" },
  ],
  2: [ // PSP
    { id: 6, title: "God of War", image: "/images/godofwar.jpg" },
    { id: 7, title: "Final Fantasy VII", image: "/images/final_fantasy_vii.jpg" },
    { id: 8, title: "Kingdom Hearts", image: "/images/kingdom_hearts.jpg" },
    { id: 9, title: "Metal Gear Solid", image: "/images/metal_gear_solid.jpg" },
    { id: 10, title: "Tekken", image: "/images/tekken.jpg" },
  ],
  3: [ // Nintendo
    { id: 11, title: "The Legend of Zelda", image: "/images/zelda.jpg" },
    { id: 12, title: "Mario Kart", image: "/images/mario_kart.jpg" },
    { id: 13, title: "Super Smash Bros", image: "/images/smash_bros.jpg" },
    { id: 14, title: "Pokemon Diamond", image: "/images/pokemon_diamond.jpg" },
  ],
};

export const obtenerJuegosPorConsola = async (req, res) => {
  try {
    const { plataforma } = req.params;

    if (!plataformas[plataforma]) {
      return res.status(404).send("Plataforma no encontrada");
    }

    const juegosBD = await JuegoConsola.findAll({
      where: { id_consola: plataforma },
      attributes: ["id_juego", "stock", "precio_usuario"],
    });

    // Obtener los 5 juegos correspondientes a la consola
    const juegosExtra = juegosInfo[plataforma] || [];
    const juegosFormat = juegosBD.map((juegoBD) => {
      const juegoInfo = juegosExtra.find((juego) => juego.id === juegoBD.id_juego) || {
        title: "Juego desconocido",
        image: "images/default.png",
      };

      return {
        id: juegoBD.id_juego,
        stock: juegoBD.stock,
        price: juegoBD.precio_usuario,
        image: juegoInfo.image,
        title: juegoInfo.title,
      };
    });

    res.render("index", {
      plataforma: plataformas[plataforma],
      games: juegosFormat,
    });
  } catch (error) {
    console.error("Error en juegosController:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Función para agregar un juego al carrito


