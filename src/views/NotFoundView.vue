<script setup lang="ts">
import Footer from '@/components/Footer.vue';
</script>

<template>
	<div id="not-found" class="page-frame">
		<div class="full-horizon dashed-btm">
			<section class="not-found-panel content-section">
				<p class="error-code">404</p>
				<h1 class="error-title">页面不存在</h1>
				<p class="error-message">
					你访问的页面可能已被删除、重命名，或者从未存在过。
				</p>
				<RouterLink to="/" class="btn btn--primary btn--lg">回到主页</RouterLink>
			</section>
		</div>

		<Footer />
	</div>
</template>

<style scoped lang="less">
@content-max-width: 800px;

#not-found {
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;

	> .full-horizon {
		flex: 1;
	}
}

.not-found-panel {
	--section-pad-y: 80px;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
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

/* ===== 手机端适配 ===== */
@media (max-width: @content-max-width) {
	.not-found-panel {
		--section-pad-y: 60px;
	}

	.error-code {
		font-size: 4rem;
	}

	.error-title {
		font-size: 1.6rem;
	}
}
</style>
