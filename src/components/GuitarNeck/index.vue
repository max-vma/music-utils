<template>
  <div :class="$style.neck">
    <GuitarNeckString
      v-for="(note, index) in tuningStore.notes"
      :tuningNote="note"
      :key="index" />
  </div>
</template>

<script setup lang="ts">
import GuitarNeckString from './partials/GuitarNeckString.vue'
import { useTuningStore } from '@/stores/tuning'
const tuningStore = useTuningStore()
</script>

<style lang="less" module>
.neck {
  position: relative;
  width: 100%;
  padding-top: 40px;
}
</style>
