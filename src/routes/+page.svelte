<script lang="ts">
  import { calendar } from '$lib/calendar';
  import { eventInDate } from '$lib/parseSheet';
  import { each } from 'svelte/internal';
  import type { PageData } from './$types';

  export let data: PageData;
  const { events } = data;

  const months = calendar();
</script>

<div>
  {#each months as month, i}
    <div class="month">
      {#each month as day, di}
        {@const evts = eventInDate(events, day)}
        <div class="day">
          {day.toDateString()}
          {#each evts as evt}
            {evt.name}
          {/each}
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .month {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 40px;
  }
  .day {
    border: 1px solid #333;
    height: 90px;
  }
</style>
