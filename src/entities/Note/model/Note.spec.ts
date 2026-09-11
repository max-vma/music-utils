import { MAX_NOTES_COUNT, NoteNames, OctaveNames } from '@/entities/Note/consts';
import { Note } from './Note';

describe('Note', () => {
  describe('upOnSemitones', () => {
    it('сдвигает ноту внутри октавы', () => {
      const note = new Note(NoteNames.C, OctaveNames.Four);

      note.upOnSemitones(2);

      expect(note.note).toBe(NoteNames.D);
      expect(note.octave).toBe(OctaveNames.Four);
    });

    it('увеличивает октаву при переходе B -> C', () => {
      const note = new Note(NoteNames.B, OctaveNames.Three);

      note.upOnSemitones(1);

      expect(note.note).toBe(NoteNames.C);
      expect(note.octave).toBe(OctaveNames.Four);
    });

    it('уменьшает октаву при переходе C -> B назад', () => {
      const note = new Note(NoteNames.C, OctaveNames.Four);

      note.upOnSemitones(-1);

      expect(note.note).toBe(NoteNames.B);
      expect(note.octave).toBe(OctaveNames.Three);
    });

    it('корректно обрабатывает сдвиг больше октавы', () => {
      const note = new Note(NoteNames.C, OctaveNames.One);

      note.upOnSemitones(MAX_NOTES_COUNT + 1);

      expect(note.note).toBe(NoteNames['C#']);
      expect(note.octave).toBe(OctaveNames.Two);
    });

    it('не трогает октаву, если она не задана', () => {
      const note = new Note(NoteNames.B);

      note.upOnSemitones(1);

      expect(note.note).toBe(NoteNames.C);
      expect(note.octave).toBeUndefined();
    });

    it('мутирует и возвращает тот же объект', () => {
      const note = new Note(NoteNames.C);

      expect(note.upOnSemitones(1)).toBe(note);
    });
  });

  describe('getOtherNote', () => {
    it('возвращает следующую ноту и увеличивает октаву на границе', () => {
      const note = new Note(NoteNames.B, OctaveNames.Two);

      const next = note.getNextSemitoneNote();

      expect(next.note).toBe(NoteNames.C);
      expect(next.octave).toBe(OctaveNames.Three);
    });

    it('возвращает предыдущую ноту и уменьшает октаву на границе', () => {
      const note = new Note(NoteNames.C, OctaveNames.Two);

      const prev = note.getPrevSemitoneNote();

      expect(prev.note).toBe(NoteNames.B);
      expect(prev.octave).toBe(OctaveNames.One);
    });

    it('переносит indexInCollection', () => {
      const note = new Note(NoteNames.E, OctaveNames.Four, 0);

      expect(note.getNextSemitoneNote().indexInCollection).toBe(0);
    });

    it('не создаёт новый объект для исходной ноты', () => {
      const note = new Note(NoteNames.E, OctaveNames.Four);

      expect(note.getNextSemitoneNote().is(note, false)).toBe(false);
    });
  });

  describe('getNoteName', () => {
    it('возвращает имя ноты', () => {
      expect(new Note(NoteNames['C#']).getNoteName()).toBe('C#');
    });

    it('добавляет октаву', () => {
      expect(new Note(NoteNames.E, OctaveNames.Four).getNoteName(NoteNames.E, OctaveNames.Four)).toBe('E4');
    });
  });

  describe('is', () => {
    it('по умолчанию сравнивает только ноты', () => {
      expect(new Note(NoteNames.A, OctaveNames.Two).is(NoteNames.A)).toBe(true);
    });

    it('с флагом сравнивает и октаву', () => {
      const a2 = new Note(NoteNames.A, OctaveNames.Two);

      expect(a2.is(new Note(NoteNames.A, OctaveNames.Three), false)).toBe(false);
      expect(a2.is(new Note(NoteNames.A, OctaveNames.Two), false)).toBe(true);
    });
  });
});
