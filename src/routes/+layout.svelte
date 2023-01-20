<script>
  import '$lib/css/ress.css';
  import '$lib/css/app.css';
</script>

<div class="root">
  <slot />
</div>

<style>
  .root {
    background-color: var(--color-bg);
    color: var(--color-primary);
    transition: background-color 0.2s ease;
  }
  @media screen and (min-width: 40em) {
    .root {
      grid-template-columns: 1fr 3fr 1fr;
    }
  }
</style>
