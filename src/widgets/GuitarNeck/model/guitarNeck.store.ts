import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { GUITAR_STANDARD_E } from '@/entities/Tuning/consts';
import { useTuningStore } from '@/entities/Tuning/model/tuning.store';
import {
  DEFAULT_FRETS_COUNT,
  DEFAULT_STRINGS_COUNT,
  MAX_FRETS_COUNT,
  MAX_STRINGS_COUNT,
  MIN_FRETS_COUNT,
  MIN_STRINGS_COUNT,
} from '@/widgets/GuitarNeck/consts';
import { buildStringsNotes } from './buildStringsNotes';
import { clampNeckCount } from './clampNeckCount';

export const useNeckStore = defineStore('neck', () => {
  const tuningStore = useTuningStore();

  const stringsCount = ref<number>(DEFAULT_STRINGS_COUNT);
  const fretsCount = ref<number>(DEFAULT_FRETS_COUNT);

  const setFretsCount = (value: unknown) => {
    fretsCount.value = clampNeckCount(value, MIN_FRETS_COUNT, MAX_FRETS_COUNT, DEFAULT_FRETS_COUNT);
  };

  const setStringsCount = (value: unknown) => {
    stringsCount.value = clampNeckCount(value, MIN_STRINGS_COUNT, MAX_STRINGS_COUNT, DEFAULT_STRINGS_COUNT);
  };

  // Число струн — независимый параметр: оно не меняет строй, тонику и тип
  // звукового ряда. Ноты для отрисовки выводятся из строя, а недостающие
  // струны достраиваются вниз по полутонам, не изменяя сам строй.
  const stringNotes = computed(() => {
    const baseNotes = tuningStore.notes.length ? tuningStore.notes : GUITAR_STANDARD_E.notes;

    return buildStringsNotes(baseNotes, stringsCount.value);
  });

  return {
    fretsCount,
    stringsCount,
    stringNotes,
    setFretsCount,
    setStringsCount,
  };
});
