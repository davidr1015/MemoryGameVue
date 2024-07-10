import type { Carta } from '@/interfaces/Carta.interfaz';
import confetti from 'canvas-confetti';
import { computed, reactive, watch } from 'vue';

export const useMemoryGame = () => {
  const crearCartasIniciales = (): Carta[] => [
    { id: 1, contenido: 'A', estaVolteada: false, emparejada: false },
    { id: 2, contenido: 'A', estaVolteada: false, emparejada: false },
    { id: 3, contenido: 'B', estaVolteada: false, emparejada: false },
    { id: 4, contenido: 'B', estaVolteada: false, emparejada: false },
    { id: 5, contenido: 'C', estaVolteada: false, emparejada: false },
    { id: 6, contenido: 'C', estaVolteada: false, emparejada: false },
    { id: 7, contenido: 'D', estaVolteada: false, emparejada: false },
    { id: 8, contenido: 'D', estaVolteada: false, emparejada: false },
    { id: 9, contenido: 'E', estaVolteada: false, emparejada: false },
    { id: 10, contenido: 'E', estaVolteada: false, emparejada: false },
    { id: 11, contenido: 'F', estaVolteada: false, emparejada: false },
    { id: 12, contenido: 'F', estaVolteada: false, emparejada: false },
  ];

  const estado = reactive({
    cartas: revolverCartas(crearCartasIniciales()),
    cartasVolteadas: [] as Carta[],
    intentos: 0,
    juegoGanado: false, // Nueva bandera para rastrear si el juego ha sido ganado
  });

  const juegoTerminado = computed(() => estado.cartas.every((carta) => carta.emparejada));

  function revolverCartas(array: Carta[]): Carta[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  watch(juegoTerminado, (nuevoValor) => {
    if (nuevoValor && !estado.juegoGanado) {
      confetti({
        particleCount: 300,
        spread: 150,
        origin: { y: 0.6 },
      });
      estado.juegoGanado = true;
    }
  });

  const manejarVolteo = (carta: Carta) => {
    if (estado.cartasVolteadas.length < 2 && !carta.estaVolteada) {
      carta.estaVolteada = true;
      estado.cartasVolteadas.push(carta);
    }

    if (estado.cartasVolteadas.length === 2) {
      estado.intentos++;
      setTimeout(() => {
        verificarEmparejamiento();
      }, 1000);
    }
  };

  const verificarEmparejamiento = () => {
    const [primeraCarta, segundaCarta] = estado.cartasVolteadas;
    if (primeraCarta.contenido === segundaCarta.contenido) {
      primeraCarta.emparejada = true;
      segundaCarta.emparejada = true;
    } else {
      primeraCarta.estaVolteada = false;
      segundaCarta.estaVolteada = false;
    }
    estado.cartasVolteadas = [];
  };

  const reiniciarJuego = () => {
    estado.cartas = revolverCartas(crearCartasIniciales());
    estado.intentos = 0;
    estado.cartasVolteadas = [];
    estado.juegoGanado = false; // Reiniciar la bandera al reiniciar el juego
  };

  return {
    // Props
    estado,
    juegoTerminado,
    // Methods
    manejarVolteo,
    reiniciarJuego,
  };
};
