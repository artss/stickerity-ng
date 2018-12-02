import { createSelector } from 'reselect';

const getDayKey = item => Number(new Date(item.year, item.month - 1, item.day));

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
        const day = getDayKey(item);
        if (!acc[day]) {
          acc[day] = [];
        }
        acc[day].push(item);
        return acc;
      },
      {}
    )
);

export const getUpcomingEvents = createSelector(
  [
    items => items,
    (items, currentYear) => currentYear,
    (items, currentYear, currentMonth) => currentMonth,
    (list, currentYear, currentMonth, limit) => limit,
  ],
  (items, currentYear, currentMonth, limit) => {
    const currentDate = new Date(currentYear, currentMonth);
    let eventList = items
      .filter(({ annual, year, month }) => (
        (annual && month >= currentMonth)
        || new Date(year, month) >= currentDate
      ));

    if (limit) {
      eventList = eventList.slice(0, limit);
    }

    return eventList.reduce(
      (acc, item) => {
        const day = getDayKey(item);

        if (!acc[day]) {
          acc[day] = [];
        }
        acc[day].push(item);
        return acc;
      },
      {}
    );
  }
);