<script setup lang="ts">
import { useArticlesStore } from '../composables/useArticlesStore';

const { articles } = useArticlesStore();
</script>

<template>
	<div id="home">
		<header class="site-header dashed-section">
			<a href="/" class="logo">我的博客</a>
			<nav aria-label="主导航">
				<a href="/">首页</a>
				<a href="/archive">归档</a>
				<a href="/about">关于</a>
			</nav>
		</header>

		<!-- Blog 介绍区（参考 Cloudflare 博客 Hero） -->
		<section class="blog-intro dashed-section">
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

		<aside class="sidebar dashed-section" aria-label="侧边栏">
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

/* ===== 两侧竖向虚线（从 header 底部延伸到页面底部） ===== */
#home::before,
#home::after {
	content: "";
	position: absolute;
	top: 60px;
	bottom: 0;
	width: 1px;
	background-image: url(/images/dashed-vertical-light.svg);
	background-repeat: repeat-y;
	z-index: 0;
	pointer-events: none;
}
#home::before {
	left: calc(50% - 360px);
}
#home::after {
	right: calc(50% - 360px);
}

/* ===== 通用：区块底部通栏横虚线（视口宽度） ===== */
.dashed-section {
	position: relative;
}
/* ::before 绘制通栏横虚线，::after 绘制左右连接方框 */
.dashed-section::before {
	content: "";
	position: absolute;
	left: calc(50% - 50vw);
	right: calc(50% - 50vw);
	bottom: 0;
	height: 1px;
	background-image: url(/images/dashed-horizontal-light.svg);
	background-repeat: repeat-x;
	background-position: bottom;
	pointer-events: none;
}
.dashed-section::after {
	content: "";
	position: absolute;
	left: 0;
	right: 0;
	bottom: -6px;
	height: 12px;
	background-image:
		url(/images/connector--light.svg),
		url(/images/connector--light.svg);
	background-repeat: no-repeat, no-repeat;
	background-position: -6px 0, calc(100% + 6px) 0;
	background-size: 12px 12px, 12px 12px;
	z-index: var(--z-connector);
	pointer-events: none;
}

/* ===== Header ===== */
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

/* 中间竖向虚线：作为 grid 子项定位，奇数篇时从第 2 行开始（避开首篇整行） */
.articles-list::before {
	content: "";
	position: absolute;
	grid-column: 1 / -1;
	grid-row: 1 / -1;
	justify-self: center;
	top: 0;
	bottom: -6px;
	width: 1px;
	background-image: url(/images/dashed-vertical-light.svg);
	background-repeat: repeat-y;
	pointer-events: none;
}
/* 文章数为奇数时，首篇占整行，中间竖虚线从第 2 行开始到 aside 顶部 */
.articles-list:has(> .article-card:first-child:nth-last-child(odd))::before {
	grid-row: 2 / -1;
}

.article-card {
	position: relative;
	box-sizing: border-box;
	padding-bottom: 48px;
}

/* 文章数为奇数时，第 1 篇占满一整行 */
.article-card:first-child:nth-last-child(odd) {
	grid-column: 1 / -1;
}

/* 每篇文章底部：仅通栏横虚线（无连接方框） */
.article-card::after {
	content: "";
	position: absolute;
	bottom: 0;
	height: 1px;
	z-index: 1;
	background-image: url(/images/dashed-horizontal-light.svg);
	background-repeat: repeat-x;
	background-position: left center;
	pointer-events: none;
}

/* 左列文章：通栏虚线从视口左端到右端 */
.article-card:nth-child(odd)::after {
	left: calc((760px - 100vw) / 2 - 20px);
	right: calc(364px - (100vw + 760px) / 2);
}
/* 右列文章 */
.article-card:nth-child(even)::after {
	left: calc((760px - 100vw) / 2 - 396px);
	right: calc(740px - (100vw + 760px) / 2);
}
/* 奇数篇时首篇占整行，虚线通栏（保留中间连接方框，竖虚线从此处开始） */
.article-card:first-child:nth-last-child(odd)::after {
	left: calc((760px - 100vw) / 2 - 20px);
	right: calc(740px - (100vw + 760px) / 2);
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

/* ===== 侧边栏（仅底部横虚线，无连接方框） ===== */
.sidebar {
	width: 100%;
	max-width: 760px;
	padding: 40px 20px;
	box-sizing: border-box;
}
.sidebar.dashed-section::after {
	display: none;
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

/* ===== 手机端适配 ===== */
@media (max-width: 760px) {
	#home::before {
		left: 20px;
	}
	#home::after {
		right: 20px;
	}
	.articles-list {
		grid-template-columns: 1fr;
	}
	.articles-list::before {
		display: none;
	}
	.article-card::after {
		left: -20px;
		right: -20px;
	}
}
</style>
