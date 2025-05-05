const months: Record<string, number> = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

export const DateConverter = (dateStr: string): string => {
  const dateArray = dateStr.split(" ");
  const month = String(months[dateArray[1]]).padStart(2, "0");
  const date = dateArray[2].padStart(2, "0");
  const year = dateArray[3];

  return `${date}-${month}-${year}`;
};
