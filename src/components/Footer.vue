<script setup lang="ts">
defineProps<{
	year?: number;
	author?: string;
}>();
</script>

<template>
	<footer class="app-footer">
		<p><small>&copy; {{ year ?? 2026 }} {{ author ?? 'xzl' }}</small></p>
	</footer>
</template>

<style scoped lang="less">
.app-footer {
	width: 100%;
	max-width: var(--content-max-width);
	padding: 40px var(--content-padding);
	text-align: center;
	color: var(--text);

	small {
		font-size: 0.85rem;
	}

	@media (max-width: 800px) {
		padding-left: 20px;
		padding-right: 20px;
	}
}
</style>
