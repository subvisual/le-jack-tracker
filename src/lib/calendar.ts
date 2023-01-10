const MONTHS_IN_YEAR = 12;

function daysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}

export function calendar() {
  const cal = [];

  for (let i = 1; i <= MONTHS_IN_YEAR; i++) {
    const month = [];

    for (let j = 1; j <= daysInMonth(i, 2023); j++) {
      month.push(new Date(`2023-${i}-${j}`));
    }

    cal.push(month);
  }

  return cal;
}
