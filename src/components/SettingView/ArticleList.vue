<script setup lang="ts">
import type Article from '@/core/Article';

defineProps<{
	articles: readonly Article[];
	action: 'edit' | 'delete';
}>()

const emit = defineEmits<{
	(e: 'action', article: Article): void;
}>();
</script>

<template>
	<div class="article-list">
		<article v-for="art in articles" :key="art.id" class="article-row">
			<div class="row-info">
				<h3 class="row-title">{{ art.title }}</h3>
				<p class="row-meta">
					<time :datetime="art.createTime.toISODateString()">
						{{ art.createTime.toChineseDateString() }}
					</time>
					<span class="dot">·</span>
					<span class="row-author">{{ art.author }}</span>
				</p>
			</div>

			<p class="row-summary">{{ art.summary }}</p>

			<button
				type="button"
				class="btn"
				:class="action === 'delete' ? 'btn--danger' : 'btn--accent'"
				@click="emit('action', art)"
			>
				{{ action === 'delete' ? '删除' : '编辑' }}
			</button>
		</article>
	</div>
</template>

<style scoped lang="less">
.article-list {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.article-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 20px;
	padding: 16px 20px;
	border: 1px dashed var(--border);
	border-radius: var(--radius-md);
	background: var(--bg);
	transition: border-color 0.2s ease, background 0.2s ease;

	&:hover {
		border-color: var(--accent-border);
		background: var(--accent-bg);
	}
}

.row-info {
	width: 30%;
	min-width: 0;
}

.row-title {
	margin: 0;
	font-size: 1.1rem;
	font-weight: 600;
	color: var(--text-h);
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.row-meta {
	margin: 2px 0 0;
	font-size: 0.8rem;
	color: var(--text);
}

.dot {
	margin: 0 4px;
}

.row-summary {
	width: 50%;
	margin: 0;
	font-size: 0.75rem;
}

@media (max-width: 800px) {
	.article-row {
		flex-wrap: wrap;
		gap: 12px;
	}

	.row-info,
	.row-summary {
		width: 100%;
	}
}
</style>
