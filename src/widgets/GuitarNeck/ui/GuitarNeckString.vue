<template>
  <div :class="$style.neckString">
    <GuitarNeckFret v-for="(note, index) in fretsNotes">
      <FretNote
        :isZeroFret="index === 0"
        :note="note"
        :isHidden="!hasInScale(note)"
        :isTonic="isTonic(note)"
        @next="() => onChangeTuningStringNote(true)"
        @prev="() => onChangeTuningStringNote(false)" />
    </GuitarNeckFret>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import GuitarNeckFret from '@/components/GuitarNeck/partials/GuitarNeckFret.vue';
import { FretNote, Note } from '@/entities';
import { useScaleStore } from '@/entities/Scale/model/scale.store';
import { useTuningStore } from '@/entities/Tuning/model/tuning.store';
import { useNeckStore } from '@/widgets/GuitarNeck/model/guitarNeck.store';

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

function hasInScale(note: Note): boolean {
  // console.log(note, scaleStore.scale.notes, scaleStore.scale.has(note))
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
.neckString {
  display: flex;
  width: 100%;
  height: 40px;
  background-color: #fff;
}
</style>
