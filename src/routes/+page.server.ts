import { parseSheet, extractJSON } from '$lib/parseSheet';
import type { PageServerLoad } from './$types';

const ENDPOINT =
  'https://docs.google.com/spreadsheets/d/1UJLdKW5IymgPAmKakMvCyd35dtc8IOZ04bc0fAvp8kI/gviz/tq?tqx=out:json&tq&gid=1160078856';

export const load: PageServerLoad = async ({ setHeaders }) => {
  setHeaders({
    'cache-control': 'public, max-age=600, stale-while-revalidate=300'
  });

  const req = await fetch(ENDPOINT);
  const data = extractJSON(await req.text());
  const events = parseSheet(data);

  return {
    events
  };
};
