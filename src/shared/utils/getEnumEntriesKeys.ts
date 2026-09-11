// Object.entries numeric enum добавляет обратный маппинг — оставляем только пары «имя — число».
export function getEnumEntriesKeys<T extends object>(enumObject: T): Array<[string, number]> {
  return Object.entries(enumObject as Record<string, unknown>).filter((entry): entry is [string, number] =>
    Number.isInteger(entry[1]),
  );
}
