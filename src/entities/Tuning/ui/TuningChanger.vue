<template>
  <div :class="$style['tuning-changer']">
    <ElFormItem label="Строй">
      <ElSelect
        :model-value="tuningStore.tuning"
        aria-label="Выберите строй"
        placeholder="Выберите строй"
        value-key="label"
        size="large"
        :class="$style['tuning-changer-select']"
        @change="tuningStore.setTuning">
        <ElOption
          v-for="item in TUNINGS"
          :key="item.label"
          :label="item.label"
          :value="item" />
      </ElSelect>
    </ElFormItem>
  </div>
</template>

<script setup lang="ts">
import { TUNINGS } from '@/entities/Tuning/consts';
import { useTuningStore } from '@/entities/Tuning/model/tuning.store';

const tuningStore = useTuningStore();
</script>

<style lang="less" module>
.tuning-changer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  &-select {
    width: 100%;
    max-width: 240px;
  }
}
</style>
