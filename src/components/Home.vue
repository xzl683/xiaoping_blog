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
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;
}

/* ===== 两侧竖向虚线（从 header 底部到页面底部） ===== */
#home::before,
#home::after {
	content: "";
	position: absolute;
	top: 60px;
	bottom: 0;
	width: 1px;
	background-image: url(/images/dashed-vertical-light.svg);
	background-repeat: repeat-y;
}
#home::before {
	left: calc(50% - 380px);
}
#home::after {
	right: calc(50% - 380px);
}

/* ===== Header（底部横虚线 + 左右连接方框） ===== */
.site-header {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	max-width: 760px;
	height: 60px;
	padding: 0 20px;
	box-sizing: border-box;
	background-image: url(/images/dashed-horizontal-light.svg);
	background-repeat: repeat-x;
	background-position: bottom;
}

.site-header::before,
.site-header::after {
	content: "";
	z-index: var(--z-connector);
	width: calc(var(--spacing) * 3);
	height: calc(var(--spacing) * 3);
	background-image: url(/images/connector--light.svg);
	background-repeat: no-repeat;
	background-size: contain;
	position: absolute;
	bottom: 0;
}
.site-header::before {
	left: 0;
	translate: -50% 50%;
}
.site-header::after {
	right: 0;
	translate: 50% 50%;
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
	position: relative;
	width: 100%;
	max-width: 760px;
	padding: 60px 20px 40px;
	box-sizing: border-box;
	text-align: left;
	background-image: url(/images/dashed-horizontal-light.svg);
	background-repeat: repeat-x;
	background-position: bottom;
}

.blog-intro::before,
.blog-intro::after {
	content: "";
	z-index: var(--z-connector);
	width: calc(var(--spacing) * 3);
	height: calc(var(--spacing) * 3);
	background-image: url(/images/connector--light.svg);
	background-repeat: no-repeat;
	background-size: contain;
	position: absolute;
	bottom: 0;
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
	margin: 0 0 16px 0;
	line-height: 1.2;
}

.blog-subtitle {
	font-size: 1.1rem;
	color: var(--text);
	margin: 0;
	line-height: 1.6;
}

/* ===== 文章列表（两列网格） ===== */
.articles-list {
	position: relative;
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 32px;
	row-gap: 48px;
	width: 100%;
	max-width: 760px;
	padding: 40px 20px 0;
	box-sizing: border-box;
}

/* 中间竖向虚线（仅文章列表区域） */
.articles-list::before {
	content: "";
	position: absolute;
	left: 50%;
	top: 0;
	bottom: 0;
	width: 1px;
	background-image: url(/images/dashed-vertical-light.svg);
	background-repeat: repeat-y;
}

.article-card {
	position: relative;
	box-sizing: border-box;
	padding-bottom: 48px;
}

/* 每篇文章底部：横向虚线（通栏） + 左/中/右三个连接方框 */
.article-card::after {
	content: "";
	position: absolute;
	left: -20px;
	right: -20px;
	bottom: 0;
	height: 1px;
	z-index: 1;
	background-image:
		url(/images/connector--light.svg),
		url(/images/connector--light.svg),
		url(/images/connector--light.svg),
		url(/images/dashed-horizontal-light.svg);
	background-repeat: no-repeat, no-repeat, no-repeat, repeat-x;
	background-position: left bottom, center bottom, right bottom, bottom;
	background-size: 12px 12px, 12px 12px, 12px 12px, auto;
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

/* 手机端：单列，隐藏中间竖虚线，只保留左右连接方框 */
@media (max-width: 600px) {
	.articles-list {
		grid-template-columns: 1fr;
	}
	.articles-list::before {
		display: none;
	}
	.article-card::after {
		background-image:
			url(/images/connector--light.svg),
			url(/images/connector--light.svg),
			url(/images/dashed-horizontal-light.svg);
		background-position: left bottom, right bottom, bottom;
	}
}

/* ===== 侧边栏 ===== */
.sidebar {
	position: relative;
	width: 100%;
	max-width: 760px;
	padding: 40px 20px;
	box-sizing: border-box;
	background-image: url(/images/dashed-horizontal-light.svg);
	background-repeat: repeat-x;
	background-position: bottom;
}

.sidebar::before,
.sidebar::after {
	content: "";
	z-index: var(--z-connector);
	width: calc(var(--spacing) * 3);
	height: calc(var(--spacing) * 3);
	background-image: url(/images/connector--light.svg);
	background-repeat: no-repeat;
	background-size: contain;
	position: absolute;
	bottom: 0;
}
.sidebar::before {
	left: 0;
	translate: -50% 50%;
}
.sidebar::after {
	right: 0;
	translate: 50% 50%;
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
