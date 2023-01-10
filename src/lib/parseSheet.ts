import type { EventType } from '$lib/stores/eventsCalendar';
import padDateStr from './util/padDateStr';

export function extractJSON(text: string) {
  const innerJSON = text.substring(47).slice(0, -2);

  return JSON.parse(innerJSON);
}

function dateFromStr(str: string) {
  const [y, m, d] = str
    .replace(/[a-zA-Z()]/g, '')
    .split(',')
    .map((c) => Number(c));

  return new Date(`${y}-${padDateStr(m + 1)}-${padDateStr(d)}`);
}

function parseRow(data: Record<string, any>, id: number): EventType | null {
  const cols = data.c;
  try {
    const start = dateFromStr(cols[1].v);
    const end = dateFromStr(cols[2].v);
    console.log(end.getTime() - start.getTime());

    return {
      id,
      name: cols[0].v,
      startDate: start,
      endDate: end,
      city: cols[3].v,
      country: cols[4].v,
      region: cols[5].v,
      url: cols[6].v,
      twitter: cols[7].v,
      duration: (end.getTime() - start.getTime()) / 1000 / 60 / 60 / 24 + 1
    };
  } catch {
    return null;
  }
}

export function parseSheet(data: Record<string, any>): EventType[] {
  const { rows } = data.table;

  const events = rows
    .slice(1)
    .map((item: Record<string, any>, idx: number) => parseRow(item, idx))
    .filter(Boolean);

  return events;
}
