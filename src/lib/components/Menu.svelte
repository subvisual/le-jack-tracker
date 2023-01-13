<script lang="ts">
  export let countries: String;
  export let selectedCountry: String;
  $:console.log(countries)
</script>

<!-- svelte-ignore a11y-no-onchange -->
<section class="menu-cont">
	<select class="menu" 
					name="menu" 
					id="menu" 
					bind:value={selectedCountry}>
		<option disabled selected value="">Select a country.</option>
		<option value="all">All countries</option>
		{#each countries as country}
			<option value={country}>{country}</option>
		{/each}
	</select>
</section>


<style>
	.menu-cont {
		width: 40%;
		display: flex;
		margin: 0 10px 0 0;
	}
	
	select {
		margin: 0;
		font-size: 1.18rem;
		border: 1px solid gray;
		border-radius: 5px;
	}
	
	.menu {
		width: 100%
	}
</style>