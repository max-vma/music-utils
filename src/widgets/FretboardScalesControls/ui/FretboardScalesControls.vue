<template>
  <div :class="$style['controls']">
    <div :class="$style['controls-block']">
      <div :class="$style['controls-block-title']">Строй инструмента</div>
      <TuningChanger />
    </div>

    <div :class="$style['controls-block']">
      <div :class="$style['controls-block-title']">Звуковой ряд</div>
      <ScaleChanger />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ScaleChanger, TuningChanger } from '@/entities';
</script>

<style lang="less" module>
.controls {
  padding: 12px;
  display: flex;
  gap: 12px;
  justify-content: space-around;
  flex-wrap: wrap;

  &-block {
    width: 100%;
  }

  &-block-title {
    font-size: 22px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 12px;
  }
}
</style>
