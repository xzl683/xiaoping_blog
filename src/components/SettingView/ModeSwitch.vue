<script setup lang="ts" generic="T extends string">
import { computed } from 'vue';

interface ModeOption<V extends string> {
	value: V;
	label: string;
}

const modelValue = defineModel<T>({ required: true });

const props = defineProps<{
	options: ModeOption<T>[];
}>();

const activeIndex = computed(() =>
	Math.max(0, props.options.findIndex(opt => opt.value === modelValue.value)),
);

const highlightStyle = computed(() => ({
	'--mode-count': props.options.length,
	'--mode-index': activeIndex.value,
}));

function select(value: T) {
	modelValue.value = value;
}
</script>

<template>
	<div class="mode-switch" :style="highlightStyle">
		<div class="mode-highlight" />

		<button
			v-for="opt in options"
			:key="opt.value"
			type="button"
			class="mode-btn"
			:class="{ active: modelValue === opt.value }"
			@click="select(opt.value)"
		>
			{{ opt.label }}
		</button>
	</div>
</template>

<style scoped lang="less">
.mode-switch {
	position: relative;
	display: inline-flex;
	width: fit-content;
	padding: 4px;
	border: 1px solid var(--border);
	border-radius: var(--radius-md);
	background: var(--bg);
	z-index: 0;

	/* 滑动高亮：宽度为单个按钮，位置由 --mode-index 决定 */
	.mode-highlight {
		position: absolute;
		top: 4px;
		bottom: 4px;
		left: 4px;
		width: calc((100% - 8px) / var(--mode-count, 1));
		background: var(--accent-bg);
		border: 1px dashed var(--accent-border);
		border-radius: var(--radius-sm);
		transform: translateX(calc(var(--mode-index, 0) * 100%));
		transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
		z-index: -1;
	}
}

.mode-btn {
	position: relative;
	flex: 1;
	min-width: 110px;
	padding: 10px 20px;
	font-size: 0.95rem;
	font-weight: 500;
	color: var(--text);
	background: transparent;
	border: none;
	border-radius: var(--radius-sm);
	cursor: pointer;
	transition: color 0.25s ease;
	white-space: nowrap;

	&:hover {
		color: var(--text-h);
	}

	&.active {
		color: var(--accent);
		font-weight: 600;
	}
}

@media (max-width: 800px) {
	.mode-btn {
		min-width: 90px;
		padding: 10px 14px;
	}
}
</style>
