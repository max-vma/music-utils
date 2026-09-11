import { Note, NoteCollection } from '@/entities/Note/model';

export const CUSTOM_TUNING_LABEL = 'Кастомный строй';

export class Tuning extends NoteCollection {
  constructor(
    public label: string,
    notes: Note[],
  ) {
    const clonedNotes = [...notes];
    clonedNotes.forEach((note, index) => (note.indexInCollection = index));
    super(clonedNotes);
  }

  public setStringNote(stringIndex: number, newNote: Note) {
    const clonedNotes = [...this.notes];

    while (clonedNotes.length <= stringIndex) {
      const lowestNote = clonedNotes[clonedNotes.length - 1];

      if (!lowestNote) break;
      clonedNotes.push(lowestNote.getPrevSemitoneNote());
    }

    clonedNotes[stringIndex] = newNote;
    return new Tuning(CUSTOM_TUNING_LABEL, clonedNotes);
  }
}
