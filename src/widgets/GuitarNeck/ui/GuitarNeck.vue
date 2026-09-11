<template>
  <div
    :class="$style['neck-scroll']"
    role="region"
    aria-label="Гриф гитары"
    tabindex="0">
    <div :class="$style['neck']">
      <GuitarNeckString
        v-for="(note, index) in neckStore.stringNotes"
        :tuningNote="note"
        :key="index" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNeckStore } from '@/widgets/GuitarNeck/model/guitarNeck.store';
import GuitarNeckString from './GuitarNeckString.vue';

const neckStore = useNeckStore();
</script>

<style lang="less" module>
.neck-scroll {
  width: 100%;
  overflow: auto hidden;
  padding-bottom: 4px;
  touch-action: pan-x;
}

.neck {
  position: relative;
  width: 100%;
  min-width: 560px;
  padding-top: 40px;
}
</style>
