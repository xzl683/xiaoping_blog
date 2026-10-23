<script setup lang="ts">
import { ref, watch } from 'vue';
import Nav from '@/components/Nav.vue';
import type Article from '@/core/Article';
import { fetchArticle } from '@/api';

const props = defineProps<{ slug: string }>();

const article = ref<Article | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

function loadArticle(slug: string) {
	loading.value = true;
	error.value = null;
	try {
		// 实际项目：fetch(`/api/posts/${slug}`) 或查 markdown
		article.value = fetchArticle(slug);
		document.title = article.value?.title ?? '文章不存在';
	} catch (e) {
		error.value = '文章加载失败';
	} finally {
		loading.value = false;
	}
}

// 关键：watch 而不是 onMounted
// 从 /posts/a 跳到 /posts/b 时组件被复用，onMounted 不会再触发
watch(
	() => props.slug,
	slug => loadArticle(slug),
	{ immediate: true },
);
</script>

<template>
	<Nav />

	<main>
		<p v-if="loading">加载中…</p>
		<p v-else-if="error">{{ error }}</p>

		<article v-else>
			<header>
				<time :datetime="article!.createTime.toLocaleDateString()">
					{{ article!.createTime.toChineseDateString() }}
				</time>
				<h1>{{ article!.title }}</h1>
				<div class="article-author">
					作者:<a rel="author" href="/about">{{ article!.author }}</a>
				</div>
			</header>

			<pre>{{ article!.content }}</pre>
		</article>
	</main>
</template>

<style scoped lang="less">
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

main {
	display: flex;
	justify-content: center;
	> article {
		> header {
			time {
				font-size: 0.75rem;
			}
		}
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 90%;
	}
}

pre {
	white-space: pre-wrap;
	overflow-wrap: break-word;
	overflow-x: auto;
}

article {
	background-image: url(/src/assets/images/dashed-vertical-light.svg);
	background-repeat: repeat-y;
}

// article::before,
// article::after {
// 	content: "";
// 	position: absolute;
// 	top: 60px;
// 	bottom: 0;
// 	width: 1px;
// 	background-image: url(../assets/images/dashed-vertical-light.svg);
// 	background-repeat: repeat-y;
// 	z-index: 0;
// 	pointer-events: none;
// }
// article::after {
// 	right: 100%;
// }
</style>
