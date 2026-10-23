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

		<article class="article-detail" v-else>
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
@content-max-width: 800px;

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
	padding: 40px 0;
}

.article-detail {
	position: relative;
	width: calc(100% - 40px);
	max-width: var(--content-max-width);
	padding: var(--content-padding);

	> header {
		time {
			font-size: 0.75rem;
		}
	}
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.article-detail::before,
.article-detail::after {
	content: "";
	position: absolute;
	top: 0;
	bottom: 0;
	width: 1px;
	background-image: var(--dashed-v);
	background-repeat: repeat-y;
	pointer-events: none;
}

.article-detail::before {
	left: 0;
}

.article-detail::after {
	right: 0;
}

pre {
	white-space: pre-wrap;
	overflow-wrap: break-word;
	overflow-x: auto;
}

@media (max-width: @content-max-width) {
	.article-detail {
		padding: 20px;
	}
}
</style>
