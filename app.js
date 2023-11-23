// Sirve para chequear que se conectó mi archivo JS
console.log("Conectado");

// Creamos un objeto para almacenar el puntaje y lo guardamos en una variable
const puntaje = {
  ganadas: 0,
  perdidas: 0,
  empates: 0,
};

// Creamos un array para almacenar el historial de movimientos
const historialMovimientos = [];

function eligeMovimientoComputadora() {
  const randomNumber = Math.random();
  let eleccionComputadora = "";

  // Acá se genera una elección al azar para la computadora
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    eleccionComputadora = "Piedra";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    eleccionComputadora = "Papel";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    eleccionComputadora = "Tijera";
  }

  //Se agrega, mediante la funcion push(), la eleccion de la computadora como un nuevo objeto al array creado historialMovimientos.
  historialMovimientos.push({
    jugador: "Computadora",
    eleccion: eleccionComputadora,
  });

  // Return para que el resultado pueda ser usado fuera del scope del condicional de la eleccionComputadora
  return eleccionComputadora;
}

function jugarJuego() {
  let usuarioGana = 0;
  let computadoraGana = 0;

  while (usuarioGana < 2 && computadoraGana < 2) {
    const inputUsuario = prompt(
      "Gana el mejor de 3.\nEscribe Piedra, Papel o Tijera:"
    );

    if (inputUsuario === null) {
      break; // El usuario canceló el juego
    }

    // Aca declaramos una variable para la selección de usuario que tenga un formato más uniforme y válido
    const eleccionUsuario =
      inputUsuario.trim().charAt(0).toUpperCase() +
      inputUsuario.trim().slice(1).toLowerCase();

    // Comprobación de elección válida del jugador
    if (
      eleccionUsuario === "Piedra" ||
      eleccionUsuario === "Papel" ||
      eleccionUsuario === "Tijera"
    ) {
      const eleccionComputadora = eligeMovimientoComputadora();

      // Se agrega la elección del usuario al historial de movimientos
      historialMovimientos.push({
        jugador: "Usuario",
        eleccion: eleccionUsuario,
      });

      let resultado = "";

      // Esto determina el resultado de la ronda
      if (eleccionUsuario === "Tijera") {
        if (eleccionComputadora === "Piedra") {
          resultado = "PERDISTE";
          computadoraGana++;
        } else if (eleccionComputadora === "Papel") {
          resultado = "GANASTE";
          usuarioGana++;
        } else {
          resultado = "EMPATE";
        }
      } else if (eleccionUsuario === "Papel") {
        if (eleccionComputadora === "Piedra") {
          resultado = "GANASTE";
          usuarioGana++;
        } else if (eleccionComputadora === "Papel") {
          resultado = "EMPATE";
        } else {
          resultado = "PERDISTE";
          computadoraGana++;
        }
      } else if (eleccionUsuario === "Piedra") {
        if (eleccionComputadora === "Piedra") {
          resultado = "EMPATE";
        } else if (eleccionComputadora === "Papel") {
          resultado = "PERDISTE";
          computadoraGana++;
        } else {
          resultado = "GANASTE";
          usuarioGana++;
        }
      }

      //Esto es para actualizar el puntaje
      if (resultado === "GANASTE") {
        puntaje.ganadas += 1;
      } else if (resultado === "PERDISTE") {
        puntaje.perdidas += 1;
      } else if (resultado === "EMPATE") {
        puntaje.empates += 1;
      }

      alert(
        `${resultado}. Elegiste ${eleccionUsuario}. Computadora eligió ${eleccionComputadora}.
Ganadas: ${puntaje.ganadas}, Perdidas: ${puntaje.perdidas}, Empates: ${puntaje.empates}`
      );
    } else {
      alert(
        "Lo que escribiste no es aceptable para poder jugar. Por favor, elige entre Piedra, Papel o Tijera."
      );
    }
  }

  // Sale del bucle

  // Muestra el historial de movimientos al final del juego en la consola
  console.log("Historial de movimientos:", historialMovimientos);

  if (usuarioGana >= 2) {
    alert("Ganaste el mejor de 3!");
  } else {
    alert("La computadora te gano el mejor de 3.");
  }
}

// Llamamos a la función de jugarJuego al final para evitar HOISTING.
jugarJuego();
