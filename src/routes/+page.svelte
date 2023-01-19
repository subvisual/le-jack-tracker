<script lang="ts">
  import CountryFilter from '$lib/components/CountryFilter.svelte';
  import EventDisplay from '$lib/components/EventDisplay.svelte';
  import Header from '$lib/components/Header.svelte';
  import Month from '$lib/components/Month.svelte';
  import eventsCalendar from '$lib/stores/eventsCalendar';
  import type { PageData } from './$types';

  export let data: PageData;

  eventsCalendar.create(data.events);
</script>

<svelte:head>
  <title>2023 Crypto Conference Tracker</title>
</svelte:head>

<div class="root">
  <Header />
  <main class="calendar">
    <h1 class="calendar-title">{$eventsCalendar.year}</h1>
    {#each $eventsCalendar.calendar as month}
      <Month {month} />
    {/each}
  </main>
  <div class="sidebar">
    <CountryFilter />
    <EventDisplay />
  </div>
</div>

<style>
  .root {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    max-width: 90%;
    padding-top: 2em;
    margin: auto;
  }
  @media screen and (min-width: 40em) {
    .root {
      grid-template-columns: 1fr 3fr 1fr;
    }
  }
  .calendar-title {
    margin-bottom: 1em;
    line-height: 1;
  }
  .sidebar {
    height: fit-content;
    position: sticky;
    top: 5.75rem;
  }
</style>
