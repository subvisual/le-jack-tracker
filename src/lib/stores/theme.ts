import { invalidate } from '$app/navigation';
import { page } from '$app/stores';
import { derived, get, writable } from 'svelte/store';

const userSetTheme = writable<'light' | 'dark'>();

const theme = derived([userSetTheme, page], ([userSetTheme, page]) => {
  return userSetTheme || page.data.theme;
});

export function toggleTheme() {
  userSetTheme.update(() => (get(theme) === 'dark' ? 'light' : 'dark'));
  invalidate('app:theme');
}

export default theme;
