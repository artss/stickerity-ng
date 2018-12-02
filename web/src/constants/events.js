export const HOLIDAY = 1;
export const BIRTHDAY = 2;
export const APPOINTMENT = 3;
export const DEPARTURE = 4;
export const TODO = 5;

export const eventTypes = {
  [HOLIDAY]: { icon: 'redeem', title: 'Holiday' },
  [BIRTHDAY]: { icon: 'cake', title: 'Birthday' },
  [APPOINTMENT]: { icon: 'work_outline', title: 'Appointment' },
  [DEPARTURE]: { icon: 'flight_takeoff', title: 'Departure' },
  [TODO]: { icon: 'done', title: 'To Do' },
};

export const UPCOMING_EVENTS_LIMIT = 20;