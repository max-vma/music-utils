<template>
  <div :class="$style['tuning-changer']">
    <ElFormItem label="Строй">
      <ElSelect
        :model-value="tuningStore.tuning"
        placeholder="Выберите строй"
        label="Строй"
        value-key="label"
        size="large"
        style="width: 240px"
        @change="tuningStore.setTuning">
        <ElOption
          v-for="item in TUNINGS"
          :label="item.label"
          :value="item" />
      </ElSelect>
    </ElFormItem>
  </div>
</template>

<script setup lang="ts">
import { TUNINGS } from '@/entities';
import { useTuningStore } from '@/entities/Tuning/model/tuning.store';

const tuningStore = useTuningStore();
</script>

<style lang="less" module>
.tuning-changer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
</style>
