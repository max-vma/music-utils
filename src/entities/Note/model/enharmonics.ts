import { NoteNames } from '@/entities/Note/consts';
import { Note } from '@/entities/Note/model/Note';

/** Нота в любом поддерживаемом представлении: объект, высота из enum или имя строкой. */
export type NoteLike = Note | NoteNames | string;

/** Хроматическая высота в диезной записи. */
const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const;

/** Хроматическая высота в бемольной записи. */
const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'] as const;

/**
 * «Теоретические» энгармонизмы натуральных нот, у которых нет простого
 * диеза/бемоля в хроматической гамме (C ↔ B#, E ↔ Fb, F ↔ E#, B ↔ Cb).
 */
const THEORETICAL_NAMES: Record<number, string> = {
  [NoteNames.C]: 'B#',
  [NoteNames.E]: 'Fb',
  [NoteNames.F]: 'E#',
  [NoteNames.B]: 'Cb',
};

const LETTER_PITCH: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

const NOTE_NAME_PATTERN = /^([A-Ga-g])([#b]*)$/;

const ACCIDENTAL_SYMBOLS: Record<string, number> = { '#': 1, b: -1 };

function formatPitchClass(value: number): number {
  return ((value % 12) + 12) % 12;
}

function parseNoteName(name: string): number | null {
  const match = NOTE_NAME_PATTERN.exec(name.trim());
  if (!match) return null;

  const [, letter, accidentals] = match;
  const basePitch = LETTER_PITCH[letter.toUpperCase()];
  if (basePitch === undefined) return null;

  const offset = [...accidentals].reduce((sum, accidental) => sum + (ACCIDENTAL_SYMBOLS[accidental] ?? 0), 0);

  return formatPitchClass(basePitch + offset);
}

function getNoteName(note: NoteLike): string {
  if (note instanceof Note) return note.noteName;
  if (typeof note === 'number') return SHARP_NAMES[formatPitchClass(note)];
  return note.trim();
}

/** Возвращает хроматическую высоту ноты (0..11) или null, если имя не распознано. */
export function getPitchClass(note: NoteLike): number | null {
  if (note instanceof Note) return formatPitchClass(note.note);
  if (typeof note === 'number') return formatPitchClass(note);
  return parseNoteName(note);
}

/** Проверяет, что две ноты звучат одинаково (энгармонически равны по высоте). */
export function areEnharmonicallyEqual(first: NoteLike, second: NoteLike): boolean {
  const firstPitch = getPitchClass(first);
  const secondPitch = getPitchClass(second);

  return firstPitch !== null && secondPitch !== null && firstPitch === secondPitch;
}

/** Возвращает энгармонически равное имя ноты без октавы — «обратную» запись. */
export function getEnharmonicEquivalent(note: NoteLike): string {
  const pitchClass = getPitchClass(note);
  if (pitchClass === null) return getNoteName(note);

  const name = getNoteName(note);
  const sharpName = SHARP_NAMES[pitchClass];
  const flatName = FLAT_NAMES[pitchClass];
  const theoreticalName = THEORETICAL_NAMES[pitchClass];

  if (theoreticalName !== undefined) {
    return name === theoreticalName ? sharpName : theoreticalName;
  }

  if (sharpName === flatName) return sharpName;

  return name.includes('b') ? sharpName : flatName;
}

/** Диезная запись высоты ноты (режим отображения «диезы»). */
export function getSharpNoteName(note: NoteLike): string {
  const pitchClass = getPitchClass(note);
  return pitchClass === null ? getNoteName(note) : SHARP_NAMES[pitchClass];
}

/** Бемольная запись высоты ноты (режим отображения «бемоли»). */
export function getFlatNoteName(note: NoteLike): string {
  const pitchClass = getPitchClass(note);
  return pitchClass === null ? getNoteName(note) : FLAT_NAMES[pitchClass];
}
