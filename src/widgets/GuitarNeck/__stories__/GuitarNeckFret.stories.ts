import { Note, NoteNames, OctaveNames, FretNote } from '@/entities';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'GuitarNeck/Note',
  component: FretNote,
} as Meta<typeof FretNote>;

export const NoteActive: StoryFn<typeof FretNote> = args => ({
  components: { FretNote },
  setup() {
    return { args };
  },
  template: '<guitar-neck-note v-bind="args">Button</guitar-neck-note>',
});

const note = new Note(NoteNames.C, OctaveNames.Three);

NoteActive.args = {
  note,
  isTonic: true,
};

export const GNoteChanged: StoryFn<typeof FretNote> = args => ({
  components: { FretNote },
  setup() {
    return { args };
  },
  template: '<guitar-neck-note v-bind="args">Button</guitar-neck-note>',
});

GNoteChanged.args = {
  note,
  isZeroFret: true,
};
