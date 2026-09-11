<template>
  <section
    :class="$style['controls']"
    aria-label="Настройки визуализатора гамм">
    <section
      :class="$style['controls-block']"
      aria-labelledby="controls-tuning-title">
      <h2
        id="controls-tuning-title"
        :class="$style['controls-block-title']">
        Строй инструмента
      </h2>
      <TuningChanger />
    </section>

    <section
      :class="$style['controls-block']"
      aria-labelledby="controls-neck-size-title">
      <h2
        id="controls-neck-size-title"
        :class="$style['controls-block-title']">
        Размер грифа
      </h2>
      <NeckSizeChanger />
    </section>

    <section
      :class="$style['controls-block']"
      aria-labelledby="controls-scale-title">
      <h2
        id="controls-scale-title"
        :class="$style['controls-block-title']">
        Звуковой ряд
      </h2>
      <ScaleChanger />
      <ScaleDegrees />
    </section>
  </section>
</template>

<script setup lang="ts">
import { ScaleChanger, ScaleDegrees, TuningChanger } from '@/entities';
import { NeckSizeChanger } from '@/widgets/GuitarNeck';
</script>

<style lang="less" module>
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-around;
  padding: 12px;

  &-block {
    width: 100%;
  }

  &-block-title {
    margin-bottom: 12px;
    font-size: 22px;
    font-weight: 600;
    text-align: center;
  }
}

@media (width <= 480px) {
  .controls {
    padding: 8px;
  }

  .controls-block-title {
    font-size: 18px;
  }
}
</style>
