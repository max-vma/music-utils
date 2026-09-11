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

  describe('ступени и интервалы', () => {
    it('определяет ступени натурального мажора', () => {
      const scale = new MusicalScale(NoteNames.C, { type: ScaleNames.NaturalMajor });

      expect(scale.degreeLabels).toEqual(['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']);
    });

    it('альтерирует ступени натурального минора', () => {
      const scale = new MusicalScale(NoteNames.A, { type: ScaleNames.NaturalMinor });

      expect(scale.degreeLabels).toEqual(['I', 'II', 'bIII', 'IV', 'V', 'bVI', 'bVII', 'VIII']);
    });

    it('определяет повышенную кварту в лидийском ладу', () => {
      const scale = new MusicalScale(NoteNames.C, { type: ScaleNames.Lydian });

      expect(scale.degreeLabels).toEqual(['I', 'II', 'III', '#IV', 'V', 'VI', 'VII', 'VIII']);
    });

    it('считает интервалы натурального мажора', () => {
      const scale = new MusicalScale(NoteNames.C, { type: ScaleNames.NaturalMajor });

      expect(scale.intervalLabels).toEqual(['б.2', 'б.2', 'м.2', 'б.2', 'б.2', 'б.2', 'м.2']);
      expect(scale.intervals.map(interval => interval.semitones)).toEqual([2, 2, 1, 2, 2, 2, 1]);
    });

    it('работает с блюзовой гаммой из шести интервалов', () => {
      const scale = new MusicalScale(NoteNames.C, { type: ScaleNames.BluesMinor });

      expect(scale.degreeLabels).toEqual(['I', 'bIII', 'IV', '#IV', 'V', 'bVII', 'VIII']);
      expect(scale.intervalLabels).toEqual(['м.3', 'б.2', 'ув.1', 'м.2', 'м.3', 'б.2']);
    });

    it('переходит через границу октавы в диапазоне', () => {
      const scale = new MusicalScale(null, {
        from: new Note(NoteNames.C, OctaveNames.Four),
        to: new Note(NoteNames.C, OctaveNames.Five),
      });

      expect(scale.notes.length).toBe(13);
      expect(scale.degreeLabels[0]).toBe('I');
      expect(scale.degreeLabels[12]).toBe('VIII');
      expect(scale.intervals[11]).toMatchObject({ semitones: 1, label: 'м.2' });
    });

    it('обрабатывает гамму из одной ноты', () => {
      const scale = new MusicalScale(null, {
        from: new Note(NoteNames.C, OctaveNames.Four),
        to: new Note(NoteNames.C, OctaveNames.Four),
      });

      expect(scale.degreeLabels).toEqual(['I']);
      expect(scale.intervals).toEqual([]);
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

  describe('музыкальная запись нот', () => {
    it('пишет бемоли в натуральном миноре', () => {
      const scale = new MusicalScale(NoteNames.C, { type: ScaleNames.NaturalMinor });

      expect(scale.getDisplayNames()).toEqual(['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb', 'C']);
    });

    it('повышает кварту в лидийском ладу', () => {
      const scale = new MusicalScale(NoteNames.C, { type: ScaleNames.Lydian });

      expect(scale.getDisplayNames()).toEqual(['C', 'D', 'E', 'F#', 'G', 'A', 'B', 'C']);
    });

    it('корректно записывает блюзовую гамму', () => {
      const scale = new MusicalScale(NoteNames.C, { type: ScaleNames.BluesMinor });

      expect(scale.getDisplayNames()).toEqual(['C', 'Eb', 'F', 'F#', 'G', 'Bb', 'C']);
    });

    it('использует диезы и теоретические ноты для диезной тоники', () => {
      const scale = new MusicalScale(NoteNames['C#'], { type: ScaleNames.NaturalMajor });

      expect(scale.getDisplayNames()).toEqual(['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#', 'C#']);
    });

    it('не дублирует буквы ступеней в пределах тональности', () => {
      const scale = new MusicalScale(NoteNames.A, { type: ScaleNames.NaturalMinor });
      const letters = scale
        .getDisplayNames()
        .slice(0, 7)
        .map(name => name[0]);

      expect(new Set(letters).size).toBe(7);
    });

    it('сохраняет хроматическое имя для сравнения по высоте', () => {
      const scale = new MusicalScale(NoteNames.C, { type: ScaleNames.NaturalMinor });

      expect(scale.notes.map(note => note.note)).toEqual([
        NoteNames.C,
        NoteNames.D,
        NoteNames['D#'],
        NoteNames.F,
        NoteNames.G,
        NoteNames['G#'],
        NoteNames['A#'],
        NoteNames.C,
      ]);
    });
  });
});
