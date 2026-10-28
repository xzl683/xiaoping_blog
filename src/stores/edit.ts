import { shallowRef } from "vue";
import type Article from "@/core/Article";

const editing = shallowRef<Article | null>(null);

export function useEditArticle() {
	return {
		editing,
		open : (article: Article) => editing.value = article,
		close: () => editing.value = null,
	};
};
