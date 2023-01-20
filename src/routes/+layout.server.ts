import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, depends }) => {
  const theme = locals.theme;

  depends('app:theme');

  return {
    theme
  };
};
