<script lang="ts">
  import type { Month } from '$lib/stores/eventsCalendar';
  import url from '$lib/util/url';

  export let month: Month;

  let monthName = month.current.toLocaleDateString('default', {
    month: 'short'
  });
</script>

<h2 class="name">{monthName}</h2>
<section class="month">
  {#each month.days as day}
    <div class="day">
      <p class="day-digit">
        {day.current.toLocaleDateString('default', { day: '2-digit' })}
      </p>
      <div class="events">
        {#each day.events as evt}
          <a href={url(evt.url)} target="_blank" rel="noreferrer">{evt.name}</a>
        {/each}
      </div>
    </div>
  {/each}
</section>

<style>
  .name {
    display: block;
    margin-bottom: 0.5em;
    color: tomato;
  }
  .month {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem 0;
    margin-bottom: 40px;
    border-bottom: 1px solid lightcoral;
  }
  .day {
    min-height: 100px;
    padding-right: 0.5em;
    overflow: hidden;
    white-space: nowrap;
  }
  .day-digit {
    color: grey;
  }
  .events a {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
