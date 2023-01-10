export type Event = {
  name: string;
  startDate: string | Date;
  endDate: string | Date;
  city: string;
  country: string;
  region: string;
  url: string;
  twitter: string;
};

function dateFromStr(str: string) {
  const [y, m, d] = str
    .replace(/[a-zA-Z()]/g, '')
    .split(',')
    .map((c) => Number(c));

  return new Date(`${y}-${m + 1}-${d}`);
}

function parseRow(data: Record<string, any>): Event | null {
  const cols = data.c;

  try {
    return {
      name: cols[0].v,
      startDate: dateFromStr(cols[1].v),
      endDate: dateFromStr(cols[2].v),
      city: cols[3].v,
      country: cols[4].v,
      region: cols[5].v,
      url: cols[6].v,
      twitter: cols[7].v
    };
  } catch {
    return null;
  }
}

export default function parseSheet(data: Record<string, any>): Event[] {
  const { rows } = data.table;

  const events = rows
    .slice(1)
    .map((item: Record<string, any>) => parseRow(item))
    .filter(Boolean);

  return events;
}

export function eventInDate(events: Event[], date: Date) {
  const relevant = events.filter(
    (evt) => new Date(evt.startDate) <= date && new Date(evt.endDate) >= date
  );

  return relevant;
}
