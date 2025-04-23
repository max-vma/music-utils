<template>
  <div :class="$style['scale-changer']">
    <ElFormItem label="Выбери тонику">
      <ElSelect
        :model-value="scaleStore.tonic"
        placeholder="Выбери тонику"
        value-key="label"
        size="large"
        style="width: 240px"
        @change="onSetTonic">
        <ElOption
          v-for="[key, item] in getEnumEntriesKeys(NoteNames)"
          :label="key"
          :value="item" />
      </ElSelect>
    </ElFormItem>

    <ElFormItem label="Выберите Тип">
      <ElSelect
        :model-value="scaleStore.type"
        placeholder="Выбери тип"
        label="Строй"
        value-key="label"
        size="large"
        style="width: 240px"
        @change="onSetType">
        <ElOption
          v-for="[key, item] in getEnumEntriesKeys(ScaleNames)"
          :label="key"
          :value="item" />
      </ElSelect>
    </ElFormItem>
  </div>
</template>

<script setup lang="ts">
import { NoteNames, ScaleNames } from '@/entities';
import { useScaleStore } from '@/entities/Scale/model/scale.store';
import { getEnumEntriesKeys } from '@/shared';

const scaleStore = useScaleStore();

function onSetTonic(tonic: NoteNames) {
  scaleStore.setTonic(tonic);
}

function onSetType(scaleName: ScaleNames) {
  scaleStore.setType(scaleName);
}
</script>

<style lang="less" module>
.scale-changer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
</style>
