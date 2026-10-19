<script setup lang="ts">
import { useRouter } from 'vue-router';

import type Article from '@/core/Article';
const router = useRouter();

const { article } = defineProps<{
	article: Article
}>();
</script>

<template>
	<article class="article-card">
		<time class="article-date" :datetime="article.createTime.toLocaleDateString()">
			{{ article.createTime.toChineseDateString() }}
		</time>
		<h2 class="article-title">
			<!-- <a :href="'#' + article.getUrl()">{{ article.title }}</a> -->
			<span @click="router.push({
				path: '/article',
				query: {
					id: article.id
				}
			})">{{ article.title }}</span>
		</h2>
		<p class="article-summary">{{ article.summary }}</p>
		<p class="article-author">
			作者：
			<a rel="author" href="/about">{{ article.author }}</a>
		</p>
	</article>
</template>

<style scoped>
.article-card {
	position: relative;
}


/* .article-card:first-child:nth-last-child(odd) {
	grid-column: 1 / -1;
	background: var(--bg);
}
.article-card::after {
	content: "";
	position: absolute;
	bottom: -24px;
	height: 1px;
	z-index: 1;
	background-image: url(/images/dashed-horizontal-light.svg);
	background-repeat: repeat-x;
	background-position: left center;
	pointer-events: none;
}
.article-card:nth-child(odd)::after {
	left: calc((760px - 100vw) / 2 - 20px);
	right: calc(364px - (100vw + 760px) / 2);
}
.article-card:nth-child(even)::after {
	left: calc((760px - 100vw) / 2 - 396px);
	right: calc(740px - (100vw + 760px) / 2);
}
.article-card:first-child:nth-last-child(odd)::after {
	left: calc((760px - 100vw) / 2 - 20px);
	right: calc(740px - (100vw + 760px) / 2);
} */

.article-date {
	display: block;
	font-size: 0.85rem;
	color: var(--text);
	margin-bottom: 8px;
}

.article-title {
	font-size: 1.6rem;
	font-weight: 600;
	margin: 0 0 12px 0;
	line-height: 1.3;
}

.article-title span {
	color: var(--text-h);
	cursor: pointer;
}

.article-title span:hover {
	color: var(--accent);
}

.article-summary {
	font-size: 1rem;
	color: var(--text);
	line-height: 1.6;
	margin: 0 0 12px 0;
}

.article-author {
	font-size: 0.9rem;
	color: var(--text);
	margin: 0;
}

.article-author a {
	color: var(--accent);
	text-decoration: none;
}
</style>
