<template>
  <div class="carta" @click="voltearCarta" :class="{ volteada: estaVolteada }">
    <div class="carta-interior">
      <div class="carta-frontal">
        <img src="https://i.pinimg.com/736x/44/88/21/44882172d24338848f4b68853e227217.jpg" alt="" />
      </div>
      <div class="carta-trasera">
        <div class="contenido">
          {{ carta.contenido }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Carta } from '@/interfaces/Carta.interfaz';

interface Props {
  carta: Carta;
  estaVolteada: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits(['voltear']);

const voltearCarta = () => {
  emit('voltear', props.carta);
};
</script>

<style scoped>
.carta {
  width: 100px;
  height: 150px;
  perspective: 1000px;
  /* background-color: #fff; */
  border-radius: 10px;
}

.carta-interior {
  background-color: #fff;
  position: relative;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  /* overflow: hidden; */
}

.carta.volteada .carta-interior {
  transform: rotateY(180deg);
}

.carta-frontal,
.carta-trasera {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  overflow: hidden;
}

.carta-frontal img {
  width: 90px;
  height: 140px;
  border-radius: 10px;
  cursor: pointer;
}

.carta-trasera {
  transform: rotateY(180deg);
}

.carta-trasera .contenido {
  width: 90px;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: #ccc;
}
</style>
