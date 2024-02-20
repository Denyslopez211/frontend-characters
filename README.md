# Proyecto Angular 17

##### Prueba en producción [aquí](https://aesthetic-gnome-f700d3.netlify.app).

## Descripción

Este proyecto es un CRUD responsive de tarjetas de personajes, inspirado en el juego de cartas Hearthstone. Utiliza la API de [RapidAPI](https://rapidapi.com/omgvamp/api/hearthstone/) para obtener datos de los personajes. Sin embargo, la aplicación podría adaptarse para mostrar tarjetas de cualquier otro tipo de personaje, como personas, animales, héroes, Pokémon, entre otros.

## Funcionalidades

- **Listado de tarjetas de personajes:**

  - La página de inicio muestra todas las tarjetas de personajes disponibles.
  - Se puede realizar una búsqueda por nombre, descripción o URL de imagen de la tarjeta.
  - Se pueden eliminar tarjetas de personajes individualmente, con confirmación de eliminación.
  - Se puede editar una tarjeta de personaje existente, lo que redirige a la página de edición con los campos precargados.

- **Agregar y editar tarjetas de personajes:**
  - La página de agregar/editar permite crear nuevas tarjetas o editar las existentes.
  - Un formulario reactivo solicita el nombre, la descripción y la URL de la imagen.
  - La imagen se muestra en tiempo real a medida que se proporciona la URL.
  - Se realizan validaciones en los campos de nombre, descripción y URL de la imagen antes de permitir guardar los cambios.
  - Se muestran mensajes de error detallados si se intenta guardar con campos inválidos.

## Ejecución local

1. Clonar este repositorio.
2. Instalar las dependencias con `npm install`.
3. Ejecutar en modo desarrollo con `ng serve -o`. Se abrirá automáticamente una ventana del navegador con la página de inicio.
4. Para visualizar el proyecto en un navegador local, ir a [http://localhost:4200](http://localhost:4200).

## Tecnologías utilizadas

- Angular 17: Framework frontend para la construcción de la aplicación.
- Angular Material: Librería de componentes UI para un diseño moderno y adaptativo.
- TypeScript: Lenguaje de programación para el desarrollo frontend.
- RapidAPI: Plataforma para acceder a APIs externas.

## Manejo de errores

- El proyecto maneja errores en la comunicación con la API externa y en las validaciones del formulario.
- Se muestran mensajes de error claros para guiar al usuario sobre cómo corregir los problemas encontrados.
