<script setup lang="ts">
import Nav from '@/components/Nav.vue';
import ArticleCard from '@/components/ArticleCard.vue';

import { useArticlesStore } from '@/composables/useArticlesStore';
import { computed, ref } from 'vue';
import { isOdd } from '@/utils/math.ts';
import Search from '@/components/Search.vue';
import TestModal from '@/components/TestModal.vue';

const { articles } = useArticlesStore();

function chunkPairs<T>(arr: T[]) {
	const result: T[][] = [];
	if(isOdd(arr.length)) result.push([arr[0]]);
	for(let i = result.length; i < arr.length; i += 2)
		result.push(arr.slice(i, i + 2));
	return result;
}

const pairArts = computed(() => chunkPairs(articles.value));

const openSearch = ref(false);
</script>

<template>
	<div id="home">
		<Nav class="full-horizon" @search="openSearch = true" />
		<TestModal />
		<!-- <Search v-if="openSearch" /> -->

		<!-- Blog 介绍区（参考 Cloudflare 博客 Hero） -->
		<div class="full-horizon dashed-btm">
			<section class="blog-intro dashed-section">
				<h1 class="blog-title">我的博客</h1>
				<p class="blog-subtitle">
					技术深度解析、产品更新，以及来自助力构建更美好互联网的团队的洞察。
				</p>
			</section>
		</div>

		<main class="articles-list">
			<div class="dashed-btm" v-for="i in Math.ceil(articles.length / 2)" :key="i">
				<div class="line">
					<ArticleCard
						v-for="art in pairArts[i - 1]"
						:article="art"
						:key="art.id"
						:class="{ 'whole-line': i == 1 && isOdd(articles.length) }"
					/>
				</div>
			</div>
		</main>

		<div class="full-horizon dashed-btm">
			<aside class="sidebar dashed-section" aria-label="侧边栏">
				<section>
					<h2>关于我</h2>
					<p>前端开发者，喜欢写博客。</p>
				</section>
			</aside>
		</div>

		<footer class="site-footer">
			<p><small>&copy; 2026 xzl</small></p>
		</footer>
	</div>
</template>

<style>
:root {
	--spacing-page: 800px;
}

.dashed-btm {
	background-position: 0 100%;
	background-image: url(/src/assets/images/dashed-horizontal-light.svg);
	background-repeat: repeat-x;
}

.full-horizon {
	display: flex;
	justify-content: center;
	width: 100vw;
}
</style>

<style scoped lang="less">
#home {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;
	overflow-x: hidden;
}

/* ===== 两侧竖向虚线（从 header 底部延伸到页面底部） ===== */
#home::before,
#home::after {
	content: "";
	position: absolute;
	top: 60px;
	bottom: 0;
	width: 1px;
	background-image: url(../assets/images/dashed-vertical-light.svg);
	background-repeat: repeat-y;
	z-index: 0;
	pointer-events: none;
}
#home::before {
	left: calc(50% - var(--spacing-page) / 2);
}
#home::after {
	right: calc(50% - var(--spacing-page) / 2);
}


/* ===== Blog 介绍区（Hero） ===== */
.blog-intro {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 20px;

	width: 100%;
	max-width: var(--spacing-page);
	padding: 30px;
	text-align: left;
}

.blog-intro::before,
.blog-intro::after {
	content: "";
    position: absolute;
    bottom: 0;

	width: 12px;
	height: 12px;

	background-image: url(/src/assets/images/connector--light.svg);
	background-repeat: no-repeat;
    background-size: contain;
	z-index: 1;
}
.blog-intro::before {
	left: 0;
    translate: -50% 50%;
}
.blog-intro::after {
	right: 0;
    translate: 50% 50%;
}

.blog-title {
	font-size: 2.5rem;
	font-weight: 700;
	color: var(--text-h);
	line-height: 1.2;
}

.blog-subtitle {
	font-size: 1.1rem;
	color: var(--text);
	line-height: 1.6;
}

/* ===== 文章列表（两列网格） ===== */
.articles-list {
	// position: relative;
	
	width: 100vw;

	> .dashed-btm {
		display: flex;
		justify-content: center;
		height: 382px;
	}

	.line {
		display: flex;
		flex-direction: row;
		justify-content: center;

		height: 100%;
		width: var(--spacing-page);

		article {
			flex: 1;
			min-width: 0;

			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: 10px;

			padding: 30px;
		}

		article:not(.whole-line):first-child {
			background-position: 100% 0;
			background-image: url(/src/assets/images/dashed-vertical-light.svg);
			background-repeat: repeat-y;
		}
	}
}

/* ===== 侧边栏（仅底部横虚线，无连接方框） ===== */
.sidebar {
	width: 100%;
	max-width: var(--spacing-page);
	padding: 40px 20px;
}
.sidebar.dashed-section::after {
	display: none;
}

/* ===== Footer ===== */
.site-footer {
	width: 100%;
	max-width: var(--spacing-page);
	padding: 40px 20px;
	text-align: center;
	color: var(--text);
}

/* ===== 手机端适配 ===== */
@media (max-width: var(--spacing-page)) {
	#home::before {
		left: 20px;
	}
	#home::after {
		right: 20px;
	}
	.articles-list {
		grid-template-columns: 1fr;
		background-image: none;
	}
	.article-card::after {
		left: -20px;
		right: -20px;
	}
}
</style>
