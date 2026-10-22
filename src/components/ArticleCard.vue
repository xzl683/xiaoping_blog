<script setup lang="ts">
import type Article from '@/core/Article';

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
			<RouterLink :to="{ name: 'article', params: { slug: article.id } }">
				{{ article.title }}
			</RouterLink>
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

.article-title a {
	color: var(--text-h);
	text-decoration: none;
	cursor: pointer;
}

.article-title a:hover {
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
