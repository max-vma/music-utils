import { NoteNames, OctaveNames } from '@/entities/Note/consts';
import { Note } from '@/entities/Note/model/Note';
import { GUITAR_STANDARD_E, TUNINGS } from '@/entities/Tuning/consts';
import { Tuning } from './Tuning';

describe('Tuning', () => {
  it('проставляет indexInCollection по порядку струн', () => {
    const tuning = new Tuning('Тестовый', [
      new Note(NoteNames.E, OctaveNames.Four),
      new Note(NoteNames.A, OctaveNames.Two),
    ]);

    expect(tuning.notes.map(note => note.indexInCollection)).toEqual([0, 1]);
  });

  it('стандартный строй содержит 6 струн с ожидаемыми нотами', () => {
    expect(GUITAR_STANDARD_E.notes.map(note => note.note)).toEqual([
      NoteNames.E,
      NoteNames.B,
      NoteNames.G,
      NoteNames.D,
      NoteNames.A,
      NoteNames.E,
    ]);
  });

  it('setStringNote возвращает новый строй, не меняя исходный', () => {
    const original = GUITAR_STANDARD_E;
    const originalFirstNote = original.notes[0].note;

    const changed = original.setStringNote(0, new Note(NoteNames.D, OctaveNames.Four));

    expect(changed).not.toBe(original);
    expect(changed.label).toBe('Кастомный строй');
    expect(changed.notes[0].note).toBe(NoteNames.D);
    expect(original.notes[0].note).toBe(originalFirstNote);
  });

  it('содержит уникальные предустановки строёв', () => {
    const labels = TUNINGS.map(tuning => tuning.label);

    expect(new Set(labels).size).toBe(labels.length);
    expect(labels).toContain('E Standard');
    expect(labels).toContain('Drop D');
    expect(labels).toContain('Open C');
  });
});
