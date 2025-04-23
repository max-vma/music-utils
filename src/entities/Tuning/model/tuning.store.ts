import { GUITAR_STANDARD_E, Note } from '@/entities';
import { Tuning } from '@/entities/Tuning/model/Tuning';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useTuningStore = defineStore('tuning', () => {
  let tuning = ref<Tuning>(GUITAR_STANDARD_E);

  const setTuning = (newTuning: Tuning) => {
    tuning.value = newTuning;
  };

  const setTuningStringNote = (stringIndex: number, newNote: Note) => {
    const newTuning = tuning.value.setStringNote(stringIndex, newNote);
    setTuning(newTuning);
  };

  const notes = computed(() => tuning.value.notes as Note[]);

  return {
    tuning,
    notes,
    setTuning,
    setTuningStringNote,
  };
});
