<script setup lang="ts">
import { ref, watch, onMounted, useId } from 'vue';

interface Props {
	headerClose?: boolean;
	title?: string;
	/** 点击遮罩层是否关闭，默认 true */
	closeOnBackdrop?: boolean;
	/** 按 Esc 是否关闭，默认 true */
	closeOnEsc?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	headerClose: false,
	closeOnBackdrop: true,
	closeOnEsc: true
});

/** v-model:open 控制开关 */
const open = defineModel<boolean>('open', { default: false });

const emit = defineEmits<{
	/** dialog 完成显示后触发，适合做 input.focus() */
	opened: [];
	/** dialog 关闭后触发 */
	closed: [];
}>();

const titleId = useId(); // Vue 3.5+；低版本可去掉 aria-labelledby
const dialogRef = ref<HTMLDialogElement | null>(null);

function show() {
	const el = dialogRef.value;
	if (!el || el.open) return;
	el.showModal();
	emit('opened');
}

function hide() {
	const el = dialogRef.value;
	if (!el || !el.open) return;
	el.close();
}

// open 变化 -> 同步 dialog
watch(open, val => val ? show() : hide(), { flush: 'post' });

// 初始 open = true 的情况
onMounted(() => {
	if (open.value) show();
});

// 原生 close（Esc、close()）-> 回写 open
function onClose() {
	if (open.value) open.value = false;
	emit('closed');
}

function onCancel(e: Event) {
	if (!props.closeOnEsc) e.preventDefault();
}

// 点遮罩关闭：dialog 自身 padding 为 0，点到的就是 backdrop
function onDialogClick(e: MouseEvent) {
	if (!props.closeOnBackdrop) return;
	if (e.target === dialogRef.value) open.value = false;
}
</script>

<template>
	<dialog
		ref="dialogRef"
		class="base-modal"
		:aria-labelledby="title ? titleId : undefined"
		@close="onClose"
		@cancel="onCancel"
		@click="onDialogClick"
	>
		<div class="modal-inner">
			<header v-if="title || $slots.header || headerClose" class="modal-header">
				<slot name="header">
					<h2 v-if="title" :id="titleId" class="modal-title">{{ title }}</h2>
				</slot>
				<button
					v-if="headerClose"
					type="button"
					class="modal-close"
					aria-label="关闭"
					@click="open = false"
				>
					×
				</button>
			</header>

			<div class="modal-body">
				<slot />
			</div>

			<footer v-if="$slots.footer" class="modal-footer">
				<slot name="footer" />
			</footer>
		</div>
	</dialog>
</template>

<style scoped>
.base-modal {
	padding: 0; /* 关键：让点击 dialog 自身 = 点击 backdrop */
	border: none;
	border-radius: var(--radius-lg);
	/* width: min(90vw, 480px);
	max-height: min(85vh, 640px); */
	background: var(--surface);
	color: var(--text-h);
	overflow: hidden;
}

.base-modal::backdrop {
	background: rgb(0 0 0 / 0.5);
	backdrop-filter: blur(3px);
}

.modal-inner {
	display: flex;
	flex-direction: column;
	max-height: inherit;
}

.modal-header {
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 16px 20px;
	border-bottom: 1px solid var(--divider);
}

.modal-title {
	flex: 1;
	margin: 0;
	font-size: 1.125rem;
}

.modal-close {
	border: none;
	background: transparent;
	font-size: 1.5rem;
	line-height: 1;
	color: var(--muted);
	cursor: pointer;

	&:hover {
		color: var(--text-h);
	}
}

.modal-body {
	overflow: auto;
}

.modal-footer {
	display: flex;
	justify-content: flex-end;
	gap: 8px;
	padding: 12px 20px;
	border-top: 1px solid var(--divider);
}
</style>
