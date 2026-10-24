<script setup lang="ts">
import { computed, onUnmounted, ref, watch, watchEffect } from 'vue';
import type Article from '@/core/Article';
import { fetchArticle } from '@/api';
import Footer from '@/components/Footer.vue';
import { renderContent } from '@/utils/markdown';

const props = defineProps<{ slug: string }>();

const article = ref<Article | null>(null);
const loading = ref(false);
/** 文章不存在（与真正的加载异常区分开） */
const notFound = ref(false);
const error = ref<string | null>(null);

const originalTitle = document.title;

/** 标题跟随文章状态，作为副作用放在 watchEffect 里 */
watchEffect(() => {
	if (notFound.value) document.title = '文章不存在';
	else if (article.value) document.title = article.value.title;
	else document.title = originalTitle;
});

onUnmounted(() => {
	document.title = originalTitle;
});

/** 自动识别 Markdown / 纯文本后渲染 */
const renderedContent = computed(() =>
	article.value ? renderContent(article.value.content) : '',
);

function loadArticle(slug: string) {
	loading.value = true;
	notFound.value = false;
	error.value = null;
	article.value = null;

	try {
		// 实际项目：fetch(`/api/posts/${slug}`) 或查 markdown
		article.value = fetchArticle(slug);
		notFound.value = article.value === null;
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
	{ immediate: true }
);
</script>

<template>
	<div id="article" class="page-frame">
		<div class="full-horizon dashed-btm article-body">
			<p v-if="loading" class="article-detail content-section loading-state">加载中…</p>
			<p v-else-if="notFound" class="article-detail content-section not-found-state">文章不存在或已被删除</p>
			<p v-else-if="error" class="article-detail content-section error-state">{{ error }}</p>
			<article class="article-detail content-section" v-else>
				<header>
					<time :datetime="article!.createTime.toISODateString()">
						{{ article!.createTime.toChineseDateString() }}
					</time>
					<h1>{{ article!.title }}</h1>
					<div class="article-author">
						作者:<RouterLink rel="author" to="/about">{{ article!.author }}</RouterLink>
					</div>
				</header>

				<div class="article-content" v-html="renderedContent" />
			</article>
		</div>

		<Footer />
	</div>
</template>

<style scoped lang="less">
@content-max-width: 800px;

#article {
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;
}

.article-body {
	flex: 1;
}

.article-detail {
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

/* ===== 正文：纯文本 / Markdown 共用排版 ===== */
.article-content {
	font-size: 1rem;
	line-height: 1.8;
	color: var(--text);
	overflow-wrap: break-word;

	:deep(p) {
		margin: 0 0 1.1em;
	}

	:deep(h1),
	:deep(h2),
	:deep(h3),
	:deep(h4) {
		margin: 1.6em 0 0.6em;
		color: var(--text-h);
		font-weight: 700;
		line-height: 1.3;
	}

	:deep(h1) {
		font-size: 1.6rem;
	}
	:deep(h2) {
		font-size: 1.35rem;
	}
	:deep(h3) {
		font-size: 1.15rem;
	}
	:deep(h4) {
		font-size: 1rem;
	}

	:deep(ul),
	:deep(ol) {
		margin: 0 0 1.1em;
		padding-left: 1.5em;
	}

	:deep(li) {
		margin: 0.3em 0;
	}

	:deep(li > p) {
		margin: 0;
	}

	:deep(a) {
		color: var(--accent);
		text-decoration: none;
	}

	:deep(a:hover) {
		text-decoration: underline;
	}

	:deep(strong) {
		color: var(--text-h);
		font-weight: 600;
	}

	:deep(blockquote) {
		margin: 0 0 1.1em;
		padding: 2px 0 2px 16px;
		border-left: 3px solid var(--accent-border);
		color: var(--text);
	}

	:deep(code) {
		padding: 2px 5px;
		font-family: var(--mono);
		font-size: 0.9em;
		background: var(--surface-2);
		border-radius: 4px;
	}

	:deep(pre) {
		margin: 0 0 1.1em;
		padding: 14px 16px;
		overflow-x: auto;
		background: var(--surface-2);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		line-height: 1.6;
	}

	:deep(pre code) {
		padding: 0;
		font-size: 0.875rem;
		background: transparent;
	}

	:deep(img) {
		max-width: 100%;
		height: auto;
		border-radius: var(--radius-md);
	}

	:deep(hr) {
		margin: 2em 0;
		border: none;
		border-top: 1px dashed var(--border);
	}

	:deep(table) {
		width: 100%;
		margin: 0 0 1.1em;
		border-collapse: collapse;
		font-size: 0.9rem;
	}

	:deep(th),
	:deep(td) {
		padding: 8px 10px;
		border: 1px solid var(--border);
		text-align: left;
	}

	:deep(th) {
		color: var(--text-h);
		font-weight: 600;
		background: var(--surface-2);
	}

	:deep(> *:last-child) {
		margin-bottom: 0;
	}
}

.loading-state,
.not-found-state,
.error-state {
	text-align: center;
	color: var(--text);
	--section-pad-y: 60px;

	&.error-state {
		color: var(--danger);
	}
}

@media (max-width: @content-max-width) {
	.article-detail {
		padding: 20px;
	}
}
</style>
