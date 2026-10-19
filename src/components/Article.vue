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
