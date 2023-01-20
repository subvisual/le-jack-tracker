import { page } from '$app/stores';
import { derived, get, writable } from 'svelte/store';

export type Theme = 'light' | 'dark';

const userSetTheme = writable<Theme>();

const theme = derived([userSetTheme, page], ([userSetTheme, page]) => {
  return userSetTheme || page.data.theme;
});

export function toggleTheme() {
  userSetTheme.update(() => (get(theme) === 'dark' ? 'light' : 'dark'));
}

export default theme;
