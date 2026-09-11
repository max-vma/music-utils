import { NoteNames } from '@/entities/Note/consts';
import { getContextualNoteName } from './noteSpelling';

describe('getContextualNoteName', () => {
  it('пишет натуральный мажор без альтераций', () => {
    const names = [0, 2, 4, 5, 7, 9, 11, 12].map(semitones => getContextualNoteName(NoteNames.C, semitones));

    expect(names).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C']);
  });

  it('бемолит пониженные ступени минора', () => {
    const names = [3, 8, 10].map(semitones => getContextualNoteName(NoteNames.C, semitones));

    expect(names).toEqual(['Eb', 'Ab', 'Bb']);
  });

  it('повышает кварту в лидийском и оставляет ноту по букве ступени', () => {
    expect(getContextualNoteName(NoteNames.C, 6)).toBe('F#');
    expect(getContextualNoteName(NoteNames.F, 6)).toBe('B');
  });

  it('использует разные буквы для семи ступеней тональности', () => {
    const names = [0, 2, 3, 5, 7, 8, 10].map(semitones => getContextualNoteName(NoteNames.C, semitones));
    const letters = names.map(name => name[0]);

    expect(new Set(letters).size).toBe(7);
  });

  it('не допускает одновременных G и G# в тональности', () => {
    const names = [0, 2, 4, 5, 7, 9, 11].map(semitones => getContextualNoteName(NoteNames.C, semitones));

    expect(names).toContain('G');
    expect(names).not.toContain('G#');
  });

  it('повышает терцию и септиму для диезной тоники', () => {
    expect(getContextualNoteName(NoteNames['C#'], 4)).toBe('E#');
    expect(getContextualNoteName(NoteNames['C#'], 11)).toBe('B#');
  });

  it('корректно пишет минор от диезной тоники', () => {
    expect(getContextualNoteName(NoteNames['F#'], 3)).toBe('A');
    expect(getContextualNoteName(NoteNames['F#'], 8)).toBe('D');
    expect(getContextualNoteName(NoteNames['F#'], 10)).toBe('E');
  });
});
