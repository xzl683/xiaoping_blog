<script setup lang="ts">
import { computed } from 'vue';
import Nav from '@/components/Nav.vue';
import { useArticlesStore } from '@/composables/useArticlesStore.ts';
// import Article from '../components/Article.vue';

const { articles } = useArticlesStore();

const url = new URL(window.location.href);

const article = computed(() => articles.value.find(a => a.id === url.searchParams.get('id'))!);
</script>

<template>
	<Nav />

	<main>
		<article>
			<header>
				<h1>{{ article.title }}</h1>
				<p>
					<time :datetime="article.createTime.toLocaleDateString()">
						{{ article.createTime.toChineseDateString() }}
					</time>
					<div>作者:<a rel="author" href="/about">{{ article.author }}</a></div>
				</p>
			</header>

			<p>{{ article.content }}</p>

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
main {
	width: 100vw;

	article {}
}
</style>
