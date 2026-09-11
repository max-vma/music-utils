import { describe, expect, it } from 'vitest';
import { clampNeckCount } from './clampNeckCount';

describe('clampNeckCount', () => {
  it('возвращает значение в границах без изменений', () => {
    expect(clampNeckCount(7, 4, 12, 6)).toBe(7);
  });

  it('зажимает значение по нижней и верхней границе', () => {
    expect(clampNeckCount(0, 4, 12, 6)).toBe(4);
    expect(clampNeckCount(-10, 4, 12, 6)).toBe(4);
    expect(clampNeckCount(100, 4, 12, 6)).toBe(12);
  });

  it('округляет дробные значения', () => {
    expect(clampNeckCount(7.4, 4, 12, 6)).toBe(7);
    expect(clampNeckCount(7.6, 4, 12, 6)).toBe(8);
  });

  it('подменяет некорректные значения на fallback', () => {
    expect(clampNeckCount(Number.NaN, 4, 12, 6)).toBe(6);
    expect(clampNeckCount(Number.POSITIVE_INFINITY, 4, 12, 6)).toBe(6);
    expect(clampNeckCount(undefined, 4, 12, 6)).toBe(6);
    expect(clampNeckCount('abc', 4, 12, 6)).toBe(6);
  });

  it('приводит числовые строки к числу', () => {
    expect(clampNeckCount('9', 4, 12, 6)).toBe(9);
  });
});
