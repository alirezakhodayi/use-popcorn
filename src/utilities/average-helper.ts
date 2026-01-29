export const average = (arr: number[]) => {
  if (arr.length === 0) return 0; // handle empty array safely
  const sum = arr.reduce((acc, cur) => acc + cur, 0);
  return sum / arr.length;
};
