import { describe, expect, it } from 'vitest';
import { NoteNames, OctaveNames } from '@/entities/Note/consts';
import { Note } from '@/entities/Note/model';
import { GUITAR_STANDARD_E } from '@/entities/Tuning/consts';
import { buildStringsNotes } from './buildStringsNotes';

describe('buildStringsNotes', () => {
  it('возвращает копии нот с проставленным indexInCollection', () => {
    const notes = buildStringsNotes(GUITAR_STANDARD_E.notes, 3);

    expect(notes.map(note => note.note)).toEqual([NoteNames.E, NoteNames.B, NoteNames.G]);
    expect(notes.map(note => note.indexInCollection)).toEqual([0, 1, 2]);
    expect(notes[0]).not.toBe(GUITAR_STANDARD_E.notes[0]);
  });

  it('обрезает строй при меньшем числе струн', () => {
    const notes = buildStringsNotes(GUITAR_STANDARD_E.notes, 4);

    expect(notes).toHaveLength(4);
    expect(notes[3].note).toBe(NoteNames.D);
  });

  it('достраивает недостающие струны вниз по полутонам', () => {
    const notes = buildStringsNotes(GUITAR_STANDARD_E.notes, 8);

    expect(notes).toHaveLength(8);
    expect(notes.map(note => note.note)).toEqual([
      NoteNames.E,
      NoteNames.B,
      NoteNames.G,
      NoteNames.D,
      NoteNames.A,
      NoteNames.E,
      NoteNames['D#'],
      NoteNames.D,
    ]);
    expect(notes[7].octave).toBe(OctaveNames.Two);
  });

  it('не изменяет исходный массив нот строя', () => {
    const sourceLength = GUITAR_STANDARD_E.notes.length;

    buildStringsNotes(GUITAR_STANDARD_E.notes, 10);

    expect(GUITAR_STANDARD_E.notes).toHaveLength(sourceLength);
  });

  it('возвращает пустой список для нуля и пустого строя', () => {
    expect(buildStringsNotes(GUITAR_STANDARD_E.notes, 0)).toEqual([]);
    expect(buildStringsNotes([], 5)).toEqual([]);
  });

  it('строит от переданной ноты, если строй пуст', () => {
    const seed = [new Note(NoteNames.E, OctaveNames.Two)];

    expect(buildStringsNotes(seed, 2).map(note => note.note)).toEqual([NoteNames.E, NoteNames['D#']]);
  });
});
