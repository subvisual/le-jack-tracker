import { parseSheet, extractJSON } from '$lib/parseSheet';
import type { Theme } from '$lib/stores/theme';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const ENDPOINT =
  'https://docs.google.com/spreadsheets/d/1UJLdKW5IymgPAmKakMvCyd35dtc8IOZ04bc0fAvp8kI/gviz/tq?tqx=out:json&tq&gid=1160078856';

export const load: PageServerLoad = async ({ setHeaders, cookies }) => {
  setHeaders({
    'cache-control': 'public, max-age=600, stale-while-revalidate=300'
  });

  const theme = cookies.get('theme') as Theme;

  const req = await fetch(ENDPOINT);
  const data = extractJSON(await req.text());
  const events = parseSheet(data);

  return {
    events,
    theme
  };
};

export const actions: Actions = {
  setTheme: async ({ url, cookies, setHeaders }) => {
    const theme = url.searchParams.get('theme');

    if (theme) {
      cookies.set('theme', theme, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365
      });
    }

    setHeaders({
      'Clear-Site-Data': '"cache"'
    });

    throw redirect(303, '/');
  }
};
