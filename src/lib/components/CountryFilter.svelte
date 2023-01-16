<script lang="ts">
  import eventsCalendar, { type EventType } from '$lib/stores/eventsCalendar';

  $: relevant = $eventsCalendar.events.filter(
    (item) => item.country === $eventsCalendar.filter
  );

  $: relevantByMonth = relevant.reduce<Record<string, EventType[]>>(
    (acc, item) => {
      const monthName = new Date(item.startDate).toLocaleDateString('default', {
        month: 'short'
      });

      return {
        ...acc,
        [monthName]: [...(acc?.[monthName] || []), item]
      };
    },
    {}
  );
</script>

<div class="root">
  <select class="select" bind:value={$eventsCalendar.filter}>
    <option selected value="all">Any country &darr;</option>
    {#each $eventsCalendar.countries as c}
      <option value={c}>{c}</option>
    {/each}
  </select>

  <div class="res-wrapper">
    {#if $eventsCalendar.filter !== 'all'}
      <p class="res-title">{relevant.length} events found</p>

      {#each Object.entries(relevantByMonth) as [month, evts], key}
        <div>
          <a class="res-month" href="#{month}">{month}</a>
          <ul>
            {#each evts as evt}
              <li class="event-name">{evt.name}</li>
            {/each}
          </ul>
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  .root {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #ddd;
  }
  .select {
    margin-bottom: 1rem;
    padding: 4px 8px;
    border: 1px solid var(--color-offblack);
    border-radius: 4px;
  }
  .res-wrapper {
    max-height: 40vh;
    overflow-y: scroll;
  }
  .res-title {
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  .res-month {
    display: block;
    margin-bottom: 0.5rem;
  }
  .event-name {
    margin-bottom: 0.5rem;
    list-style: none;
    color: var(--color-grey);
  }
</style>
