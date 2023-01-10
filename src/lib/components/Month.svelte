<script lang="ts">
  import type { Month } from '$lib/stores/eventsCalendar';

  export let month: Month;

  let monthName = month.current.toLocaleDateString('default', {
    month: 'short'
  });
</script>

<h2 class="name">{monthName}</h2>
<div class="month">
  {#each month.days as day}
    <div class="day">
      {day.current.toLocaleDateString('default', { day: '2-digit' })}
      {#each day.events as evt}
        {evt.name}
      {/each}
    </div>
  {/each}
</div>

<style>
  .name {
    display: block;
    margin-bottom: 0.5em;
  }
  .month {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 40px;
  }
  .day {
    height: 90px;
  }
</style>
