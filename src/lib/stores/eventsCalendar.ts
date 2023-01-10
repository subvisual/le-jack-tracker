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
  color?: string;
};

export type EventInDay = EventType & {
  isLastDay?: boolean;
  isFirstDay?: boolean;
  line: number;
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

function eventsCalendar() {
  const store = writable<EventsCalendar>({
    events: [],
    calendar: [],
    year: new Date().getFullYear(),
    active: -1
  });

  function create(events: EventType[]) {
    const evts = processEvents(events);

    store.update((st) => ({
      ...st,
      events: processEvents(evts),
      calendar: buildCalendar(evts)
    }));
  }

  function processEvents(events: EventType[]) {
    const colors = [
      'Lavender',
      'PaleGoldenrod',
      'PaleGreen',
      'LightCoral',
      'LightCyan'
    ];
    let index = 0;

    return events.map((item) => {
      const out = {
        ...item,
        color: colors[index]
      };

      index = index === colors.length - 1 ? 0 : index + 1;

      return out;
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
      let linesTrack = {};

      for (let j = 1; j <= daysInMonth(i, year); j++) {
        const current = new Date(`${year}-${padDateStr(i)}-${padDateStr(j)}`);
        const { events, lines } = eventsInDate(allEvents, current, linesTrack);
        linesTrack = lines;
        month.days.push({ current, events });
      }

      cal.push(month);
    }

    console.log(cal);

    return cal;
  }

  function eventsInDate(events: EventType[], date: Date, lines: any) {
    const rel: EventInDay[] = [];
    const linesToDel = [];

    for (let i = 0; i < events.length; i++) {
      let line = 0;

      const inRange =
        new Date(events[i].startDate) <= date &&
        new Date(events[i].endDate) >= date;

      if (!inRange) {
        continue;
      }

      const isLastDay =
        new Date(events[i].endDate).getTime() === date.getTime();
      const isFirstDay =
        new Date(events[i].startDate).getTime() === date.getTime();

      const lineNotRegistered = !(events[i].id in lines);

      if (isFirstDay || lineNotRegistered) {
        const takenLines = Object.values(lines);
        for (let freeLine = 0; freeLine < 20; freeLine++) {
          if (!takenLines.includes(freeLine)) {
            line = freeLine;
            lines[events[i].id] = freeLine;
            break;
          }
        }
      } else {
        line = lines[events[i].id];
      }

      if (isLastDay) {
        linesToDel.push(events[i].id);
      }

      rel.push({ ...events[i], isLastDay, isFirstDay, line });
    }

    linesToDel.forEach((id) => delete lines[id]);

    return { events: rel, lines };
  }

  return {
    subscribe: store.subscribe,
    set: store.set,
    buildCalendar,
    create
  };
}

export default eventsCalendar();
