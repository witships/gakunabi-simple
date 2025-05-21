<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
</script>

<div class="p-8">
	<h1>{page.status}: {page.error ? page.error.message : 'Unknown error'}</h1>
	<p>お探しのページが見つかりませんでした。</p>
	<p>
		<a href="{base}/"><b class=" text-blue-700">トップページ</b></a>からアクセスし直してください。
	</p>
</div>
