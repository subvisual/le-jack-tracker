import padDateStr from '$lib/util/padDateStr';
import { get, writable } from 'svelte/store';

export type EventType = {
  name: string;
  startDate: string | Date;
  endDate: string | Date;
  city: string;
  country: string;
  region: string;
  url: string;
  twitter: string;
};

type Day = {
  current: Date;
  events: EventType[];
};

export type Month = {
  current: Date;
  days: Day[];
};

export type EventsCalendar = {
  year: number;
  events: EventType[];
  calendar: Month[];
};

const MONTHS_IN_YEAR = 12;

function eventsCalendar() {
  const store = writable<EventsCalendar>({
    events: [],
    calendar: [],
    year: new Date().getFullYear()
  });

  function create(events: EventType[]) {
    store.set({
      events,
      calendar: buildCalendar(events),
      year: new Date().getFullYear()
    });
  }

  function daysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }

  function buildCalendar(allEvents: EventType[]) {
    const cal = [];
    const year = get(store).year;

    for (let i = 1; i <= MONTHS_IN_YEAR; i++) {
      const month: Month = {
        current: new Date(year, i - 1),
        days: []
      };

      for (let j = 1; j <= daysInMonth(i, year); j++) {
        const current = new Date(`${year}-${padDateStr(i)}-${padDateStr(j)}`);
        const events = eventsInDate(allEvents, current);
        month.days.push({ current, events });
      }

      cal.push(month);
    }

    console.log(cal);

    return cal;
  }

  function eventsInDate(events: EventType[], date: Date) {
    const rel: EventType[] = [];
    let hasFoundEvt = false;

    for (let i = 0; i < events.length; i++) {
      const inRange =
        new Date(events[i].startDate) <= date &&
        new Date(events[i].endDate) >= date;

      if (inRange) {
        rel.push(events[i]);
        hasFoundEvt = true;
      } else if (hasFoundEvt) {
        break;
      }
    }

    return rel;
  }

  return {
    subscribe: store.subscribe,
    buildCalendar,
    create
  };
}

export default eventsCalendar();
