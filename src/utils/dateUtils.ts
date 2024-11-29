export function getDateRanges() {
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  const previousMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() - 1, lastMonth.getDate());

  return {
    now,
    lastMonth,
    previousMonth
  };
}

export function isInDateRange(date: string, start: Date, end: Date): boolean {
  const dateObj = new Date(date);
  return dateObj >= start && dateObj <= end;
}