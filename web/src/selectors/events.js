import { createSelector } from 'reselect';

export const getMonthEvents = createSelector(
  [
    items => items,
    (items, currentYear) => currentYear,
    (items, currentYear, currentMonth) => currentMonth,
  ],
  (items, currentYear, currentMonth) => items
    .filter(({ annual, year, month }) => (
      month === currentMonth
      && (annual || year === currentYear)
    ))
    .reduce(
      (acc, item) => {
        if (!acc[item.day]) {
          acc[item.day] = [];
        }
        acc[item.day].push(item);
        return acc;
      },
      {}
    )
);
