<template>
  <div :class="$style['neck-size-changer']">
    <ElFormItem label="Струн">
      <ElInputNumber
        :model-value="neckStore.stringsCount"
        :min="MIN_STRINGS_COUNT"
        :max="MAX_STRINGS_COUNT"
        :step="1"
        step-strictly
        size="large"
        aria-label="Число струн"
        :class="$style['neck-size-changer-input']"
        @change="onStringsCountChange" />
    </ElFormItem>

    <ElFormItem label="Ладов">
      <ElInputNumber
        :model-value="neckStore.fretsCount"
        :min="MIN_FRETS_COUNT"
        :max="MAX_FRETS_COUNT"
        :step="1"
        step-strictly
        size="large"
        aria-label="Число ладов"
        :class="$style['neck-size-changer-input']"
        @change="onFretsCountChange" />
    </ElFormItem>
  </div>
</template>

<script setup lang="ts">
import { MAX_FRETS_COUNT, MAX_STRINGS_COUNT, MIN_FRETS_COUNT, MIN_STRINGS_COUNT } from '@/widgets/GuitarNeck/consts';
import { useNeckStore } from '@/widgets/GuitarNeck/model/guitarNeck.store';

const neckStore = useNeckStore();

function onStringsCountChange(value: number | undefined) {
  if (value === undefined) return;

  neckStore.setStringsCount(value);
}

function onFretsCountChange(value: number | undefined) {
  if (value === undefined) return;

  neckStore.setFretsCount(value);
}
</script>

<style lang="less" module>
.neck-size-changer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  &-input {
    width: 100%;
    max-width: 240px;
  }
}
</style>
