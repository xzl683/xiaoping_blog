<script setup lang="ts">
import { useArticlesStore } from '@/composables/useArticlesStore';
import type { InputHTMLAttributes } from 'vue';

const { articles } = useArticlesStore();

function handleInput(text: string) {
	console.log(text);

	const result = articles.value.filter(art => art.title.includes(text));
	console.log(result);
}
</script>

<template>
	<div id="search">
		<div class="card">
			<header>
				<img src="/src/assets/images/search-button.svg" alt="">
				<input
					type="text"
					placeholder="搜索..."
					@input="e => handleInput((e.target as InputHTMLAttributes).value)"
				/>
			</header>
		</div>
	</div>
</template>

<style scoped lang="less">
#search {
	position: absolute;
	inset: 0;

	display: flex;
	align-items: center;
	justify-content: center;

	width: 100vw;
	height: 100vh;
	
	backdrop-filter: blur(4px);
	background-color: rgba(0, 0, 0, 0.5);

	z-index: 10;
}

.card {
	width: 70%;
	height: 400px;

	background-color: #fff;
	border-radius: 12px;

	> header {
		display: flex;
		gap: 10px;
		padding: 10px;
		border-bottom: 1px #dddddd solid;

		> img {
			width: 30px;
			height: 30px;
			flex-shrink: 0;
		}
		> input {
			flex: 1;
			border: none;
			outline: none;
		}
	}
}
</style>
