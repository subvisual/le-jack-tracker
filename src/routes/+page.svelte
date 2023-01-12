<script lang="ts">
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

<Header />
<main class="calendar">
  <h1 class="calendar-title">{$eventsCalendar.year}</h1>
  {#each $eventsCalendar.calendar as month}
    <Month {month} />
  {/each}
</main>
<div class="event-display">
  <EventDisplay />
</div>

<style>
  .calendar {
    background: var(--color-offwhite);
  }
  .calendar-title {
    margin-bottom: 1em;
    line-height: 1;
    color: var(--color-offblack);
  }
</style>
