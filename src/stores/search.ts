import { ref } from 'vue';

// 定义在模块顶层：整个应用共享同一个实例
const isOpen = ref(false);

export function useSearch() {
	return {
		isOpen,
		open: () => {
			isOpen.value = true;
		},
		close: () => {
			isOpen.value = false;
		}
	};
}
