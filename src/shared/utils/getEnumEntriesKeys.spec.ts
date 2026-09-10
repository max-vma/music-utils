import { getEnumEntriesKeys } from './getEnumEntriesKeys';

enum SampleEnum {
  A,
  B,
  C,
}

describe('getEnumEntriesKeys', () => {
  it('возвращает пары «имя — значение» только для числовых значений перечисления', () => {
    expect(getEnumEntriesKeys(SampleEnum)).toEqual([
      ['A', 0],
      ['B', 1],
      ['C', 2],
    ]);
  });
});
