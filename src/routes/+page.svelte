<script lang="ts">
  import Month from '$lib/components/Month.svelte';
  import eventsCalendar from '$lib/stores/eventsCalendar';
  import type { PageData } from './$types';

  export let data: PageData;
  eventsCalendar.create(data.events);
</script>

<h1 class="title">{$eventsCalendar.year}</h1>
{#each $eventsCalendar.calendar as month}
  <Month {month} />
{/each}

<style>
  .title {
    margin-bottom: 1em;
  }
</style>
