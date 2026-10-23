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
			<a href="/archive">归档</a>
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

	border-bottom: 1px #c2c2c2 solid;
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
