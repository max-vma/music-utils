<template>
  <div
    ref="fret-note-element"
    v-if="!isHidden || isZeroFret"
    :class="{
      [$style['note']]: true,
      [$style['is-zero-fret']]: isZeroFret,
      [$style['is-tonic']]: isTonic,
      [$style['is-hidden']]: isHidden,
    }">
    <span :class="[$style['note-inner']]"> {{ props.note.noteName }}{{ props.note.octave }} </span>

    <template v-if="isZeroFret">
      <div
        @click="$emit('next')"
        v-show="isHovered"
        :class="[$style['note-tune'], $style['note-tune-up']]">
        <ArrowRight width="16px" />
      </div>

      <div
        @click="$emit('prev')"
        v-show="isHovered"
        :class="[$style['note-tune'], $style['note-tune-down']]">
        <ArrowLeft width="16px" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Note } from '@/entities/Note/model';
import { ArrowRight, ArrowLeft } from '@element-plus/icons-vue';
import { useElementHover } from '@vueuse/core';
import { useTemplateRef } from 'vue';

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

const fretNoteElementRef = useTemplateRef('fret-note-element');

const isHovered = useElementHover(fretNoteElementRef);
</script>

<style lang="less" module>
.note {
  color: #fff;
  font-weight: bold;
  font-size: 16;
  font-family: Arial, sans-serif;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  background-color: #616161;
  position: absolute;
  width: 35px;
  height: 35px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  transition: 0.2s;

  &-tune-up {
    left: calc(100% - 4px);
  }
  &-tune-down {
    left: calc(-16px);
  }

  &-tune {
    position: absolute;
    width: 20px;
    height: 20px;
    left: 0;
    right: 0;
    border-radius: 50%;
    background-color: #757575;
    z-index: 1000;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;

    &:hover {
      transform: scale(1.1, 1.1);
      transition: 0.2s;
    }

    &:active {
      transform: scale(1.05, 1.05);
      transition: 0.2s;
    }
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
  background-color: #ff6c5c;
}

.is-hidden {
  background-color: #e0e0e0;

  .note-inner {
    color: #616161;
  }
}
</style>
