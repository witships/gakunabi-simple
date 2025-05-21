<script lang="ts">
	import { base } from '$app/paths';
	let { data } = $props();
	const courses = data.couseList as any;
	// let courses = [{ id: 'history-jp', name: 'きっと分からない日本史' }];
</script>

<nav class="p-2">
	<ul>
		{#each courses as course}
			<li><a href="{base}/{course.id}" class="hover:bg-black/70 md:text-2xl">{course.name}</a></li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		min-height: calc(100vh - 3rem);
		background-color: #1a462e;
		border: solid #a06944 0.5rem;
		color: white;
		a {
			display: block;
			padding: 0.2rem 0.5rem;
		}
	}
</style>
