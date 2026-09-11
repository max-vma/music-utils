import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { Note } from '@/entities/Note/model';
import { GUITAR_STANDARD_E } from '@/entities/Tuning/consts';
import { Tuning } from '@/entities/Tuning/model/Tuning';

export const useTuningStore = defineStore('tuning', () => {
  const tuning = ref<Tuning>(GUITAR_STANDARD_E);

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
