<script>
  import '$lib/css/ress.css';
  import '$lib/css/app.css';
</script>

<div class="wrapper">
  <slot />
</div>

<style>
  .wrapper {
    width: 800px;
    max-width: 90%;
    margin: 2em auto;
  }
</style>
