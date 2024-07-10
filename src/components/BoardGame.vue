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
import { useMemoryGame } from '@/composables/useMemoryGame';
import CardComponent from './CardComponent.vue';

const { estado, manejarVolteo, reiniciarJuego, juegoTerminado } = useMemoryGame();
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
