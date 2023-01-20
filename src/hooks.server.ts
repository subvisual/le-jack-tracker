import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const theme = event.cookies.get('theme') as 'dark' | 'light';

  event.locals.theme = theme;

  return resolve(event, {
    transformPageChunk({ html }) {
      return html.replace('data-theme=""', `data-theme="${theme}"`);
    }
  });
};
