// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  // interface Error {}
  interface Locals {
    theme: 'dark' | 'light';
  }
  interface PageData {
	theme: 'dark' | 'light';
  }
  // interface Platform {}
}
