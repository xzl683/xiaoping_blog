<script setup lang="ts">
import { useArticlesStore } from '../composables/useArticlesStore';

// import { ref } from 'vue';

const { articles } = useArticlesStore();
</script>

<template>
	<div id="home">
		<header class="site-header">
			<a href="/">我的博客</a>
			<nav aria-label="主导航">
				<div>
					<a href="/">首页</a>
					<a href="/archive">归档</a>
					<a href="/about">关于</a>
				</div>
			</nav>
		</header>

		<main>
			<article v-for="article in articles">
				<header>
					<h2><a :href="'#' + article.getUrl()">{{ article.title }}</a></h2>
					<time :datetime="article.createTime.toLocaleDateString()">{{ article.createTime.toChineseDateString() }}</time>
					· 作者:
					<a rel="author" href="/about">{{ article.author }}</a>
				</header>

				<p>{{ article.summary }}</p>

				<!-- <footer>
					<p>
						标签：
						<a href="/tags/html">HTML</a>
					</p>
				</footer> -->
			</article>
			<!-- <h1>最新文章</h1>

			<article>
				<header>
					<h2><a href="/posts/hello">Hello World</a></h2>
					<p>
						<time datetime="2026-10-16">2026年10月16日</time>
						· 作者：
						<a rel="author" href="/about">张三</a>
					</p>
				</header>

				<p>这是文章摘要……</p>

				<footer>
					<p>
						标签：
						<a href="/tags/html">HTML</a>
					</p>
				</footer>
			</article> -->
		</main>

		<aside aria-label="侧边栏">
			<section>
				<h2>关于我</h2>
				<p>前端开发者，喜欢写博客。</p>
			</section>
		</aside>

		<footer class="site-footer">
			<p><small>&copy; 2026 张三</small></p>
		</footer>
	</div>
</template>

<style scoped>
#home {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.site-header {
	display: flex;
	align-items: center;
	justify-content: space-between;

	width: 100%;
	height: 60px;

	> a {
		margin-left: 30px;
	}

	> nav {
		margin-right: 30px;
		display: flex;
	}
}

main {
	display: flex;
	flex-direction: column;

	width: 100%;

	> article {
		margin: 0 30px;


	}
}
</style>
