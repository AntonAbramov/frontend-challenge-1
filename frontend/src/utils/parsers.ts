type Key = string;
type RawData = Record<string, string>;

type ParserFunction<T> = [Key, (data: RawData) => T | undefined];
type Parser<T> = (field: string) => ParserFunction<T>;

export const parseDate: Parser<Date> = (field) => [
  field,
  (data) => {
    const value = data[field];

    const date = new Date(value);
    if (date.toString() === "Invalid Date") {
      return;
    }

    return date;
  },
];

export const parseNumber: Parser<number> = (field) => [
  field,
  (data) => {
    const value = data[field];

    const num = Number(value);
    if (isNaN(num)) {
      return;
    }

    return num;
  },
];

export const parseBoolean: Parser<boolean> = (field) => [
  field,
  (data) => {
    const value = data[field];

    return value?.toLowerCase() === "true";
  },
];

export const parseString: Parser<string> = (field) => [
  field,
  (data) => {
    return data[field];
  },
];

export const parseRawObject = <T extends object>(data: RawData, parsers: ParserFunction<any>[]) => {
  const result: any = {};

  parsers.forEach(([key, parser]) => {
    result[key] = parser(data);
  });

  return result as T;
};
