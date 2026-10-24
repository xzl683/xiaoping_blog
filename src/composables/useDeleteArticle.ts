import { ref } from "vue";
import { useArticleStore } from "@/stores/articles";
import { useToast } from "@/stores/toast";
import type Article from "@/core/Article";

export const useDeleteArticle = () => {
	const { deleteArticle } = useArticleStore();
	const toast = useToast();

	const dialogOpen = ref(false);
	const deleteId = ref<string | null>(null);

	function openDialog(article: Article) {
		deleteId.value = article.id;
		dialogOpen.value = true;
	}

	function close() {
		dialogOpen.value = false;
		deleteId.value = null;
	}

	function confirm() {
		if (!deleteId.value) return;

		deleteArticle(deleteId.value);
		toast.success('删除成功');
		dialogOpen.value = false;
		deleteId.value = null;
	}

	return {
		dialogOpen,
		openDialog,
		close,
		confirm
	}
}
