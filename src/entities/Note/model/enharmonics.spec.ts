import { NoteNames } from '@/entities/Note/consts';
import { Note } from '@/entities/Note/model/Note';
import {
  areEnharmonicallyEqual,
  getEnharmonicEquivalent,
  getFlatNoteName,
  getPitchClass,
  getSharpNoteName,
} from './enharmonics';

describe('getPitchClass', () => {
  it('определяет высоту по объекту, значению enum и строке', () => {
    expect(getPitchClass(NoteNames['C#'])).toBe(1);
    expect(getPitchClass(new Note(NoteNames.E, undefined))).toBe(4);
    expect(getPitchClass('Db')).toBe(1);
  });

  it('поддерживает двойные альтерации', () => {
    expect(getPitchClass('C##')).toBe(2);
    expect(getPitchClass('Ebb')).toBe(2);
  });

  it('возвращает null для нераспознанного имени', () => {
    expect(getPitchClass('H')).toBeNull();
  });
});

describe('areEnharmonicallyEqual', () => {
  it('считает энгармонизмы равными по высоте', () => {
    expect(areEnharmonicallyEqual('C#', 'Db')).toBe(true);
    expect(areEnharmonicallyEqual(NoteNames['F#'], 'Gb')).toBe(true);
    expect(areEnharmonicallyEqual('C', 'B#')).toBe(true);
  });

  it('различает разные высоты', () => {
    expect(areEnharmonicallyEqual('C', 'D')).toBe(false);
  });

  it('не падает на нераспознанных именах', () => {
    expect(areEnharmonicallyEqual('X', 'C')).toBe(false);
  });
});

describe('getEnharmonicEquivalent', () => {
  it('меняет диезы на бемоли и обратно', () => {
    expect(getEnharmonicEquivalent('C#')).toBe('Db');
    expect(getEnharmonicEquivalent('Db')).toBe('C#');
    expect(getEnharmonicEquivalent(NoteNames['G#'])).toBe('Ab');
  });

  it('учитывает теоретические энгармонизмы натуральных нот', () => {
    expect(getEnharmonicEquivalent('C')).toBe('B#');
    expect(getEnharmonicEquivalent('B#')).toBe('C');
    expect(getEnharmonicEquivalent('E')).toBe('Fb');
    expect(getEnharmonicEquivalent('Fb')).toBe('E');
    expect(getEnharmonicEquivalent('F')).toBe('E#');
    expect(getEnharmonicEquivalent('E#')).toBe('F');
    expect(getEnharmonicEquivalent('B')).toBe('Cb');
    expect(getEnharmonicEquivalent('Cb')).toBe('B');
  });

  it('возвращает ту же ноту, если простого энгармонизма нет', () => {
    expect(getEnharmonicEquivalent('D')).toBe('D');
    expect(getEnharmonicEquivalent('G')).toBe('G');
    expect(getEnharmonicEquivalent('A')).toBe('A');
  });

  it('приводит двойные альтерации к простой записи', () => {
    expect(getEnharmonicEquivalent('C##')).toBe('D');
  });

  it('возвращает исходное имя, если оно не распознано', () => {
    expect(getEnharmonicEquivalent('X')).toBe('X');
  });
});

describe('getSharpNoteName и getFlatNoteName', () => {
  it('возвращает запись ноты по высоте', () => {
    expect(getSharpNoteName(NoteNames['D#'])).toBe('D#');
    expect(getFlatNoteName(NoteNames['D#'])).toBe('Eb');
    expect(getSharpNoteName('Ab')).toBe('G#');
    expect(getFlatNoteName('F#')).toBe('Gb');
  });
});
