<script setup lang="ts">
import BaseModal from '@/components/BaseModal.vue';
import { useArticlesStore } from '@/composables/useArticlesStore';
import Article from '@/core/Article';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const open = defineModel<boolean>('open', { default: false });

const router = useRouter();

const { articles } = useArticlesStore();

const keyword = ref('');
const resultArt = ref<Article[]>([]);

function handleInput() {
	const result = articles.value.filter(art => keyword.value && art.title.includes(keyword.value));
	resultArt.value = result;
	console.log(keyword.value, result);
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
					v-model="keyword"
					@input="handleInput"
				/>
			</header>
			<div class="result">
				<div v-if="resultArt.length == 0">{{ keyword ? '未找到相关文章' : '开始输入以进行搜索' }}</div>
				<article
					v-else
					v-for="article in resultArt"
					@click="router.push({ name: 'article', params: { slug: article.id } })
				">
					<header>
						<span class="title">{{ article.title }}</span>
						<span class="author">{{ article.author }}</span>
						<time :datetime="article.createTime.toLocaleDateString()">
							{{ article.createTime.toChineseDateString() }}
						</time>
					</header>
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
	width: 70vw;
	height: 400px;

	background-color: #fff;
	border-radius: 12px;

	> header {
		position: sticky;
		top: 0;

		display: flex;
		gap: 10px;
		padding: 10px;
		border-bottom: 1px #dddddd solid;

		background-color: #fff;

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
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	width: 100%;

	&::-webkit-scrollbar {
		width: 8px;
	}
	&::-webkit-scrollbar-thumb {
		background: #d4d4d4;
		border-radius: 10px;
	}
	&::-webkit-scrollbar-track {
		background: #d4d4d4;
	}

	> div {
		height: 100%;
	}

	> article {
		margin-bottom: 4px;
		padding: 9px;
		width: 98%;

		border: 1px transparent solid;
		border-radius: 7px;
		transition: background-color, border 100ms linear;
		cursor: pointer;

		&:first-child {
			margin-top: 4px;
		}
		&:hover {
			background-color: var(--accent-bg);
			border: 1px var(--accent-border) solid;
		}

		> header {
			display: flex;
			gap: 5%;
		}

		> p {
			margin: 3px 0;
			font-size: small;
			color: #707070;
		}
	}
}
</style>
