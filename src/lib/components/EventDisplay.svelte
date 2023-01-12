<script lang="ts">
  import eventsCalendar from '$lib/stores/eventsCalendar';
  import twitterHandle from '$lib/util/twitterHandle';
  import url from '$lib/util/url';

  $: event = $eventsCalendar.events.find(
    (evt) => evt.id === $eventsCalendar.active
  );
  $: online = [event?.region, event?.city, event?.country].every(
    (item) => item === 'Online'
  );
  const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString('default', {
      month: 'short',
      day: 'numeric'
    });
</script>

<div class="root">
  {#if event}
    <h3 class="name">{event.name}</h3>
    <div>
      <p class="region">{event.region}</p>
      {#if !online}
        <p>{event.city}, {event.country}</p>
      {/if}

      {#if event.duration === 1}
        <p>{formatDate(event.startDate)}</p>
      {:else}
        <p>
          {formatDate(event.startDate)} - {formatDate(event.endDate)}
        </p>
      {/if}
    </div>
    <div>
      <a
        href={url(event.twitter)}
        target="_blank"
        rel="noreferrer"
        class="link"
      >
        @{twitterHandle(event.twitter)}
      </a>
      <a href={url(event.url)} target="_blank" rel="noreferrer" class="link">
        Website
      </a>
    </div>
  {/if}
</div>

<style>
  .root {
    display: none;
    position: sticky;
    top: 30vh;
    display: grid;
    gap: 0.75rem;
    height: fit-content;
  }
  .name {
    font-weight: 700;
    font-size: 1.25rem;
  }
  .region {
    color: var(--color-grey);
  }
  .link {
    display: block;
  }
  @media screen and (min-width: 40em) {
    .root {
      display: grid;
    }
  }
</style>
