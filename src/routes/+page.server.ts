import { invalidate } from '$app/navigation';
import { parseSheet, extractJSON } from '$lib/parseSheet';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const ENDPOINT =
  'https://docs.google.com/spreadsheets/d/1UJLdKW5IymgPAmKakMvCyd35dtc8IOZ04bc0fAvp8kI/gviz/tq?tqx=out:json&tq&gid=1160078856';

export const load: PageServerLoad = async ({ setHeaders, locals }) => {
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

export const actions: Actions = {
  setTheme: async ({ url, cookies, request }) => {
    const theme = url.searchParams.get('theme');
    console.log(request.headers);

    if (theme) {
      cookies.set('theme', theme, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365
      });
    }    

    throw redirect(303, '/');
  }
};
