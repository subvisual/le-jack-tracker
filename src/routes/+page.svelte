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

<!-- <Header /> -->
<h1 class="calendar-title">{$eventsCalendar.year}</h1>
<section class="wrapper">
  <div class="calendar">
    {#each $eventsCalendar.calendar as month}
      <Month {month} />
    {/each}
  </div>
  <div class="event-display">
    <EventDisplay />
  </div>
</section>

<style>
  .wrapper {
    display: grid;
    grid-template-columns: 800px 200px;
    gap: 2em;
    width: fit-content;
    margin: auto;
  }
  .calendar-title {
    margin-bottom: 1em;
  }
  .calendar {
    grid-column: 1;
  }
  .event-display {
    grid-column: 2;
  }
</style>
