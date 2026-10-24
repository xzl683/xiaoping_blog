import { shallowRef } from "vue";
import type Article from "@/core/Article";

export const useEditArticle = () => {
	/** 当前正在编辑的文章，null 表示显示列表 */
	const editingArticle = shallowRef<Article | null>(null);

	function openEditor(article: Article) {
		editingArticle.value = article;
	}

	function closeEditor() {
		editingArticle.value = null;
	}

	return { editingArticle, openEditor, closeEditor };
};
