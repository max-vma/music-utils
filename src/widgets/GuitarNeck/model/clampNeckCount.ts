/**
 * Приводит число струн/ладов к целому значению в допустимых границах.
 * Некорректные значения (NaN, Infinity, строки, null, undefined) заменяются
 * на fallback, остальные — округляются и зажимаются в диапазон [min, max].
 */
export function clampNeckCount(value: unknown, min: number, max: number, fallback: number): number {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) return fallback;

  return Math.min(Math.max(Math.round(numericValue), min), max);
}
