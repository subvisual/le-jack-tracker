<script lang="ts">
  import type { Month, EventInDay } from '$lib/stores/eventsCalendar';
  import eventsCalendar from '$lib/stores/eventsCalendar';
  import url from '$lib/util/url';

  export let month: Month;
  const height = 1.5;

  let monthName = month.current.toLocaleDateString('default', {
    month: 'short'
  });

  const dayBlockHeight = (events: EventInDay[]) => {
    const highestLine = events.sort((a, b) => (a.line > b.line ? -1 : 1))?.[0]
      ?.line;

    if (highestLine < 2) {
      return '100px';
    }

    return `${(highestLine + 2) * height + 1}rem`;
  };
</script>

<div class="root" id={monthName}>
  <a href="#{monthName}" class="month-name">
    <h2 class="month-name-text">{monthName}</h2>
  </a>

  <section class="month" style="--track-height: {height}rem">
    {#each month.days as day, monthIdx}
      {@const isStartOfMonth = day.current.getDate() === 1}
      {@const isStartOfWeek = day.current.getDay() === 0}
      {@const offset = isStartOfMonth ? day.current.getDay() + 1 : '0'}

      <div
        class="day"
        style="min-height: {dayBlockHeight(day.events)}; --offset: {offset}"
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
            {@const extend =
              month.days[monthIdx + 1] &&
              evt.duration >= 3 &&
              evt.duration - evt.progress >= 2 &&
              day.current.getDay() < 4}
            {@const outOfFilter =
              evt.country !== $eventsCalendar.filter &&
              $eventsCalendar.filter !== 'all'}
            <a
              href={url(evt.url)}
              target="_blank"
              rel="noreferrer"
              class="event-line"
              class:extend
              class:last-day={evt.isLastDay}
              class:first-day={evt.isFirstDay}
              class:active-event={$eventsCalendar.active === evt.id}
              class:irrelevant={outOfFilter}
              style:top="{(evt.line + 1.25) * height}rem"
              style:--bg-primary="var(--line-primary-{evt.color})"
              style:--bg-secondary="var(--line-secondary-{evt.color})"
              on:mouseenter={() => {
                $eventsCalendar.active = evt.id;
              }}
            >
              <div class="event-name" class:extend>
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
</div>

<style>
  .root {
    display: flex;
    gap: 1rem;
  }
  .month-name {
    text-decoration: none;
  }
  .month-name-text {
    position: sticky;
    top: 1rem;
    height: fit-content;
    display: block;
    color: var(--color-primary);
    line-height: 1;
  }
  .month {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem 0;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
  }
  .day {
    position: relative;
    min-height: 100px;
    border-bottom: 1px solid #ddd;
  }
  @media screen and (min-width: 40em) {
    .month {
      grid-template-columns: repeat(7, 1fr);
    }
    .day {
      grid-column-start: var(--offset);
    }
  }
  .date-line {
    display: flex;
    align-items: baseline;
    margin-bottom: 1rem;
  }
  .day-digit {
    margin-right: 0.5rem;
  }
  .week {
    font-size: 0.8rem;
    color: var(--color-secondary);
  }
  .event-line {
    position: absolute;
    left: 0;
    display: block;
    width: 100%;
    height: var(--track-height);
    padding-left: 0.25rem;
    overflow: hidden;
    white-space: nowrap;
    text-decoration: none;
    background-color: var(--bg-primary);
    transition: background-color 0.3s ease;
    transition: opacity 0.3s ease;
  }
  .event-name {
    position: relative;
    z-index: 1;
    display: block;
    color: var(--color-event-name);
    text-decoration: none;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media screen and (min-width: 40em) {
    .event-line.extend {
      overflow: visible;
    }
    .event-name.extend {
      text-overflow: none;
      overflow: visible;
    }
  }
  .active-event {
    background: var(--bg-secondary);
  }
  .last-day {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }
  .first-day {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
  .irrelevant {
    opacity: 0.3;
  }
</style>
