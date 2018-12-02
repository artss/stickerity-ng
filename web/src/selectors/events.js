import { createSelector } from 'reselect';

export const getDayKey = ({ month, day }) => `${month}-${day}`;

export const getMonthEvents = createSelector(
  [
    items => items,
    (items, currentYear) => currentYear,
    (items, y, currentMonth) => currentMonth,
  ],
  (items, currentYear, currentMonth) => items
    .filter(({ annual, year, month }) => (
      month === currentMonth && (annual || year === currentYear)
    ))
    .reduce(
      (acc, item) => {
        const dayKey = getDayKey(item);
        if (!acc[dayKey]) {
          acc[dayKey] = [];
        }
        acc[dayKey].push(item);
        return acc;
      },
      {}
    )
);

export const getDayEvents = createSelector(
  [
    items => items,
    (items, currentYear) => currentYear,
    (items, y, currentMonth) => currentMonth,
    (items, y, m, currentDay) => currentDay,
  ],
  (items, currentYear, currentMonth, currentDay) => ({
    [currentDay]: items.filter(({ annual, year, month, day }) => (
      (annual || year === currentYear)
      && month === currentMonth
      && day === currentDay)),
  })
);

export const getUpcomingEvents = createSelector(
  [
    items => items,
    (items, currentYear) => currentYear,
    (items, currentYear, currentMonth) => currentMonth,
    (list, currentYear, currentMonth, limit) => limit,
  ],
  (items, currentYear, currentMonth, limit) => {
    const currentDate = new Date(currentYear, currentMonth - 1, 1);

    return items
      .filter(({ annual, year, month, day }) => {
        let eventDate;

        if (annual) {
          eventDate = new Date(currentYear, month - 1, day);
          if (eventDate < currentDate) {
            eventDate = new Date(currentYear + 1, month - 1, day);
          }
        } else {
          eventDate = new Date(year, month - 1);
        }

        return eventDate >= currentDate && eventDate - currentDate <= limit;
      })
      .sort((a, b) => {
        let ad = a.annual
          ? new Date(currentYear, a.month - 1, a.day)
          : new Date(a.year, a.month - 1, a.day);

        if (a.annual && ad < currentDate) {
          ad = new Date(currentYear + 1, a.month - 1, a.day);
        }

        let bd = b.annual
          ? new Date(currentYear, b.month - 1, b.day)
          : new Date(b.year, b.month - 1, b.day);

        if (b.annual && bd < currentDate) {
          bd = new Date(currentYear + 1, b.month - 1, b.day);
        }

        return ad - bd;
      })
      .reduce(
        (acc, item) => {
          const dayKey = getDayKey(item);

          if (!acc[dayKey]) {
            acc[dayKey] = [];
          }
          acc[dayKey].push(item);
          return acc;
        },
        {}
      );
  }
);