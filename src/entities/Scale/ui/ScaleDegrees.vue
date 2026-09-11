<template>
  <div
    :class="$style['scale-degrees']"
    role="group"
    aria-label="Ступени и интервалы гаммы">
    <template
      v-for="(item, index) in items"
      :key="index">
      <span
        v-if="item.intervalLabel"
        :class="$style['scale-degrees-interval']">
        {{ item.intervalLabel }}
      </span>

      <span
        :class="[$style['scale-degrees-item'], { [$style['is-tonic']]: item.isTonic }]"
        :aria-label="`${item.noteLabel}: ступень ${item.degreeLabel}`">
        <span :class="$style['scale-degrees-step']">{{ item.degreeLabel }}</span>
        <span :class="$style['scale-degrees-note']">{{ item.noteLabel }}</span>
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useScaleStore } from '@/entities/Scale/model/scale.store';

interface ScaleDegreeItem {
  noteLabel: string;
  degreeLabel: string;
  intervalLabel: string;
  isTonic: boolean;
}

const scaleStore = useScaleStore();

const items = computed<ScaleDegreeItem[]>(() => {
  const scale = scaleStore.scale;
  const intervals = scale.intervals;
  const noteLabels = scale.getDisplayNames();

  return scale.notes.map((note, index) => ({
    noteLabel: noteLabels[index] ?? note.noteName,
    degreeLabel: scale.degrees[index].label,
    intervalLabel: index > 0 ? intervals[index - 1].label : '',
    isTonic: index === 0,
  }));
});
</script>

<style lang="less" module>
.scale-degrees {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  justify-content: center;
  padding: 8px 4px;

  &-item {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    min-width: 40px;
    padding: 4px 6px;
    color: var(--note-text);
    background-color: var(--note-bg);
    border-radius: 6px;
  }

  &-step {
    font-weight: 700;
    font-size: 16px;
    line-height: 1.1;
  }

  &-note {
    font-size: 12px;
    opacity: 0.85;
  }

  &-interval {
    color: var(--note-text);
    font-size: 12px;
    opacity: 0.7;
  }
}

.is-tonic {
  color: var(--note-tonic-text);
  background-color: var(--note-tonic-bg);
}
</style>
