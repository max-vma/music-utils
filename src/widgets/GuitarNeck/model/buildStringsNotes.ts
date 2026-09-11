import { Note } from '@/entities/Note/model';

/**
 * Строит ноты для отрисовки грифа под заданное число струн, не меняя исходный
 * строй. Если в строе не хватает струн — они достраиваются вниз по полутонам
 * от самой низкой струны. Лишние струны отбрасываются.
 */
export function buildStringsNotes(tuningNotes: Note[], stringsCount: number): Note[] {
  const count = Math.max(0, Math.trunc(stringsCount));
  const notes: Note[] = [];

  for (let index = 0; index < count; index++) {
    const tuningNote = tuningNotes[index];

    if (tuningNote) {
      notes.push(new Note(tuningNote.note, tuningNote.octave, index));
      continue;
    }

    const previousNote = notes[index - 1];

    if (!previousNote) break;

    const nextNote = previousNote.getPrevSemitoneNote();

    nextNote.indexInCollection = index;
    notes.push(nextNote);
  }

  return notes;
}
