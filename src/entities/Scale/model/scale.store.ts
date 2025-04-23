import { MusicalScale, NoteNames, ScaleNames } from '@/entities';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useScaleStore = defineStore('scale', () => {
  const tonic = ref<NoteNames>(NoteNames.E);

  const type = ref<ScaleNames>(ScaleNames.NaturalMinor);

  const scale = ref<MusicalScale>(new MusicalScale(tonic.value, { type: type.value }));

  const setTonic = (newTonic: NoteNames) => {
    tonic.value = newTonic;
    setScale(new MusicalScale(tonic.value, { type: type.value }));
  };

  const setScale = (newScale: MusicalScale) => {
    scale.value = newScale;
  };

  const setType = (newScaleType: ScaleNames) => {
    type.value = newScaleType;
    setScale(new MusicalScale(tonic.value, { type: type.value }));
  };

  return {
    tonic,
    scale,
    type,
    setTonic,
    setType,
  };
});
