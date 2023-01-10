import mock from '$lib/mock';
import type { Event } from '$lib/parseSheet';
import extractJSON from '../lib/extractJSON';
import type { PageServerLoad } from './$types';

const ENDPOINT =
  'https://docs.google.com/spreadsheets/d/1UJLdKW5IymgPAmKakMvCyd35dtc8IOZ04bc0fAvp8kI/gviz/tq?tqx=out:json&tq&gid=1160078856';

export const load: PageServerLoad = async () => {
  /* const req = await fetch(ENDPOINT);
  const data = extractJSON(await req.text());
  const events = parseSheet(data); */

  const events = mock as Event[];

  return {
    events
  };
};
