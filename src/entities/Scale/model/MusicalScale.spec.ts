import { NoteNames, OctaveNames } from '@/entities/Note/consts';
import { Note } from '@/entities/Note/model/Note';
import { ScaleNames } from '@/entities/Scale/consts';
import { MusicalScale } from './MusicalScale';
import { ScaleNote } from './ScaleNote';

describe('MusicalScale', () => {
  describe('создание по типу', () => {
    it('строит натуральный мажор от тоники', () => {
      const scale = new MusicalScale(NoteNames.C, { type: ScaleNames.NaturalMajor });

      expect(scale.notes.map(note => note.note)).toEqual([
        NoteNames.C,
        NoteNames.D,
        NoteNames.E,
        NoteNames.F,
        NoteNames.G,
        NoteNames.A,
        NoteNames.B,
        NoteNames.C,
      ]);
    });

    it('строит натуральный минор от тоники', () => {
      const scale = new MusicalScale(NoteNames.A, { type: ScaleNames.NaturalMinor });

      expect(scale.notes.map(note => note.note)).toEqual([
        NoteNames.A,
        NoteNames.B,
        NoteNames.C,
        NoteNames.D,
        NoteNames.E,
        NoteNames.F,
        NoteNames.G,
        NoteNames.A,
      ]);
    });

    it('нумерует ступени, начиная с 0 для тоники', () => {
      const scale = new MusicalScale(NoteNames.C, { type: ScaleNames.NaturalMajor });

      expect(scale.notes.map(note => (note instanceof ScaleNote ? note.step : null))).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
    });

    it('корректно применяет лидийский лад (type = 0, а не falsy-значение)', () => {
      const scale = new MusicalScale(NoteNames.C, { type: ScaleNames.Lydian });

      expect(scale.type).toBe(ScaleNames.Lydian);
      expect(scale.notes[3].note).toBe(NoteNames['F#']);
    });

    it('по умолчанию использует натуральный минор', () => {
      expect(new MusicalScale().type).toBe(ScaleNames.NaturalMinor);
    });

    it('находит индекс ступени по ноте', () => {
      const scale = new MusicalScale(NoteNames.C, { type: ScaleNames.NaturalMajor });

      expect(scale.getStepIndex(NoteNames.E)).toBe(2);
    });

    it('определяет принадлежность ноты гамме', () => {
      const scale = new MusicalScale(NoteNames.C, { type: ScaleNames.NaturalMajor });

      expect(scale.has(NoteNames.G)).toBe(true);
      expect(scale.has(NoteNames['G#'])).toBe(false);
    });
  });

  describe('создание по диапазону from/to', () => {
    it('включает обе границы', () => {
      const scale = new MusicalScale(null, {
        from: new Note(NoteNames.C, OctaveNames.Four),
        to: new Note(NoteNames.E, OctaveNames.Four),
      });

      expect(scale.notes.map(note => note.note)).toEqual([
        NoteNames.C,
        NoteNames['C#'],
        NoteNames.D,
        NoteNames['D#'],
        NoteNames.E,
      ]);
    });

    it('переходит через границу октавы', () => {
      const scale = new MusicalScale(null, {
        from: new Note(NoteNames.A, OctaveNames.Three),
        to: new Note(NoteNames.C, OctaveNames.Four),
      });

      expect(scale.notes.map(note => note.note)).toEqual([NoteNames.A, NoteNames['A#'], NoteNames.B, NoteNames.C]);
      expect(scale.notes.map(note => note.octave)).toEqual([
        OctaveNames.Three,
        OctaveNames.Three,
        OctaveNames.Three,
        OctaveNames.Four,
      ]);
    });

    it('работает без заданных октав', () => {
      const scale = new MusicalScale(null, { from: new Note(NoteNames.C), to: new Note(NoteNames.E) });

      expect(scale.notes.map(note => note.note)).toEqual([
        NoteNames.C,
        NoteNames['C#'],
        NoteNames.D,
        NoteNames['D#'],
        NoteNames.E,
      ]);
      expect(scale.notes.every(note => note.octave === undefined)).toBe(true);
    });

    it('нумерует ступени по порядку', () => {
      const scale = new MusicalScale(null, {
        from: new Note(NoteNames.C, OctaveNames.Four),
        to: new Note(NoteNames.E, OctaveNames.Four),
      });

      expect(scale.notes.map(note => (note instanceof ScaleNote ? note.step : null))).toEqual([0, 1, 2, 3, 4]);
    });

    it('устанавливает тонику в начало диапазона', () => {
      const scale = new MusicalScale(null, {
        from: new Note(NoteNames.G, OctaveNames.Two),
        to: new Note(NoteNames.B, OctaveNames.Two),
      });

      expect(scale.tonic.note).toBe(NoteNames.G);
      expect(scale.tonic.octave).toBe(OctaveNames.Two);
    });

    it('не зацикливается, если граница недостижима', () => {
      const scale = new MusicalScale(null, {
        from: new Note(NoteNames.C, OctaveNames.Four),
        to: new Note(NoteNames.C, OctaveNames.Three),
      });

      expect(scale.notes.length).toBeLessThanOrEqual(120);
    });
  });
});
