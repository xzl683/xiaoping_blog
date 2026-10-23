<script setup lang="ts">
import { useSearch } from '@/store/search';

const { open, isOpen } = useSearch();
</script>

<template>
	<header class="site-header dashed-btm">
		<RouterLink to="/" class="logo">我的博客</RouterLink>
		<button
			type="button"
			id="search-button"
			@click="open"
			:aria-expanded="isOpen"
			aria-controls="search-dialog"
		>
			<img src="/src/assets/images/search-icon.svg" alt="search" />
		</button>
		<nav aria-label="主导航">
			<a href="/">首页</a>
			<a href="/setting">设置</a>
			<a href="/about">关于</a>
		</nav>
	</header>
</template>

<style scoped lang="less">
/* ===== Header ===== */
.site-header {
	position: relative;

	display: flex;
	align-items: center;
	justify-content: space-between;

	padding: 0 20px;

	width: 100%;
	height: 60px;
}

.logo {
	flex: 1;
	font-size: 1.2rem;
	font-weight: 600;
	color: var(--text-h);
	text-decoration: none;
}

.site-header nav a {
	margin-left: 24px;
	padding: 5px;
	color: var(--text);
	border: 1px transparent solid;
	text-decoration: none;
	font-size: 0.95rem;
}

.site-header nav a:hover {
	border: 1px #d3d3d3 solid;
	border-radius: 8px;
	background-color: #f3f3f3;
}

#search-button {
	width: 30px;
	height: 30px;
	background-color: transparent;
	border: none;
	border-radius: 50%;
	transition: all 300ms;
	cursor: pointer;

	&:hover {
		background-color: #f6f6f7;
	}
}
</style>
