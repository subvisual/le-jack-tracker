<script lang="ts">
  import EventDisplay from '$lib/components/EventDisplay.svelte';
  import Header from '$lib/components/Header.svelte';
  import Month from '$lib/components/Month.svelte';
  import Menu from '$lib/components/Menu.svelte';
  import eventsCalendar from '$lib/stores/eventsCalendar';
  import type { PageData } from './$types';
  import { onMount } from 'svelte';

  export let data: PageData;

  let countries: any = []; // menu built from bookData
  let selectedCountry = ''; //  menu selection

  const getcountries = () => {
    for (let event of data.events) {
      if (!countries.includes(event.country)) {
        countries = [...countries, event.country];
      }
    }
    countries = countries.sort();
  };

  onMount(() => getcountries());

  // Query results
  let filteredEvents: any = [];

  // For Select Menu
  $: if (selectedCountry) getEventsByCountry();
  $: console.log(filteredEvents, selectedCountry);

  const getEventsByCountry = () => {
    if (selectedCountry === 'all') {
      return (filteredEvents = []);
    }
    return (filteredEvents = data.events.filter(
      (event) => event.country === selectedCountry
    ));
  };

  eventsCalendar.create(data.events);
</script>

<svelte:head>
  <title>2023 Crypto Conference Tracker</title>
</svelte:head>

<Header />
<main class="calendar">
  <Menu
    {countries}
    bind:selectedCountry
    on:change={() => eventsCalendar.create(filteredEvents)}
  />
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
