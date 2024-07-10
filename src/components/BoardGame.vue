<template>
  <div class="juego">
    <div class="encabezado">
      <div class="contador">Intentos: {{ estado.intentos }}</div>
      <button @click="reiniciarJuego" v-if="juegoTerminado">Reiniciar Juego</button>
    </div>
    <div class="tablero">
      <CardComponent
        v-for="carta in estado.cartas"
        :key="carta.id"
        :carta="carta"
        :estaVolteada="carta.estaVolteada || carta.emparejada"
        @voltear="manejarVolteo"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, watch } from 'vue';
import CardComponent from './CardComponent.vue';
import confetti from 'canvas-confetti';

interface Carta {
  id: number;
  contenido: string;
  estaVolteada: boolean;
  emparejada: boolean;
}

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
});

const juegoTerminado = computed(() => estado.cartas.every((carta) => carta.emparejada));

function revolverCartas(array: Carta[]): Carta[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

watch(juegoTerminado, () => {
  confetti({
    particleCount: 300,
    spread: 150,
    origin: { y: 0.6 },
  });
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
};
</script>

<style scoped>
.tablero {
  display: grid;
  grid-template-columns: repeat(4, 100px);
  gap: 16px;
  justify-content: center;
  margin-top: 50px;
}

.contador {
  color: #fff;
  font-size: 2rem;
  font-weight: bold;
}
button {
  background-color: #fff;
  padding: 4px 8px;
  font-size: 1.1rem;
  font-weight: bolder;
  border-radius: 8px;
}
.encabezado {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 400px;
  margin: 20px auto;
}
</style>
