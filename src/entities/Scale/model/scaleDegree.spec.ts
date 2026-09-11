import { describe, expect, it } from 'vitest';
import { getScaleInterval, getScaleStep } from './scaleDegree';

describe('getScaleStep', () => {
  it('определяет натуральные ступени', () => {
    expect(getScaleStep(0)).toMatchObject({ number: 1, accidental: '', label: 'I' });
    expect(getScaleStep(2)).toMatchObject({ number: 2, accidental: '', label: 'II' });
    expect(getScaleStep(4)).toMatchObject({ number: 3, accidental: '', label: 'III' });
    expect(getScaleStep(5)).toMatchObject({ number: 4, accidental: '', label: 'IV' });
    expect(getScaleStep(7)).toMatchObject({ number: 5, accidental: '', label: 'V' });
    expect(getScaleStep(9)).toMatchObject({ number: 6, accidental: '', label: 'VI' });
    expect(getScaleStep(11)).toMatchObject({ number: 7, accidental: '', label: 'VII' });
  });

  it('добавляет альтерации к пониженным и повышенным ступеням', () => {
    expect(getScaleStep(1).label).toBe('bII');
    expect(getScaleStep(3).label).toBe('bIII');
    expect(getScaleStep(6).label).toBe('#IV');
    expect(getScaleStep(8).label).toBe('bVI');
    expect(getScaleStep(10).label).toBe('bVII');
    expect(getScaleStep(3).accidental).toBe('b');
    expect(getScaleStep(6).accidental).toBe('#');
  });

  it('помечает октаву отдельной ступенью', () => {
    expect(getScaleStep(12)).toMatchObject({ number: 8, accidental: '', label: 'VIII' });
  });

  it('нормализует ступени за пределами октавы', () => {
    expect(getScaleStep(14).label).toBe('II');
    expect(getScaleStep(24).label).toBe('VIII');
  });
});

describe('getScaleInterval', () => {
  it('называет простые интервалы от тоники', () => {
    expect(getScaleInterval(0, 1)).toMatchObject({ semitones: 1, number: 2, label: 'м.2' });
    expect(getScaleInterval(0, 2)).toMatchObject({ semitones: 2, number: 2, label: 'б.2' });
    expect(getScaleInterval(0, 3)).toMatchObject({ semitones: 3, number: 3, label: 'м.3' });
    expect(getScaleInterval(0, 4)).toMatchObject({ semitones: 4, number: 3, label: 'б.3' });
    expect(getScaleInterval(0, 5)).toMatchObject({ semitones: 5, number: 4, label: 'ч.4' });
    expect(getScaleInterval(0, 6)).toMatchObject({ semitones: 6, number: 4, label: 'ув.4' });
    expect(getScaleInterval(0, 7)).toMatchObject({ semitones: 7, number: 5, label: 'ч.5' });
  });

  it('различает интервалы с одинаковым числом полутонов по ступеням', () => {
    expect(getScaleInterval(0, 6).label).toBe('ув.4');
    expect(getScaleInterval(2, 8).label).toBe('ум.5');
  });

  it('называет составные интервалы и октаву', () => {
    expect(getScaleInterval(0, 8)).toMatchObject({ semitones: 8, number: 6, label: 'м.6' });
    expect(getScaleInterval(0, 9).label).toBe('б.6');
    expect(getScaleInterval(0, 10)).toMatchObject({ semitones: 10, number: 7, label: 'м.7' });
    expect(getScaleInterval(0, 11).label).toBe('б.7');
    expect(getScaleInterval(0, 12)).toMatchObject({ semitones: 12, number: 8, label: 'ч.8' });
  });

  it('обрабатывает совпадающие ступени и альтерации', () => {
    expect(getScaleInterval(3, 3)).toMatchObject({ semitones: 0, number: 1, label: 'ч.1' });
    expect(getScaleInterval(5, 6).label).toBe('ув.1');
    expect(getScaleInterval(3, 5).label).toBe('б.2');
  });
});
