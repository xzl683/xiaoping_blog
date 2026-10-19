<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
    <header class="site-header dashed-section">
        <RouterLink to="/" class="logo">我的博客</RouterLink>
        <nav aria-label="主导航">
            <a href="/">首页</a>
            <a href="/archive">归档</a>
            <a href="/about">关于</a>
        </nav>
    </header>
</template>

<style scoped>
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

</style>
