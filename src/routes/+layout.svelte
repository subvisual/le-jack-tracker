<script>
  import '$lib/css/ress.css';
  import '$lib/css/app.css';
</script>

<div class="root">
  <slot />
</div>

<style>
  .root {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    max-width: 90%;
    margin: 2em auto;
  }
  @media screen and (min-width: 40em) {
    .root {
      grid-template-columns: 1fr 3fr 1fr;
    }
  }
</style>
