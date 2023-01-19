<script>
  import '$lib/css/ress.css';
  import '$lib/css/app.css';
</script>

<div class="root dark">
  <slot />
</div>

<style>
  .root {
    background: var(--color-bg);
    color: var(--color-primary);
  }
  @media screen and (min-width: 40em) {
    .root {
      grid-template-columns: 1fr 3fr 1fr;
    }
  }
</style>
