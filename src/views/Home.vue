<script setup lang="ts">
import Nav from '@/components/Nav.vue';
import ArticleComponent from './Article.vue';

import { useArticlesStore } from '@/composables/useArticlesStore';
import { computed } from 'vue';
import { isEven, isOdd } from '@/utils/math.ts';

const { articles } = useArticlesStore();

function chunkPairs<T>(arr: T[]) {
	const result: T[][] = [];
	const odd = isOdd(arr.length);
	const start = odd ? 1 : 0;

	// 奇数时，第一个元素单独一组
	if (odd)
		result.push([arr[0]]);

	// 剩余元素每两个一组
	for (let i = start; i < arr.length; i += 2)
		result.push(arr.slice(i, i + 2));

	return result;
}

const pairArts = computed(() => chunkPairs(articles.value));
</script>

<template>
	<div id="home">
		<Nav />

		<!-- Blog 介绍区（参考 Cloudflare 博客 Hero） -->
		<section class="blog-intro dashed-section dashed-btm">
			<h1 class="blog-title">我的博客</h1>
			<p class="blog-subtitle">
				技术深度解析、产品更新，以及来自助力构建更美好互联网的团队的洞察。
			</p>
		</section>

		<main class="articles-list">
			<div class="line dashed-btm" v-for="i in Math.ceil(articles.length / 2)" :key="i">
				<ArticleComponent
					v-for="j in pairArts[i - 1].length"
					:article="pairArts[i - 1][j - 1]"
					:key="pairArts[i - 1][j - 1].id"
					:class="{ dashedRightSide: j == 0 && pairArts[i - 1].length != 1 }"
				/>
			</div>
		</main>

		<aside class="sidebar dashed-section dashed-btm" aria-label="侧边栏">
			<section>
				<h2>关于我</h2>
				<p>前端开发者，喜欢写博客。</p>
			</section>
		</aside>

		<footer class="site-footer">
			<p><small>&copy; 2026 xzl</small></p>
		</footer>
	</div>
</template>

<style>
/* ===== 通用：区块底部通栏横虚线（视口宽度） ===== */
/* .dashed-section {
	position: relative;
} */
/* ::before 绘制通栏横虚线，::after 绘制左右连接方框 */
/* .dashed-section::before {
	content: "";
	position: absolute;
	left: calc(50% - 50vw);
	right: calc(50% - 50vw);
	bottom: 0;
	height: 1px;
	background-image: url(../assets/images/dashed-horizontal-light.svg);
	background-repeat: repeat-x;
	background-position: bottom;
	pointer-events: none;
}
.dashed-section::after {
	content: "";
	position: absolute;
	left: 20px;
	right: 20px;
	bottom: -6px;
	height: 12px;
	background-image:
		url(../assets/images/connector--light.svg),
		url(../assets/images/connector--light.svg);
	background-repeat: no-repeat, no-repeat;
	background-position: -6px 0, calc(100% + 6px) 0;
	background-size: 12px 12px, 12px 12px;
	z-index: var(--z-connector);
	pointer-events: none;
} */

.dashed-btm {
	background-position: 0 100%;
	background-image: url(/src/assets/images/dashed-horizontal-light.svg);
	background-repeat: repeat-x;
}

.dashed-right-side {
	background-position: 100% 0;
	background-image: url(/src/assets/images/dashed-vertical-light.svg);
	background-repeat: repeat-y;
}
</style>

<style scoped>
#home {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;
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
	left: calc(50% - 380px);
}
#home::after {
	right: calc(50% - 380px);
}


/* ===== Blog 介绍区（Hero） ===== */
.blog-intro {
	display: flex;
	flex-direction: column;
	gap: 20px;

	width: 100%;
	max-width: 760px;
	padding: 30px;
	text-align: left;
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
	position: relative;
	
	display: flex;
	flex-direction: column;
	
	width: 100%;
	max-width: 760px;

	/* 中间竖向虚线：作为容器背景，居中纵向重复 */
	/* background-image: url(../assets/images/dashed-vertical-light.svg);
	background-position: center top;
	background-repeat: repeat-y; */

	> .line {
		display: flex;
		flex-direction: row;

		> article {
			flex: 1;
			min-width: 0;
			min-height: 300px;

			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: 10px;

			padding: 30px;
		}
	}
}

/* ===== 侧边栏（仅底部横虚线，无连接方框） ===== */
.sidebar {
	width: 100%;
	max-width: 760px;
	padding: 40px 20px;
}
.sidebar.dashed-section::after {
	display: none;
}

/* ===== Footer ===== */
.site-footer {
	width: 100%;
	max-width: 760px;
	padding: 40px 20px;
	text-align: center;
	color: var(--text);
}

/* ===== 手机端适配 ===== */
@media (max-width: 760px) {
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
