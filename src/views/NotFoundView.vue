<script setup lang="ts">
import Footer from '@/components/Footer.vue';
</script>

<template>
	<div id="not-found">
		<div class="full-horizon dashed-btm">
			<section class="not-found-panel">
				<p class="error-code">404</p>
				<h1 class="error-title">页面不存在</h1>
				<p class="error-message">
					你访问的页面可能已被删除、重命名，或者从未存在过。
				</p>
				<RouterLink to="/" class="back-link">回到主页</RouterLink>
			</section>
		</div>

		<Footer />
	</div>
</template>

<style scoped lang="less">
@content-max-width: 800px;

#not-found {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;
	overflow-x: hidden;

	> .full-horizon {
		flex: 1;
	}

	/* ===== 两侧竖向虚线（与其它页面一致） ===== */
	&::before,
	&::after {
		content: "";
		position: absolute;
		top: 0;
		bottom: 0;
		width: 1px;
		background-image: var(--dashed-v);
		background-repeat: repeat-y;
		z-index: 0;
		pointer-events: none;
	}
	&::before {
		left: calc(50% - var(--content-max-width) / 2);
	}
	&::after {
		right: calc(50% - var(--content-max-width) / 2);
	}
}

.not-found-panel {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;

	width: 100%;
	max-width: var(--content-max-width);
	padding: 80px var(--content-padding);

	/* ===== 横虚线两端的方框连接器 ===== */
	&::before,
	&::after {
		content: "";
		position: absolute;
		bottom: 0;
		width: 12px;
		height: 12px;
		background-image: var(--connector);
		background-repeat: no-repeat;
		background-size: contain;
		z-index: 1;
	}
	&::before {
		left: 0;
		translate: -50% 50%;
	}
	&::after {
		right: 0;
		translate: 50% 50%;
	}
}

.error-code {
	font-family: var(--mono);
	font-size: 5rem;
	font-weight: 700;
	line-height: 1;
	letter-spacing: 2px;
	color: var(--accent);
	margin: 0;
}

.error-title {
	font-size: 2rem;
	font-weight: 700;
	color: var(--text-h);
	line-height: 1.3;
	margin: 16px 0 10px;
}

.error-message {
	font-size: 1rem;
	color: var(--text);
	line-height: 1.6;
	margin: 0 0 28px;
}

.back-link {
	display: inline-block;
	padding: 11px 26px;
	font-size: 0.95rem;
	font-weight: 500;
	color: #fff;
	background: var(--accent);
	border-radius: 6px;
	text-decoration: none;
	transition: background 0.2s ease, transform 0.15s ease;

	&:hover {
		background: #9129d6;
	}

	&:active {
		transform: scale(0.97);
	}
}

/* ===== 手机端适配 ===== */
@media (max-width: @content-max-width) {
	#not-found::before {
		left: 20px;
	}
	#not-found::after {
		right: 20px;
	}

	.not-found-panel {
		padding: 60px 20px;
	}

	.error-code {
		font-size: 4rem;
	}

	.error-title {
		font-size: 1.6rem;
	}
}
</style>
