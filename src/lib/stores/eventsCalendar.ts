import padDateStr from '$lib/util/padDateStr';
import { get, writable } from 'svelte/store';

export type EventType = {
  id: number;
  name: string;
  startDate: string | Date;
  endDate: string | Date;
  city: string;
  country: string;
  region: string;
  url: string;
  twitter: string;
  duration: number;
};

export type EventInDay = EventType & {
  isLastDay: boolean;
  isFirstDay: boolean;
  progress: number;
  line: number;
  color: {
    primary: string;
    secondary: string;
  };
};

type Day = {
  current: Date;
  events: EventInDay[];
};

export type Month = {
  current: Date;
  days: Day[];
};

export type EventsCalendar = {
  year: number;
  events: EventType[];
  calendar: Month[];
  active: number;
};

const MONTHS_IN_YEAR = 12;
const COLORS = [
  { primary: '#e4e4e7', secondary: '#d4d4d8' },
  { primary: '#fecaca', secondary: '#fca5a5' },
  { primary: '#fed7aa', secondary: '#fdba74' },
  { primary: '#fef08a', secondary: '#fde047' },
  { primary: '#d9f99d', secondary: '#bef264' },
  { primary: '#a7f3d0', secondary: '#6ee7b7' },
  { primary: '#bae6fd', secondary: '#7dd3fc' },
  { primary: '#c7d2fe', secondary: '#a5b4fc' },
  { primary: '#e9d5ff', secondary: '#d8b4fe' },
  { primary: '#fbcfe8', secondary: '#f9a8d4' }
];
const MAX_LINE_VAL = 20;

function eventsCalendar() {
  const store = writable<EventsCalendar>({
    calendar: [],
    events: [],
    year: new Date().getFullYear(),
    active: -1
  });

  function create(events: EventType[]) {
    const baseCalendar = buildCalendar();
    const calWithEvents = assignEventsToCalendar(events, baseCalendar);

    store.update((st) => ({
      ...st,
      calendar: calWithEvents,
      events
    }));
  }

  function findFirstAvailableLine(takenLines: number[]) {
    for (let i = 0; i < MAX_LINE_VAL; i++) {
      if (!takenLines.includes(i)) {
        return i;
      }
    }

    return 0;
  }

  function assignEventsToCalendar(events: EventType[], calendar: Month[]) {
    let colorIdx = 0;

    for (let i = 0; i < events.length; i++) {
      const event: EventInDay = {
        ...events[i],
        color: COLORS[colorIdx],
        isFirstDay: false,
        isLastDay: false,
        progress: 0,
        line: 0
      };

      let monthIdx = new Date(event.startDate).getMonth();
      let dayIdx = new Date(event.startDate).getDate() - 1;

      for (let j = 0; j < event.duration; j++) {
        const intoNextMonth = !calendar[monthIdx].days[dayIdx];
        const isLastDay = j === event.duration - 1;
        const isFirstDay = j === 0;
        const progress = j + 1;

        if (intoNextMonth) {
          monthIdx++;
          dayIdx = 0;
        }

        if (isFirstDay || intoNextMonth) {
          const takenLines = calendar[monthIdx].days[dayIdx].events.map(
            (ev) => ev.line
          );

          event.line = findFirstAvailableLine(takenLines);
        }

        calendar[monthIdx].days[dayIdx].events.push({
          ...event,
          progress,
          isFirstDay,
          isLastDay
        });

        dayIdx++;
      }

      colorIdx = colorIdx === COLORS.length - 1 ? 0 : colorIdx + 1;
    }

    return calendar;
  }

  function daysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }

  function buildCalendar() {
    const cal = [];
    const year = get(store).year;

    for (let i = 1; i <= MONTHS_IN_YEAR; i++) {
      const month: Month = {
        current: new Date(year, i - 1),
        days: []
      };

      for (let j = 1; j <= daysInMonth(i, year); j++) {
        const current = new Date(`${year}-${padDateStr(i)}-${padDateStr(j)}`);
        month.days.push({ current, events: [] });
      }

      cal.push(month);
    }

    return cal;
  }

  return {
    subscribe: store.subscribe,
    set: store.set,
    buildCalendar,
    create
  };
}

export default eventsCalendar();
