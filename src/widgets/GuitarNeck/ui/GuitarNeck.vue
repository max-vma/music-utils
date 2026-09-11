<template>
  <div
    :class="$style['neck-scroll']"
    role="region"
    aria-label="Гриф гитары"
    tabindex="0">
    <div :class="$style['neck']">
      <GuitarNeckString
        v-for="(note, index) in tuningStore.notes"
        :tuningNote="note"
        :key="index" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTuningStore } from '@/entities/Tuning/model/tuning.store';
import GuitarNeckString from './GuitarNeckString.vue';

const tuningStore = useTuningStore();
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
