<template>
  <div :class="$style['fretboard-scales-page']">
    <div :class="$style['fretboard-scales-page-inner']">
      <FretboardScalesControls />
      <GuitarNeck />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTitle } from '@vueuse/core';
import { GuitarNeck, FretboardScalesControls } from '@/widgets';

useTitle('Визуализатор музыкальных гамм для струнных инструментов');
</script>

<style lang="less" module>
.fretboard-scales-page {
  padding: 16px;
  height: 100%;
  display: flex;
  justify-content: center;
}

.fretboard-scales-page-inner {
  min-width: 80%;
}
</style>
