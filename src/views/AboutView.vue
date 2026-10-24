<script setup lang="ts">
import Footer from '@/components/Footer.vue';
</script>

<template>
	<div id="about" class="page-frame">
		<div class="full-horizon dashed-btm">
			<section class="content-section about-panel">
				<h1 class="about-title">关于我</h1>
				<p class="about-text">前端开发者，喜欢写博客。</p>
				<p class="about-text">这里记录技术学习与实践中的思考。</p>
			</section>
		</div>

		<Footer />
	</div>
</template>

<style scoped lang="less">
@content-max-width: 800px;

#about {
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;

	> .full-horizon {
		flex: 1;
	}
}

.about-panel {
	--section-pad-y: 80px;

	display: flex;
	flex-direction: column;
	gap: 16px;
}

.about-title {
	margin: 0;
	font-size: 2.5rem;
	font-weight: 700;
	line-height: 1.2;
	color: var(--text-h);
}

.about-text {
	margin: 0;
	font-size: 1.05rem;
	line-height: 1.7;
	color: var(--text);
}

@media (max-width: @content-max-width) {
	.about-panel {
		--section-pad-y: 60px;
	}

	.about-title {
		font-size: 2rem;
	}
}
</style>
