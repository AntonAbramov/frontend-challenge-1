export type CsvData = Array<string[]>;

export const csvToJson = (csvData: CsvData) => {
  const namesRow = csvData[1];

  return csvData.slice(2).map((item) => {
    const result: Record<string, string> = {};
    namesRow.forEach((key, index) => {
      result[key] = item[index];
    });
    return result;
  });
};
