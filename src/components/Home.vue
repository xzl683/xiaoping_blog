<script setup lang="ts">
import { useArticlesStore } from '../composables/useArticlesStore';

const { articles } = useArticlesStore();
</script>

<template>
	<div id="home">
		<header class="site-header">
			<a href="/" class="logo">我的博客</a>
			<nav aria-label="主导航">
				<a href="/">首页</a>
				<a href="/archive">归档</a>
				<a href="/about">关于</a>
			</nav>
		</header>

		<!-- Blog 介绍区（参考 Cloudflare 博客 Hero） -->
		<section class="blog-intro">
			<h1 class="blog-title">我的博客</h1>
			<p class="blog-subtitle">
				技术深度解析、产品更新，以及来自助力构建更美好互联网的团队的洞察。
			</p>
		</section>

		<main class="articles-list">
			<article v-for="article in articles" :key="article.id" class="article-card">
				<time class="article-date" :datetime="article.createTime.toLocaleDateString()">
					{{ article.createTime.toChineseDateString() }}
				</time>
				<h2 class="article-title">
					<a :href="'#' + article.getUrl()">{{ article.title }}</a>
				</h2>
				<p class="article-summary">{{ article.summary }}</p>
				<p class="article-author">
					作者：<a rel="author" href="/about">{{ article.author }}</a>
				</p>
			</article>
		</main>

		<aside class="sidebar" aria-label="侧边栏">
			<section>
				<h2>关于我</h2>
				<p>前端开发者，喜欢写博客。</p>
			</section>
		</aside>

		<footer class="site-footer">
			<p><small>&copy; 2026 xzl</small></p>
		</footer>
	</div>
</template>

<style scoped>
#home {
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;
}

/* ===== Header ===== */
.site-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	max-width: 760px;
	height: 60px;
	padding: 0 20px;
	box-sizing: border-box;
	border-bottom: 1px dashed var(--border);
}

.logo {
	font-size: 1.2rem;
	font-weight: 600;
	color: var(--text-h);
	text-decoration: none;
}

.site-header nav a {
	margin-left: 24px;
	color: var(--text);
	text-decoration: none;
	font-size: 0.95rem;
}

.site-header nav a:hover {
	color: var(--accent);
}

/* ===== Blog 介绍区（Hero） ===== */
.blog-intro {
	width: 100%;
	max-width: 760px;
	padding: 60px 20px 40px;
	box-sizing: border-box;
	text-align: left;
	border-bottom: 1px dashed var(--border);
}

.blog-title {
	font-size: 2.5rem;
	font-weight: 700;
	color: var(--text-h);
	margin: 0 0 16px 0;
	line-height: 1.2;
}

.blog-subtitle {
	font-size: 1.1rem;
	color: var(--text);
	margin: 0;
	line-height: 1.6;
}

/* ===== 文章列表（两列布局） ===== */
.articles-list {
	display: flex;
	flex-wrap: wrap;
	gap: 48px 32px;
	width: 100%;
	max-width: 760px;
	padding: 40px 20px;
	box-sizing: border-box;
	border-bottom: 1px dashed var(--border);
}

.article-card {
	flex: 0 0 calc(50% - 16px);
	margin-bottom: 0;
	box-sizing: border-box;
}

/* 手机端：单列 */
@media (max-width: 600px) {
	.article-card {
		flex: 0 0 100%;
	}
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

/* ===== 侧边栏 ===== */
.sidebar {
	width: 100%;
	max-width: 760px;
	padding: 40px 20px;
	box-sizing: border-box;
	border-bottom: 1px dashed var(--border);
}

/* ===== Footer ===== */
.site-footer {
	width: 100%;
	max-width: 760px;
	padding: 40px 20px;
	box-sizing: border-box;
	text-align: center;
	color: var(--text);
}
</style>
