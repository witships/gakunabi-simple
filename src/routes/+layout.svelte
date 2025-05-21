<script lang="ts">
	import '../app.css';
	import 'iconify-icon';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	const isAuthenticated = writable(false);
	const passwordAttempt = writable('');
	let showLogin = true;

	// このパスワードはJS内に埋め込まれるため安全ではありません
	const correctPassword = 'hogehoge';

	function checkPassword() {
		if ($passwordAttempt === correctPassword) {
			// sessionStorage を使ってタブ内でのみ「ログイン状態」を保持
			sessionStorage.setItem('isLoggedIn_simple_ssg_demo', 'true');
			isAuthenticated.set(true);
			showLogin = false;
		} else {
			alert('パスワードが違います');
		}
	}

	onMount(() => {
		if (sessionStorage.getItem('isLoggedIn_simple_ssg_demo') === 'true') {
			isAuthenticated.set(true);
			showLogin = false;
		}
	});

	let { children } = $props();
</script>

<header class="h-12 bg-black/80 p-2 text-white">
	<a href="{base}/" class=" text-2xl font-bold">ろご</a>
</header>

<main class=" overflow-hidden">
	{#if $isAuthenticated}
		{@render children()}
	{:else}
		<div style="padding: 20px;">
			<h1>パスワードを入力してください</h1>
			<input type="password" bind:value={$passwordAttempt} class="border p-2" />
			<button onclick={checkPassword} class="rounded bg-blue-500 p-2 text-white">ログイン</button>
		</div>
	{/if}
</main>
