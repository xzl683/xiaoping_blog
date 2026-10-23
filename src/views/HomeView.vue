<script setup lang="ts">
import ArticleCard from '@/components/ArticleCard.vue';
import Footer from '@/components/Footer.vue';

import { useArticleStore } from '@/composables/useArticlesStore';
import { computed } from 'vue';
import { isOdd } from '@/utils/math.ts';
// import TestModal from '@/components/TestModal.vue';

const { articles } = useArticleStore();

function chunkPairs<T>(arr: T[]) {
	const result: T[][] = [];
	if(isOdd(arr.length)) result.push([arr[0]]);
	for(let i = result.length; i < arr.length; i += 2)
		result.push(arr.slice(i, i + 2));
	return result;
}

const pairArts = computed(() => chunkPairs(articles.value));
</script>

<template>
	<div id="home">
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

		<Footer />
	</div>
</template>

<style scoped lang="less">
@content-max-width: 800px;

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
	top: 0;
	bottom: 0;
	width: 1px;
	background-image: var(--dashed-v);
	background-repeat: repeat-y;
	z-index: 0;
	pointer-events: none;
}
#home::before {
	left: calc(50% - var(--content-max-width) / 2);
}
#home::after {
	right: calc(50% - var(--content-max-width) / 2);
}


/* ===== Blog 介绍区（Hero） ===== */
.blog-intro {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 20px;

	width: 100%;
	max-width: var(--content-max-width);
	padding: var(--content-padding);
	text-align: left;
}

.blog-intro::before,
.blog-intro::after {
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
		min-height: 382px;
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
			justify-content: center;
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
.line:first-child::before,
.line:first-child::after {
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
.line:first-child::before {
	left: 0;
    translate: -50% 50%;
}
.line:first-child::after {
	right: 0;
    translate: 50% 50%;
}

/* ===== 侧边栏 ===== */
.sidebar {
	width: 100%;
	max-width: var(--content-max-width);
	padding: 40px var(--content-padding);
}

/* ===== 手机端适配 ===== */
@media (max-width: @content-max-width) {
	#home::before {
		left: 20px;
	}
	#home::after {
		right: 20px;
	}

	.blog-intro,
	.sidebar {
		padding-left: 20px;
		padding-right: 20px;
	}

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
		}
	}
}
</style>
