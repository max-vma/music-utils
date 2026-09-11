export interface ScaleStep {
  /** Номер ступени в пределах октавы: 1..7 (8 — октава). */
  number: number;
  /** Альтерация ступени: '', '#' или 'b'. */
  accidental: string;
  /** Готовая подпись ступени: 'I', 'bIII', '#IV', 'VIII'. */
  label: string;
}

export interface ScaleInterval {
  /** Количество полутонов между нотами. */
  semitones: number;
  /** Порядковый номер интервала: 1 — прима, 2 — секунда, 3 — терция и т.д. */
  number: number;
  /** Готовая подпись интервала: 'м.2', 'б.2', 'ч.4', 'ув.4', 'ум.5'. */
  label: string;
}

// Хроматическая шкала ступеней относительно тоники.
// Опираемся на полутоновое расстояние, а не на букву ноты, поэтому
// минорная терция всегда записывается как bIII, а повышенная кварта —
// как #IV (как принято в джазовой нотации).
const STEPS_BY_SEMITONE: readonly ScaleStep[] = [
  { number: 1, accidental: '', label: 'I' },
  { number: 2, accidental: 'b', label: 'bII' },
  { number: 2, accidental: '', label: 'II' },
  { number: 3, accidental: 'b', label: 'bIII' },
  { number: 3, accidental: '', label: 'III' },
  { number: 4, accidental: '', label: 'IV' },
  { number: 4, accidental: '#', label: '#IV' },
  { number: 5, accidental: '', label: 'V' },
  { number: 6, accidental: 'b', label: 'bVI' },
  { number: 6, accidental: '', label: 'VI' },
  { number: 7, accidental: 'b', label: 'bVII' },
  { number: 7, accidental: '', label: 'VII' },
];

const OCTAVE_STEP: ScaleStep = { number: 8, accidental: '', label: 'VIII' };

// Количество полутонов в чистых интервалах (прима, кварта, квинта, октава).
const PERFECT_INTERVAL_SEMITONES: Record<number, number> = { 1: 0, 4: 5, 5: 7, 8: 12 };

// Количество полутонов в больших интервалах (секунда, терция, секста, септима).
const MAJOR_INTERVAL_SEMITONES: Record<number, number> = { 2: 2, 3: 4, 6: 9, 7: 11 };

function normalizeSemitones(semitonesFromTonic: number): number {
  return ((semitonesFromTonic % 12) + 12) % 12;
}

/** Возвращает ступень гаммы по числу полутонов от тоники. */
export function getScaleStep(semitonesFromTonic: number): ScaleStep {
  const normalized = normalizeSemitones(semitonesFromTonic);

  if (normalized === 0 && semitonesFromTonic !== 0) return OCTAVE_STEP;

  return STEPS_BY_SEMITONE[normalized];
}

/** Номер ступени с учётом пройденных октав — нужен для расчёта интервалов. */
function getStepNumber(semitonesFromTonic: number): number {
  const octaves = Math.floor(semitonesFromTonic / 12);
  const normalized = normalizeSemitones(semitonesFromTonic);

  return STEPS_BY_SEMITONE[normalized].number + octaves * 7;
}

function getIntervalQuality(semitones: number, number: number): string {
  const perfectSemitones = PERFECT_INTERVAL_SEMITONES[number];

  if (perfectSemitones !== undefined) {
    const diff = semitones - perfectSemitones;
    if (diff === 0) return 'ч.';
    return diff > 0 ? 'ув.' : 'ум.';
  }

  const majorSemitones = MAJOR_INTERVAL_SEMITONES[number];

  if (majorSemitones !== undefined) {
    const diff = semitones - majorSemitones;
    if (diff === 0) return 'б.';
    if (diff === -1) return 'м.';
    return diff > 0 ? 'ув.' : 'ум.';
  }

  return '';
}

/** Возвращает интервал между двумя ступенями по их полутонам от тоники. */
export function getScaleInterval(fromSemitones: number, toSemitones: number): ScaleInterval {
  const semitones = toSemitones - fromSemitones;
  const number = getStepNumber(toSemitones) - getStepNumber(fromSemitones) + 1;
  const quality = getIntervalQuality(semitones, number);

  return { semitones, number, label: `${quality}${number}` };
}
