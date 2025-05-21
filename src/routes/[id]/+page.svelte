<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let { data } = $props();
	let courseId = $state(data.courseId);
	const { courseName, chapterId, chapterName, page } = data.scenario as {
		courseName: string;
		chapterId: string;
		chapterName: string;
		page: any[];
	};

	const pageLength = $derived(page.length);
	let pageIndex: number = $state(0);
	let subtitleLength: number = $derived(page[pageIndex].subtitle.length);
	let subtitleIndex: number = $state(0);
	let subtitle: string = $derived(page[pageIndex].subtitle[subtitleIndex].text);
	let stroke: string = $derived(page[pageIndex].subtitle[subtitleIndex].color || 'black');
	let slideSrc: string = $derived(
		`/${courseId}/img/${page[pageIndex].subtitle[subtitleIndex].slide}`
	);
	let actorSrc = $derived(`/actor/${page[pageIndex].subtitle[subtitleIndex].actorImg}`);
	let setVoice: HTMLAudioElement | null = null;
	let voiceData: string = $derived(page[pageIndex].subtitle[subtitleIndex].voice);
	let voiceSrc: string = $derived(`/${courseId}/voice/${voiceData}`);
	let isAnime: boolean = $derived(page[pageIndex].subtitle[subtitleIndex].anime);

	let isTalking: boolean = $state(false);
	let isJumped: boolean = $state(true);
	let isEnd: boolean = $state(false);
	let listener: string = $derived(`${page[pageIndex].subtitle[subtitleIndex].listener}`);
	let listenerSrc: string = $derived(`/actor/${listener}`);

	// 進捗
	function progressChange() {
		voiceStop();
		isJumped = true;
	}

	// メニュー
	let isVoice: boolean = $state(true);
	let isAuto: boolean = $state(true);
	let speed = $state(1);
	let volume: number = $state(1);

	// 初期化
	onMount(() => {
		setVoice = new Audio('/sounds/yo.mp3');
		setVoice.onerror = () => {
			console.error(`音声ファイル "${voiceSrc}" の読み込みに失敗しました。`);
		};
		setVoice.load();
		setVoice.playbackRate = Number(speed);

		// ページから離れるときに、音声を破棄
		return () => {
			if (setVoice) {
				setVoice.pause();
				setVoice.removeAttribute('src');
				setVoice.load();
				setVoice = null;
			}
		};
	});

	// 進行
	function next() {
		// ページジャンプ直後は、進む前に音声再生
		if (isJumped && voiceData && isVoice) {
			voicePlay();
		}
		// 通常時
		else {
			// 最後
			if (pageIndex + 1 == pageLength && subtitleIndex + 1 == subtitleLength) {
				if (!isEnd) {
					// fireWorks();
					isEnd = true;
				}
				return;
			}
			// ページの最後
			if (subtitleIndex + 1 == subtitleLength) {
				pageIndex++;
				subtitleIndex = 0;
			}
			// 通常
			else {
				subtitleIndex++;
			}

			// 音声
			if (isVoice) {
				voicePlay();
			}
		}
		isJumped = false;
	}

	// もくじのページ移動
	function pageJump(index: number) {
		pageIndex = index;
		subtitleIndex = 0;
		voiceStop();
		isJumped = true;
	}

	// 音声
	async function voicePlay() {
		if (setVoice) {
			setVoice.pause();
		}
		if (voiceData) {
			setVoice = await new Audio(voiceSrc);
			setVoice.playbackRate = Number(speed);
			setVoice.volume = Number(volume);
			setVoice.play();
			isTalking = true;
			isJumped = false;
			// オート
			setVoice.addEventListener('ended', () => {
				isTalking = false;
				if (isAuto) {
					next();
				}
			});
		}
	}
	function voiceStop() {
		if (setVoice) {
			setVoice.pause();
			isTalking = false;
		}
	}
	function speedChange() {
		if (setVoice) {
			setVoice.pause();
			setVoice.playbackRate = Number(speed);
			setVoice.volume = Number(volume);
			setVoice.play();
		}
	}
</script>

<div class="layout">
	<!-- 黒板 -->
	<div class="borad">
		<!-- もくじ -->
		<nav>
			<ul>
				{#each page as item, index (index)}
					<li>
						<a
							href={null}
							class="hover:bg-black/70 md:text-2xl {index == pageIndex ? 'bg-black/70' : ''}"
							onclick={() => pageJump(index)}>{item.title}</a
						>
					</li>
				{/each}
			</ul>
		</nav>

		<!-- スライド -->
		<a
			href={null}
			class="slide"
			aria-label="スライド"
			style="background-image: url({slideSrc})"
			onclick={next}
		></a>
	</div>

	<a href={null} class="sub-wrap" onclick={next}>
		<!-- アクター -->
		<div
			class="actor {isAnime ? 'anime ' : ''} {isTalking && !listener ? 'talk' : ''}"
			aria-label="スライド"
			style="background-image: url({actorSrc})"
		></div>

		<!-- 聴き手 -->
		{#if listener}
			<div
				class="listener"
				style="background-image: url({listenerSrc})"
				transition:fly={{ x: 100, duration: 300 }}
			></div>
		{/if}

		<!-- 字幕 -->
		<div class="sub">
			<p class="md:text-2xl lg:text-3xl" style="-webkit-text-stroke-color: {stroke};">{subtitle}</p>
		</div>
	</a>

	<!-- 進捗 -->
	<input
		type="range"
		min="0"
		max={subtitleLength - 1}
		bind:value={subtitleIndex}
		onchange={progressChange}
		class="progress"
	/>

	<!-- メニュー -->
	<div class="menu grid grid-cols-5 gap-0.5">
		<button aria-label="voice" onclick={() => (isVoice = !isVoice)}
			><iconify-icon icon="mdi:volume" class={isVoice ? '' : 'text-gray-600'}
			></iconify-icon></button
		>
		<button aria-label="auto-voice" onclick={() => (isAuto = !isAuto)}
			><iconify-icon icon="mdi:loop" class={isAuto ? '' : 'text-gray-600'}></iconify-icon></button
		>
		<button aria-label="play-voice" onclick={voicePlay}
			><iconify-icon icon="mdi:play"></iconify-icon></button
		>
		<button aria-label="stop-voice" onclick={voiceStop}
			><iconify-icon icon="mdi:stop"></iconify-icon></button
		>
		<!-- 再生速度 -->
		<div class="speedometer flex items-center justify-center">
			<iconify-icon icon="mdi:speedometer"></iconify-icon>
			<input
				type="range"
				min="0.5"
				max="2"
				step="0.1"
				bind:value={speed}
				class="w-[60%] accent-gray-300"
				onchange={speedChange}
			/>
		</div>
	</div>
</div>

<style>
	.layout {
		height: calc(100vh - 3rem);
		display: grid;
		grid-template-rows: 4fr 1fr auto;
		overflow: hidden;

		.borad {
			display: flex;
			background-color: #1a462e;
			border: solid #a06944 0.5rem;
			nav {
				white-space: nowrap;
				padding: 0.5rem;
				color: white;
				a {
					display: block;
				}
			}
			.slide {
				width: 100%;
				min-height: 50vh;
				background-size: contain;
				background-repeat: no-repeat;
				background-position: center;
			}
		}

		.sub-wrap {
			display: grid;
			grid-template-columns: auto 1fr;
			background-color: #000000cc;
			position: relative;
			.actor {
				/* max-width: 100%; */
				min-width: min(25vh, 25vw);
				min-height: min(25vh, 25vw);
				background-size: contain;
				background-repeat: no-repeat;
				position: absolute;
				bottom: 0;
				&.anime {
					background-position-y: 0%;
					background-size: auto calc(100% * 4);

					&.talk {
						animation: talk 1s steps(1, end) infinite;
					}
				}
			}
			.listener {
				min-width: min(25vh, 25vw);
				min-height: min(25vh, 25vw);
				background-size: contain;
				background-repeat: no-repeat;
				position: absolute;
				bottom: 0;
				right: 0;
			}

			.sub {
				color: #ffffff;
				/* height: 5rem; */
				display: flex;
				p {
					margin: auto 1rem auto min(26vh, 26vw);
					white-space: break-spaces;
					-webkit-text-stroke-width: 2px;
					paint-order: stroke;
				}
			}
		}

		.progress {
			z-index: 10;
			height: 0.5rem;
			accent-color: whitesmoke;
			opacity: 0.5;
		}

		.menu {
			background-color: #000000cc;
			button,
			.speedometer {
				background-color: darkgray;
				display: flex;
				justify-content: center;
				padding: 0.3rem;
				iconify-icon {
					/* margin: auto; */
					font-size: xx-large;
				}
			}
		}
	}

	/* 口パクアニメーション */
	@keyframes talk {
		/* コマ1: 通常 (長め) */
		0% {
			background-position-y: calc(100% * 2 / 3);
		}

		20% {
			background-position-y: calc(100% * 1 / 3);
		}

		40% {
			background-position-y: calc(100% * 2 / 3);
		}

		60% {
			background-position-y: calc(100% * 1 / 3);
		}

		80% {
			background-position-y: 0%;
		}
	}
</style>
