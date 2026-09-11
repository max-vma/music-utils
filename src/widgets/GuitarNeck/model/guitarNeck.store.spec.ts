import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { NoteNames } from '@/entities/Note/consts';
import { ScaleNames } from '@/entities/Scale/consts';
import { useScaleStore } from '@/entities/Scale/model/scale.store';
import { GUITAR_DROP_C, GUITAR_STANDARD_E } from '@/entities/Tuning/consts';
import { Tuning } from '@/entities/Tuning/model';
import { useTuningStore } from '@/entities/Tuning/model/tuning.store';
import {
  DEFAULT_FRETS_COUNT,
  DEFAULT_STRINGS_COUNT,
  MAX_FRETS_COUNT,
  MAX_STRINGS_COUNT,
  MIN_FRETS_COUNT,
  MIN_STRINGS_COUNT,
} from '@/widgets/GuitarNeck/consts';
import { useNeckStore } from './guitarNeck.store';

describe('guitarNeck.store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('задаёт значения по умолчанию, совместимые с текущим поведением', () => {
    const neckStore = useNeckStore();

    expect(neckStore.fretsCount).toBe(DEFAULT_FRETS_COUNT);
    expect(neckStore.fretsCount).toBe(12);
    expect(neckStore.stringsCount).toBe(DEFAULT_STRINGS_COUNT);
    expect(neckStore.stringsCount).toBe(6);
    expect(neckStore.stringNotes).toHaveLength(6);
  });

  it('зажимает число ладов в допустимый диапазон', () => {
    const neckStore = useNeckStore();

    neckStore.setFretsCount(0);
    expect(neckStore.fretsCount).toBe(MIN_FRETS_COUNT);

    neckStore.setFretsCount(1000);
    expect(neckStore.fretsCount).toBe(MAX_FRETS_COUNT);

    neckStore.setFretsCount(Number.NaN);
    expect(neckStore.fretsCount).toBe(DEFAULT_FRETS_COUNT);
  });

  it('зажимает число струн в допустимый диапазон', () => {
    const neckStore = useNeckStore();

    neckStore.setStringsCount(-5);
    expect(neckStore.stringsCount).toBe(MIN_STRINGS_COUNT);

    neckStore.setStringsCount(500);
    expect(neckStore.stringsCount).toBe(MAX_STRINGS_COUNT);

    neckStore.setStringsCount(Number.NaN);
    expect(neckStore.stringsCount).toBe(DEFAULT_STRINGS_COUNT);

    neckStore.setStringsCount(7.6);
    expect(neckStore.stringsCount).toBe(8);
  });

  it('изменение числа струн не меняет строй, тонику и тип звукового ряда', () => {
    const neckStore = useNeckStore();
    const tuningStore = useTuningStore();
    const scaleStore = useScaleStore();

    scaleStore.setTonic(NoteNames.C);
    scaleStore.setType(ScaleNames.NaturalMajor);

    neckStore.setStringsCount(4);

    expect(neckStore.stringsCount).toBe(4);
    expect(neckStore.stringNotes).toHaveLength(4);
    expect(tuningStore.notes).toHaveLength(6);
    expect(tuningStore.notes.map(note => note.note)).toEqual(GUITAR_STANDARD_E.notes.map(note => note.note));
    expect(scaleStore.tonic).toBe(NoteNames.C);
    expect(scaleStore.type).toBe(ScaleNames.NaturalMajor);
  });

  it('достраивает недостающие струны, не изменяя строй', () => {
    const neckStore = useNeckStore();
    const tuningStore = useTuningStore();

    neckStore.setStringsCount(8);

    expect(neckStore.stringNotes).toHaveLength(8);
    expect(neckStore.stringNotes.map(note => note.note)).toEqual([
      NoteNames.E,
      NoteNames.B,
      NoteNames.G,
      NoteNames.D,
      NoteNames.A,
      NoteNames.E,
      NoteNames['D#'],
      NoteNames.D,
    ]);
    expect(tuningStore.notes).toHaveLength(6);
  });

  it('изменение строя не меняет выбранное число струн', () => {
    const neckStore = useNeckStore();
    const tuningStore = useTuningStore();

    neckStore.setStringsCount(4);
    tuningStore.setTuning(GUITAR_DROP_C);

    expect(neckStore.stringsCount).toBe(4);
    expect(tuningStore.notes).toHaveLength(6);
    expect(neckStore.stringNotes.map(note => note.note)).toEqual([NoteNames.D, NoteNames.A, NoteNames.F, NoteNames.C]);
  });

  it('не падает на пустом строе, используя дефолтный', () => {
    const neckStore = useNeckStore();
    const tuningStore = useTuningStore();

    tuningStore.setTuning(new Tuning('Пустой', []));

    expect(neckStore.stringsCount).toBe(DEFAULT_STRINGS_COUNT);
    expect(neckStore.stringNotes).toHaveLength(DEFAULT_STRINGS_COUNT);
    expect(neckStore.stringNotes[0].note).toBe(NoteNames.E);
  });
});
