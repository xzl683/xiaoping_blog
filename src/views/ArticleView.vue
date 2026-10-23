<script setup lang="ts">
import { ref, watch } from 'vue';
import type Article from '@/core/Article';
import { fetchArticle } from '@/api';
import Footer from '@/components/Footer.vue';

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
	<div id="article">
		<div class="full-horizon dashed-btm">
			<p v-if="loading" class="article-detail loading-state">加载中…</p>
			<p v-else-if="error" class="article-detail error-state">{{ error }}</p>
			<article class="article-detail dashed-section" v-else>
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
		</div>

		<Footer />
	</div>
</template>

<style scoped lang="less">
@content-max-width: 800px;

#article {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;
	overflow-x: hidden;

	/* 两侧竖向虚线（与 HomeView 一致） */
	&::before,
	&::after {
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
	&::before {
		left: calc(50% - var(--content-max-width) / 2);
	}
	&::after {
		right: calc(50% - var(--content-max-width) / 2);
	}
}

.article-detail {
	position: relative;
	width: 100%;
	max-width: var(--content-max-width);
	padding: var(--content-padding);

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

	> header {
		margin-bottom: 20px;
		time {
			font-size: 0.8rem;
			color: var(--text);
			display: block;
			margin-bottom: 8px;
		}
		h1 {
			font-size: 2rem;
			font-weight: 700;
			color: var(--text-h);
			margin: 0 0 12px 0;
			line-height: 1.3;
		}
	}
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

pre {
	white-space: pre-wrap;
	overflow-wrap: break-word;
	overflow-x: auto;
	font-family: var(--sans);
	font-size: 1rem;
	line-height: 1.7;
	color: var(--text);
	margin: 0;
}

.loading-state,
.error-state {
	text-align: center;
	color: var(--text);
	padding: 60px var(--content-padding);

	&.error-state {
		color: #e74c3c;
	}
}

@media (max-width: @content-max-width) {
	#article::before {
		left: 20px;
	}
	#article::after {
		right: 20px;
	}

	.article-detail {
		padding: 20px;
	}
}
</style>
