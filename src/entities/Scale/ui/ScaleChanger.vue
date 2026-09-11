<template>
  <div :class="$style['scale-changer']">
    <ElFormItem label="Выбери тонику">
      <ElSelect
        :model-value="scaleStore.tonic"
        aria-label="Выбери тонику"
        placeholder="Выбери тонику"
        value-key="label"
        size="large"
        :class="$style['scale-changer-select']"
        @change="onSetTonic">
        <ElOption
          v-for="option in noteOptions"
          :key="option.value"
          :label="option.label"
          :value="option.value" />
      </ElSelect>
    </ElFormItem>

    <ElFormItem label="Выберите Тип">
      <ElSelect
        :model-value="scaleStore.type"
        aria-label="Выберите тип гаммы"
        placeholder="Выбери тип"
        value-key="label"
        size="large"
        :class="$style['scale-changer-select']"
        @change="onSetType">
        <ElOption
          v-for="option in scaleOptions"
          :key="option.value"
          :label="option.label"
          :value="option.value" />
      </ElSelect>
    </ElFormItem>
  </div>
</template>

<script setup lang="ts">
import { NoteNames } from '@/entities/Note/consts';
import { SCALE_LABELS, ScaleNames } from '@/entities/Scale/consts';
import { useScaleStore } from '@/entities/Scale/model/scale.store';
import { getEnumEntriesKeys } from '@/shared';

type SelectOption<T extends number> = {
  label: string;
  value: T;
};

const scaleStore = useScaleStore();

const noteOptions = getEnumEntriesKeys(NoteNames).map<SelectOption<NoteNames>>(([label, value]) => ({
  label,
  value: value as NoteNames,
}));

const scaleOptions = getEnumEntriesKeys(ScaleNames).map<SelectOption<ScaleNames>>(([, value]) => ({
  label: SCALE_LABELS[value as ScaleNames],
  value: value as ScaleNames,
}));

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

  &-select {
    width: 100%;
    max-width: 240px;
  }
}
</style>
