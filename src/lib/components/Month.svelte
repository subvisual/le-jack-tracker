<script lang="ts">
  import type { Month, EventInDay } from '$lib/stores/eventsCalendar';
  import eventsCalendar from '$lib/stores/eventsCalendar';
  import url from '$lib/util/url';

  export let month: Month;
  const height = 2.3;

  let monthName = month.current.toLocaleDateString('default', {
    month: 'short'
  });

  const isActive = (id: number) => $eventsCalendar.active === id;
  const highestTrackValue = (events: EventInDay[]) =>
    events.sort((a, b) => (a.line > b.line ? -1 : 1))?.[0]?.line || 0;
</script>

<h2 class="name">{monthName}</h2>

<section class="month" style="--track-height: {height}rem">
  {#each month.days as day}
    {@const isStartOfMonth = day.current.getDate() === 1}
    {@const isStartOfWeek = (day.current.getDate() - 1) % 7 === 0}

    <div
      class="day"
      class:clip={day.events.length > 1}
      style="min-height: {(highestTrackValue(day.events) + 2) * height}rem"
    >
      <div class="date-line">
        <p class="day-digit">
          {day.current.toLocaleDateString('default', { day: '2-digit' })}
        </p>
        <p class="week">
          {day.current.toLocaleDateString('default', { weekday: 'short' })}
        </p>
      </div>
      <div class="events">
        {#each day.events as evt}
          <a
            href={url(evt.url)}
            target="_blank"
            rel="noreferrer"
            class="event-line"
            class:lastDay={evt.isLastDay}
            class:firstDay={evt.isFirstDay}
            class:activeEvent={isActive(evt.id)}
            style="background: {evt.color}; top: {(evt.line + 1) * height}rem"
            on:mouseenter={() => {
              $eventsCalendar.active = evt.id;
            }}
          >
            <div
              class="event-name"
              class:floatingName={isStartOfWeek && !evt.isLastDay}
            >
              {#if evt.isFirstDay || isStartOfMonth || isStartOfWeek}
                {evt.name}
              {:else}
                &nbsp;
              {/if}
            </div>
          </a>
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
    grid-template-columns: repeat(7, 1fr);
    gap: 2rem 0;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid lightcoral;
  }
  .day {
    position: relative;
    height: 100px;
  }
  .date-line {
    display: flex;
    align-items: baseline;
    margin-bottom: 1rem;
  }
  .day-digit {
    color: grey;
    margin-right: 0.5rem;
  }
  .week {
    font-size: 0.8rem;
    color: grey;
  }
  .event-line {
    position: absolute;
    left: 0;
    width: 100%;
    display: block;
    height: var(--track-height);
    padding: 0.25rem 0.5rem;
    overflow: hidden;
    white-space: nowrap;
    text-decoration: none;
  }
  .event-name {
    display: block;
    color: #242424;
    text-decoration: none;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .activeEvent {
    filter: saturate(2);
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
  }
  .activeEvent.lastDay {
    border-right: 1px solid #000;
  }
  .activeEvent.firstDay {
    border-left: 1px solid #000;
  }
  .lastDay {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }
  .firstDay {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
  .clip .event-name {
    line-height: 1.4;
  }
</style>
