import { ref } from "vue";
import { useArticleStore } from "@/stores/articles";
import { useToast } from "@/stores/toast";
import type Article from "@/core/Article";

export const useDeleteArticle = () => {
	const { deleteArticle } = useArticleStore();
	const toast = useToast();

	const isOpen = ref(false);
	const deleteId = ref<string | null>(null);

	function open(article: Article) {
		deleteId.value = article.id;
		isOpen.value = true;
	}

	function close() {
		isOpen.value = false;
		deleteId.value = null;
	}

	function confirm() {
		if (!deleteId.value) return;

		deleteArticle(deleteId.value);
		toast.success('删除成功');
		isOpen.value = false;
		deleteId.value = null;
	}

	return {
		isOpen,
		open,
		close,
		confirm
	}
}
