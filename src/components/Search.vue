<script setup lang="ts">
import BaseModal from '@/components/BaseModal.vue';
import { useArticlesStore } from '@/composables/useArticlesStore';
import Article from '@/core/Article';
import { computed, ref, type InputHTMLAttributes } from 'vue';

const open = defineModel<boolean>('open', { default: false });

const { articles } = useArticlesStore();

const resultArt = ref<Article[]>([]);

function handleInput(text: string) {
	console.log(text);

	const result = articles.value.filter(art => art.title.includes(text));
	resultArt.value = result;
	console.log(result);
}
</script>

<template>
	<BaseModal v-model:open="open">
		<div class="card">
			<header>
				<img src="/src/assets/images/search-button.svg" alt="">
				<input
					type="text"
					placeholder="搜索..."
					@input="e => handleInput((e.target as InputHTMLAttributes).value)"
				/>
			</header>
			<div class="result">
				<p v-if="resultArt.length == 0">未找到相关文章</p>
				<article v-else v-for="article in resultArt">
					<span class="title">{{ article.title }}</span>
					<span class="author">{{ article.author }}</span>
					<time :datetime="article.createTime.toLocaleDateString()">
						{{ article.createTime.toChineseDateString() }}
					</time>
					<p>{{ article.summary }}</p>
				</article>
			</div>
		</div>
	</BaseModal>
	<!-- <div id="search">
		
	</div> -->
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
	position: static;

	width: 70vw;
	height: 400px;

	background-color: #fff;
	border-radius: 12px;

	> header {
		display: flex;
		gap: 10px;
		padding: 10px;
		border-bottom: 1px #dddddd solid;

		> img {
			width: 25px;
			height: 25px;
			flex-shrink: 0;
		}
		> input {
			flex: 1;
			border: none;
			outline: none;
		}
	}
}

.result {
	> article {

	}
}
</style>
