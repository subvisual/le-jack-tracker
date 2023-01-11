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
</script>

<div class="root">
  {#if event}
    <h3 class="name">{event.name}</h3>
    <div>
      <p class="region">{event.region}</p>
      {#if !online}
        <p>{event.city}, {event.country}</p>
      {/if}
    </div>
    <div>
      <a href={url(event.twitter)} target="_blank" rel="noreferrer">
        @{twitterHandle(event.twitter)}
      </a>
      <a href={url(event.url)} target="_blank" rel="noreferrer">Website</a>
    </div>
  {/if}
</div>

<style>
  .root {
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
    color: grey;
  }
  .links {
    margin-top: 1rem;
  }
</style>
