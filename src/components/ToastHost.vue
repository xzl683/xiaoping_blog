<script setup lang="ts">
import { useToast } from '@/stores/toast';

const { toasts, remove } = useToast();
</script>

<template>
	<Teleport to="body">
		<div class="toast-host" aria-live="polite" aria-atomic="false">
			<TransitionGroup name="toast">
				<div
					v-for="t in toasts"
					:key="t.id"
					class="toast"
					:class="`toast--${t.type}`"
					:role="t.type === 'error' ? 'alert' : 'status'"
				>
					<span class="toast-icon" aria-hidden="true">
						{{ t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : 'i' }}
					</span>

					<span class="toast-message">{{ t.message }}</span>

					<button type="button" class="toast-close" aria-label="关闭提示" @click="remove(t.id)">
						×
					</button>
				</div>
			</TransitionGroup>
		</div>
	</Teleport>
</template>

<style scoped lang="less">
.toast-host {
	position: fixed;
	top: 20px;
	left: 50%;
	transform: translateX(-50%);
	z-index: 10000; /* 高于 dialog，弹窗里也能看到 */
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	pointer-events: none; /* 容器不挡点击 */
}

.toast {
	display: flex;
	align-items: center;
	gap: 10px;
	min-width: 240px;
	max-width: min(90vw, 420px);
	padding: 10px 14px;
	border-radius: var(--radius-md);
	border: 1px solid transparent;
	background: var(--surface);
	box-shadow: 0 6px 24px rgb(0 0 0 / 0.12);
	font-size: 0.9rem;
	pointer-events: auto;
}

.toast-icon {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 20px;
	flex-shrink: 0;
	border-radius: 50%;
	font-size: 0.75rem;
	font-weight: 700;
	color: #fff;
}

.toast-message {
	flex: 1;
	min-width: 0;
	word-break: break-word;
	color: var(--text-h);
}

.toast-close {
	flex-shrink: 0;
	border: none;
	background: transparent;
	font-size: 1.2rem;
	line-height: 1;
	color: var(--muted);
	cursor: pointer;

	&:hover {
		color: var(--text-h);
	}
}

/* 类型配色 */
.toast--success {
	border-color: var(--success-border);
	background: var(--success-bg);

	.toast-icon {
		background: var(--success);
	}
}

.toast--error {
	border-color: var(--danger-border);
	background: var(--danger-bg);

	.toast-icon {
		background: var(--danger);
	}
}

.toast--info {
	border-color: var(--info-border);
	background: var(--info-bg);

	.toast-icon {
		background: var(--info);
	}
}

/* 进出动画 */
.toast-enter-active,
.toast-leave-active {
	transition:
		opacity 200ms ease,
		transform 200ms ease;
}

.toast-enter-from,
.toast-leave-to {
	opacity: 0;
	transform: translateY(-10px);
}

.toast-move {
	transition: transform 200ms ease;
}
</style>
