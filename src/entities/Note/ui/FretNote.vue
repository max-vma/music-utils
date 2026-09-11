<template>
  <div
    v-if="!isHidden || isZeroFret"
    :class="{
      [$style['note']]: true,
      [$style['is-zero-fret']]: isZeroFret,
      [$style['is-tonic']]: isTonic,
      [$style['is-hidden']]: isHidden,
    }">
    <span :class="[$style['note-inner']]">{{ noteLabel }}</span>

    <template v-if="isZeroFret">
      <button
        type="button"
        :aria-label="`Понизить струну на полутон: ${noteLabel}`"
        :class="[$style['note-tune'], $style['note-tune-down']]"
        @click="$emit('prev')">
        <ArrowLeft width="16px" />
      </button>

      <button
        type="button"
        :aria-label="`Повысить струну на полутон: ${noteLabel}`"
        :class="[$style['note-tune'], $style['note-tune-up']]"
        @click="$emit('next')">
        <ArrowRight width="16px" />
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ArrowRight, ArrowLeft } from '@element-plus/icons-vue';
import { Note } from '@/entities/Note/model';

interface PropTypes {
  note: Note;
  isTonic?: boolean;
  isZeroFret?: boolean;
  isHidden?: boolean;
}
const props = withDefaults(defineProps<PropTypes>(), {
  isTonic: false,
  isZeroFret: false,
  isHidden: false,
});

defineEmits<{
  (e: 'prev'): void;
  (e: 'next'): void;
}>();

const noteLabel = computed(() => `${props.note.noteName}${props.note.octave ?? ''}`);
</script>

<style lang="less" module>
.note {
  color: var(--note-text);
  font-weight: bold;
  font-size: 16px;
  font-family: Arial, sans-serif;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  background-color: var(--note-bg);
  position: absolute;
  width: 35px;
  height: 35px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  transition: 0.2s;

  &-inner {
    line-height: 1;
  }

  &-tune {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    padding: 0;
    color: var(--note-tune-text);
    background-color: var(--note-tune-bg);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    z-index: 1000;
    transition:
      opacity 0.2s,
      transform 0.2s;
  }

  &-tune-down {
    left: -16px;
  }

  &-tune-up {
    left: calc(100% - 4px);
  }

  &-tune:hover {
    transform: scale(1.1, 1.1);
  }

  &-tune:active {
    transform: scale(1.05, 1.05);
  }

  &:hover .note-tune,
  &:focus-within .note-tune {
    opacity: 1;
    pointer-events: auto;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200%;
    height: 100%;
  }

  &:hover {
    transform: translate(-50%, -50%) scale(1.15, 1.15);
    transition: 0.2s;
  }
}

.is-zero-fret {
  z-index: 3;
}

.is-tonic {
  color: var(--note-tonic-text);
  background-color: var(--note-tonic-bg);
}

.is-hidden {
  color: var(--note-hidden-text);
  background-color: var(--note-hidden-bg);
}

@media (hover: none) {
  .note-tune {
    width: 28px;
    height: 28px;
    opacity: 1;
    pointer-events: auto;
  }

  .note-tune-down {
    left: -22px;
  }

  .note-tune-up {
    left: calc(100% - 6px);
  }
}
</style>
