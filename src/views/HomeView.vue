<script setup lang="ts">
import ArticleCard from '@/components/ArticleCard.vue';
import Footer from '@/components/Footer.vue';

import { useArticleStore } from '@/stores/articles';
import { computed } from 'vue';
import { isOdd } from '@/utils/math.ts';
import type Article from '@/core/Article';

const { articles } = useArticleStore();

interface HomeRow {
	/** 行 key：取该行首篇文章 id，增删文章时能复用正确的行 */
	key: string;
	items: Article[];
	/** 文章总数为奇数时，首行只放一篇并占满整行 */
	wholeLine: boolean;
}

const rows = computed<HomeRow[]>(() => {
	const list = articles.value;
	const result: HomeRow[] = [];
	let start = 0;

	if (isOdd(list.length)) {
		result.push({ key: list[0].id, items: [list[0]], wholeLine: true });
		start = 1;
	}

	for (let i = start; i < list.length; i += 2) {
		const items = list.slice(i, i + 2);
		result.push({ key: items[0].id, items, wholeLine: false });
	}

	return result;
});
</script>

<template>
	<div id="home" class="page-frame">
		<!-- Blog 介绍区（参考 Cloudflare 博客 Hero） -->
		<div class="full-horizon dashed-btm">
			<section class="blog-intro content-section">
				<h1 class="blog-title">我的博客</h1>
				<p class="blog-subtitle">
					技术深度解析、产品更新，以及来自助力构建更美好互联网的团队的洞察。
				</p>
			</section>
		</div>

		<main class="articles-list">
			<div v-for="(row, i) in rows" :key="row.key" class="dashed-btm">
				<div class="line" :class="{ 'whole-line': row.wholeLine, 'first': i === 0 }">
					<ArticleCard
						v-for="art in row.items"
						:key="art.id"
						:article="art"
					/>
				</div>
			</div>
		</main>

		<div class="full-horizon dashed-btm">
			<aside class="sidebar content-section" aria-label="侧边栏">
				<section>
					<h2>关于我</h2>
					<p>前端开发者，喜欢写博客。</p>
				</section>
			</aside>
		</div>

		<Footer />
	</div>
</template>

<style scoped lang="less">
@content-max-width: 800px;

#home {
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;
}

/* ===== Blog 介绍区（Hero） ===== */
.blog-intro {
	display: flex;
	flex-direction: column;
	gap: 20px;
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
	width: 100%;

	> .dashed-btm {
		display: flex;
		justify-content: center;
	}

	.line {
		display: flex;
		flex-direction: row;
		justify-content: center;

		width: var(--content-max-width);

		background-image: var(--dashed-v);
		background-position: center top;
		background-repeat: repeat-y;

		article {
			flex: 1;
			min-width: 0;

			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			gap: 10px;

			padding: var(--content-padding);
		}
	}

	.dashed-btm:has(.whole-line) .line {
		background-image: none;
	}
}

.line:first-child {
	position: relative;
}

.articles-list .first {
	&::before,
	&::after {
		content: "";
		position: absolute;
		bottom: 0;

		width: 12px;
		height: 12px;

		background-image: var(--connector);
		background-repeat: no-repeat;
		background-size: contain;
		z-index: 1;
	}
	&::before {
		left: 0;
		translate: -50% 50%;
	}
	&::after {
		right: 0;
		translate: 50% 50%;
	}
}

/* ===== 侧边栏 ===== */
.sidebar {
	--section-pad-y: 40px;
}

/* ===== 手机端适配 ===== */
@media (max-width: @content-max-width) {
	.articles-list > .dashed-btm {
		min-height: auto;

		.line {
			flex-direction: column;
			width: 100%;
			padding: 0;
			background-image: none;

			article {
				width: 100%;
				padding: 20px;
			}

			article:first-child {
				background-position: 0 100%;
				background-image: var(--dashed-h);
				background-repeat: repeat-x;
			}
		}
	}
}
</style>
