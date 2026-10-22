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

			<p>{{ article!.content }}</p>

			<!-- <section>
				<h2>小标题</h2>
				<p>这一节的内容。</p>
			</section>

			<figure>
				<img src="demo.png" alt="示例图片说明">
				<figcaption>图 1：示例说明</figcaption>
			</figure>

			<blockquote cite="https://example.com/source">
				<p>这是一段引用内容。</p>
				<footer>— <cite>某人</cite></footer>
			</blockquote>

			<pre><code>console.log('Hello, blog!');</code></pre>

			<footer>
				<p>标签：<a href="/tags/html">HTML</a>、<a href="/tags/css">CSS</a></p>
			</footer> -->
		</article>

		<!-- <section id="comments">
			<h2>评论</h2>

			<article>
				<header>
					<h3>评论者</h3>
					<p><time datetime="2026-10-16T12:00">2026-10-16 12:00</time></p>
				</header>
				<p>这是一条评论。</p>
			</article>
		</section> -->
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
	width: 100vw;

	article {
		max-width: 1200px;
	}
}
</style>
