<script setup lang="ts">
import { useSearch } from '@/stores/search';

const { open, isOpen } = useSearch();
</script>

<template>
	<header class="site-header dashed-btm">
		<RouterLink to="/" class="logo">我的博客</RouterLink>
		<button
			type="button"
			id="search-button"
			aria-label="搜索文章"
			@click="open"
			:aria-expanded="isOpen"
			aria-controls="search-dialog"
		>
			<img src="/src/assets/images/search-icon.svg" alt="" aria-hidden="true" />
		</button>
		<nav aria-label="主导航">
			<router-link to="/" class="nav-link">首页</router-link>
			<router-link to="/setting" class="nav-link">设置</router-link>
			<router-link to="/about" class="nav-link">关于</router-link>
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

.nav-link {
	margin-left: 24px;
	padding: 5px;
	color: var(--text);
	border: 1px transparent solid;
	text-decoration: none;
	font-size: 0.95rem;
}

.nav-link:hover {
	border: 1px var(--border) solid;
	border-radius: var(--radius-md);
	background-color: var(--surface-2);
}

#search-button {
	width: 30px;
	height: 30px;
	background-color: transparent;
	border: none;
	border-radius: 50%;
	transition: all 300ms;
	cursor: pointer;
	transform: translateY(4px);

	&:hover {
		background-color: var(--surface-2);
	}
}
</style>
