<script lang="ts">
  import Month from '$lib/components/Month.svelte';
  import eventsCalendar from '$lib/stores/eventsCalendar';
  import type { PageData } from './$types';

  export let data: PageData;
  eventsCalendar.create(data.events);
</script>

<h1 class="title">{$eventsCalendar.year}</h1>
<p class="description">
  If you're a founder looking for pre-seed or seed investment, please reach out
  at
  <a href="mailto:jack.niewold@gmail.com">jack.niewold@gmail.com</a>
</p>
<p class="description">
  If you see an error in the sheet, an event missing from the calendar, or have
  an idea to improve the calendar, ping him on Twitter:
  <a href="https://twitter.com/JackNiewold">@JackNiewold</a>
</p>
<p class="description">
  If you'd like to support the continued upkeep of <a
    href="https://docs.google.com/spreadsheets/d/1UJLdKW5IymgPAmKakMvCyd35dtc8IOZ04bc0fAvp8kI/edit#gid=1160078856"
    >this calendar</a
  >, please subscribe to
  <a href="CryptoPragmatist.com/sign-up/">his newsletter</a>
</p>
<p>
  If you need help with building products in crypto let us know at <a
    href="https://twitter.com/wearefiniam">@wearefiniam</a
  >
  or <a href="https://finiam.com/contact">finiam.com</a>! We do product, design,
  frontend, backend, DevOps, and smart contract development.
</p>
<p class="description">
  Inspired by <a href="https://casey.cs.gt/">Casey Neistat Vlog Archive</a> from
  <a href="https://github.com/RodrigoPolo/">Rodrigo Polo</a>
</p>

{#each $eventsCalendar.calendar as month}
  <Month {month} />
{/each}

<style>
  .title {
    margin-bottom: 1em;
  }

  .description {
    margin-bottom: 1em;
  }
</style>
