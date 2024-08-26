import { barcelona, roma, paris, londres } from "./ciudades.js";

// Obtener los elementos del DOM
let enlaces = document.querySelectorAll("a");
let tituloElemento = document.getElementById("titulo");
let subTituloElemento = document.getElementById("subtitulo");
let parrafoElemento = document.getElementById("parrafo");
let precioElemento = document.getElementById("precio");
let imagenesElemento = document.getElementById("imagenes");
let bodyElemento = document.body;

// Define los colores de fondo para cada ciudad
const coloresFondo = {
  Barcelona: "#f8c9e5",
  Roma: "#feddc6",
  París: "#fac6cb",
  Londres: "#f6fec6",
};

// Variable para controlar el estado de pantalla completa
let isFullscreen = false;
let fullscreenImage = null;

// Agregar un evento click a cada enlace
enlaces.forEach(function (enlace) {
  enlace.addEventListener("click", function (event) {
    // Verificar si es el enlace "SUEÑO Viajes"
    if (this.classList.contains("empresa")) {
      // No hacer nada, evita el comportamiento predeterminado
      event.preventDefault();
      // Restablecer el contenido a su estado inicial
      resetearVistaInicial();
    } else {
      event.preventDefault();

      // Remover la clase active de todos los enlaces
      enlaces.forEach(function (enlace) {
        enlace.classList.remove("active");
      });

      // Agregar la clase active al enlace actual
      this.classList.add("active");

      // Obtener el contenido correspondiente según el enlace
      let contenido = obtenerContenido(this.textContent.trim());

      // Mostrar el contenido en el DOM
      tituloElemento.innerHTML = contenido.titulo;

      // Limpiar el contenedor de imágenes
      imagenesElemento.innerHTML = "";

      // Añadir nuevas imágenes
      contenido.imagenes.forEach(function (imagen) {
        let img = document.createElement("img");
        img.src = imagen;
        img.alt = contenido.titulo;
        img.className = "ciudad-imagen";
        img.addEventListener("click", toggleFullscreen);
        imagenesElemento.appendChild(img);
      });

      subTituloElemento.innerHTML = contenido.subtitulo;
      parrafoElemento.innerHTML = contenido.parrafo;
      precioElemento.innerHTML = contenido.precio;

      // Cambiar el color de fondo del body según la ciudad seleccionada
      bodyElemento.style.backgroundImage = "none";
      bodyElemento.style.backgroundColor =
        coloresFondo[this.textContent.trim()];
    }
  });
});

// Función para traer las ciudades desde ciudades.js
function obtenerContenido(enlace) {
  let contenido = {
    Barcelona: barcelona,
    Roma: roma,
    París: paris,
    Londres: londres,
  };
  return contenido[enlace];
}

// Función para alternar la vista de pantalla completa de una imagen
function toggleFullscreen(event) {
  if (isFullscreen) {
    // Salir del modo pantalla completa
    bodyElemento.style.overflow = "auto";
    event.target.classList.remove("fullscreen");
    let background = document.querySelector(".fullscreen-background");
    if (background) {
      background.remove();
    }
    isFullscreen = false;
    fullscreenImage = null;
  } else {
    // Entrar en modo pantalla completa
    bodyElemento.style.overflow = "hidden";
    event.target.classList.add("fullscreen");

    // Añadir un fondo oscuro detrás de la imagen en pantalla completa
    let background = document.createElement("div");
    background.className = "fullscreen-background";
    background.addEventListener("click", toggleFullscreen);
    bodyElemento.appendChild(background);

    isFullscreen = true;
    fullscreenImage = event.target;
  }
}

// Función para restablecer la vista inicial
function resetearVistaInicial() {
  // Limpiar el contenido de la página
  tituloElemento.innerHTML = "Bienvenido a nuestra Web";
  subTituloElemento.innerHTML = "Elija su destino deseado";
  parrafoElemento.innerHTML =
    "Compre los mejores paquetes de viajes con nosotros";
  precioElemento.innerHTML = "";
  imagenesElemento.innerHTML = "";

  // Restablecer el color de fondo
  bodyElemento.style.backgroundImage = "";
  bodyElemento.style.backgroundColor = "";

  // Remover la clase active de todos los enlaces
  enlaces.forEach(function (enlace) {
    enlace.classList.remove("active");
  });

  // Restaurar el estado activo del enlace "SUEÑO Viajes"
  let enlaceEmpresa = document.querySelector(".empresa");
  if (enlaceEmpresa) {
    enlaceEmpresa.classList.add("active");
  }
}
