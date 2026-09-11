<template>
  <div :class="$style['neck-string']">
    <GuitarNeckFret
      v-for="(note, index) in fretsNotes"
      :key="index">
      <FretNote
        :isZeroFret="index === 0"
        :note="note"
        :displayName="getNoteLabel(note)"
        :isHidden="!hasInScale(note)"
        :isTonic="isTonic(note)"
        @next="() => onChangeTuningStringNote(true)"
        @prev="() => onChangeTuningStringNote(false)" />
    </GuitarNeckFret>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTuningStore, useScaleStore, FretNote, Note } from '@/entities';
import { useNeckStore } from '@/widgets/GuitarNeck/model/guitarNeck.store';
import GuitarNeckFret from './GuitarNeckFret.vue';

const props = defineProps<{
  tuningNote: Note;
}>();

const scaleStore = useScaleStore();
const tuningStore = useTuningStore();
const neckStore = useNeckStore();

const fretsNotes = computed((): Note[] => {
  const notes: Note[] = [];
  for (let index = 0; index < neckStore.fretsCount + 1; index++) {
    let note = !notes.length ? props.tuningNote : notes[index - 1].getNextSemitoneNote();

    notes.push(note);
  }
  return notes;
});

function getNoteLabel(note: Note): string {
  return `${scaleStore.scale.getDisplayName(note)}${note.octave ?? ''}`;
}
function hasInScale(note: Note): boolean {
  return scaleStore.scale.has(note);
}
function isTonic(note: Note): boolean {
  return scaleStore.scale.tonic.is(note);
}

function onChangeTuningStringNote(isNext: boolean) {
  tuningStore.setTuningStringNote(props.tuningNote.indexInCollection, props.tuningNote.getOtherNote(isNext));
}
</script>

<style lang="less" module>
.neck-string {
  display: flex;
  width: 100%;
  height: 40px;
  background-color: var(--neck-string-bg);
}
</style>
