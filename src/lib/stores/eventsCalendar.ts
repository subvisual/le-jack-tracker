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
  color?: string;
};

export type EventInDay = EventType & {
  isLastDay?: boolean;
  isFirstDay?: boolean;
  progress: number;
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
    active: 51
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
      '#e4e4e7',
      '#fecaca',
      '#fed7aa',
      '#fef08a',
      '#d9f99d',
      '#a7f3d0',
      '#bae6fd',
      '#c7d2fe',
      '#e9d5ff',
      '#fbcfe8'
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
    let eventsProgress: Record<number, number> = {};

    for (let i = 1; i <= MONTHS_IN_YEAR; i++) {
      const month: Month = {
        current: new Date(year, i - 1),
        days: []
      };
      let linesTrack: Record<number, number> = {};

      for (let j = 1; j <= daysInMonth(i, year); j++) {
        const current = new Date(`${year}-${padDateStr(i)}-${padDateStr(j)}`);
        const { events, lines, evtProgress } = eventsInDate(
          allEvents,
          current,
          linesTrack,
          eventsProgress
        );
        linesTrack = lines;
        eventsProgress = evtProgress;

        month.days.push({ current, events });
      }

      cal.push(month);
    }

    console.log(cal);

    return cal;
  }

  function eventsInDate(
    events: EventType[],
    date: Date,
    lines: Record<number, number>,
    evtProgress: Record<number, number>
  ) {
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

      if (!(events[i].id in evtProgress)) {
        evtProgress[events[i].id] = 1;
      } else {
        evtProgress[events[i].id]++;
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

      rel.push({
        ...events[i],
        isLastDay,
        isFirstDay,
        line,
        progress: evtProgress[events[i].id]
      });
    }

    linesToDel.forEach((id) => delete lines[id]);

    return { events: rel, lines, evtProgress };
  }

  return {
    subscribe: store.subscribe,
    set: store.set,
    buildCalendar,
    create
  };
}

export default eventsCalendar();
