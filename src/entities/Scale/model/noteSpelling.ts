import { NoteNames } from '@/entities/Note/consts';
import { getScaleStep } from '@/entities/Scale/model/scaleDegree';

const NATURAL_LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const;
const NATURAL_PITCHES = [0, 2, 4, 5, 7, 9, 11] as const;

// Буква, которой соответствует высота при диезной записи (C# -> C, D# -> D, ...).
const LETTER_INDEX_BY_PITCH_CLASS = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6] as const;

// Отклонение фактической высоты от натуральной ступени: -1 -> b, +1 -> #.
const ACCIDENTAL_SYMBOLS: Record<number, string> = { [-2]: 'bb', [-1]: 'b', 0: '', 1: '#', 2: '##' };

function formatPitchClass(value: number): number {
  return ((value % 12) + 12) % 12;
}

/**
 * Записывает ноту музыкально корректно относительно тоники. Буква ступени
 * выбирается по её номеру (I..VII — семь разных букв), а альтерация — по
 * разнице фактической высоты и натуральной высоты этой буквы. Поэтому в одной
 * тональности не появятся одновременно, например, G и G#: ноте G# соответствует
 * только буква G. Примеры: bIII от C -> Eb, терция от C# -> E#, #IV в лидийском
 * от C -> F#, а в миноре bVI/bVII от C -> Ab/Bb.
 */
export function getContextualNoteName(tonic: NoteNames, semitonesFromTonic: number): string {
  const tonicPitch = formatPitchClass(tonic);
  const actualPitch = formatPitchClass(tonicPitch + semitonesFromTonic);
  const { number } = getScaleStep(semitonesFromTonic);

  const tonicLetterIndex = LETTER_INDEX_BY_PITCH_CLASS[tonicPitch];
  const letterIndex = (tonicLetterIndex + number - 1) % 7;
  const naturalPitch = NATURAL_PITCHES[letterIndex];

  let diff = actualPitch - naturalPitch;
  if (diff > 6) diff -= 12;
  if (diff < -6) diff += 12;

  return `${NATURAL_LETTERS[letterIndex]}${ACCIDENTAL_SYMBOLS[diff] ?? ''}`;
}
