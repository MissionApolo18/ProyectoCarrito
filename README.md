# Aplicación de carrito para ventas de videojuegos
Equipo: 9

## Indice

- Introducción
- Carpetas / organización
- Funcionalidad

## Introducción
Este es una vista rápida a lo que sería una página de compras de videojuegos para 3 empresas desarrolladoras, este proyecto espera que se cumpla con:
- Un carrito para añadir o eliminar un objeto.
- La implementación de módulos de Nodejs.

## Carpetas / Organización
Esta sección abarcaremos la organización de cada carpeta y su función principal dentro del proyecto.
### Config

### Controllers
En esta sección se encuentran aquellos archivos controladores,que además permiten añadir otras funcionalidades, como:

- Añadir la base de datos
- Objetos para su posterior uso (?)
### Public
Aquí yacen los elementos disponibles a los que cualquiera puede acceder fácilmente, tales como:
- Arcivos CSS
- Multimedia (Videos, imágenes, sonidos)
- Scrips 

Este último, permite las animaciones y parte de las acciones dentro de lo que es la vista (Views) 

### Routes
Las rutas son fundamentales para establecer parte de la lógica del programa.
Ya que permiten ser los intermediarios entre las URLs específica y los controladores.
A su vez, est permite que el código se vuelva más sencillo de manejar y escalar.
### Views
Mantener todo en un lugar y de una manera ordenada permite una mejor vista general para el desarrollo de proyectos.
Por esto mismo, todos los archivos principales para la vista principal de la página se encuentran en esta carpeta.


## Funcionalidad
En este apartado se explica lo que cada archivo permite hacer o modificar.

Considerando que todo este proyecto debe de ser únicamente visible, en su totalidad, para el desarrollador
### Index.js
Empezamos con este primer archivo, en el que se declaran y establecen todas las variables o constantes con las que van a trabajar, permitiendo así la creación de instancias u objetos.

### Inicio_router
En este módulo,se inicializan las rutas que debe de seguir la aplicación, este es el segundo paso para establecer que las conexiones entre los archivos sean las correctas.

### Inicio_Controller
Aquí es donde todos los controladores se enlazan entre sí, permitiendo que toda la aplicación este activa, y sobre todo, funcione.


### Index.pug
Esta es la vista principal de la página.
Actualmente, se encuentra "fragmentada" en capas, las cuales permiten que su modificación para nuevas funcionalidades sea más rápida.

## Por Añadir

- Sistema de seguridad: 
    - Tabla usuario, comprobar que el correo no se repita y lo básico de una contraseña (8 a 10 caracteres), agregar ID_rol
    - Jerarquizar los usuarios: admin, usuario y añadirlo a la bd
- En el header agregar el nombre de usuario, funcionalidades de añadir, eliminar o modificar videojuego para la parte del admin.
- Reporte de inventario, al final debe de crear un PDF
