import { readonly, ref } from 'vue';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
	id: number;
	type: ToastType;
	message: string;
	/** 毫秒，0 表示不自动关闭 */
	duration: number;
}

const toasts = ref<Toast[]>([]);
/** 每个 toast 的自动关闭定时器，提前移除时一并清理 */
const timers = new Map<number, ReturnType<typeof setTimeout>>();
let seed = 0;

function clearTimer(id: number) {
	const timer = timers.get(id);
	if (timer === undefined) return;

	clearTimeout(timer);
	timers.delete(id);
}

function remove(id: number) {
	clearTimer(id);

	const idx = toasts.value.findIndex(t => t.id === id);
	if (idx !== -1) toasts.value.splice(idx, 1);
}

function push(type: ToastType, message: string, duration = 3000) {
	const id = ++seed;
	toasts.value.push({ id, type, message, duration });

	if (duration > 0) {
		timers.set(id, setTimeout(() => remove(id), duration));
	}

	// 最多同时显示 4 条，超出移除最早的
	if (toasts.value.length > 4) {
		const overflow = toasts.value.splice(0, toasts.value.length - 4);
		overflow.forEach(t => clearTimer(t.id));
	}

	return id;
}

export function useToast() {
	return {
		toasts: readonly(toasts),
		remove,
		success: (msg: string, duration?: number) => push('success', msg, duration),
		error: (msg: string, duration?: number) => push('error', msg, duration),
		info: (msg: string, duration?: number) => push('info', msg, duration)
	};
}
