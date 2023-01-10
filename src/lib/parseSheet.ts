import type { EventType } from '$lib/stores/eventsCalendar';

export function extractJSON(text: string) {
  const innerJSON = text.substring(47).slice(0, -2);

  return JSON.parse(innerJSON);
}

function dateFromStr(str: string) {
  const [y, m, d] = str
    .replace(/[a-zA-Z()]/g, '')
    .split(',')
    .map((c) => Number(c));

  return new Date(`${y}-${m + 1}-${d}`);
}

function parseRow(data: Record<string, any>): EventType | null {
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

export function parseSheet(data: Record<string, any>): EventType[] {
  const { rows } = data.table;

  const events = rows
    .slice(1)
    .map((item: Record<string, any>) => parseRow(item))
    .filter(Boolean);

  return events;
}
