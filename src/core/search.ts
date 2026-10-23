import { useArticleStore } from '@/composables/useArticlesStore';

const { articles } = useArticleStore();

interface SearchCondition {
	title: string;
	tag: string;
}

export function search(cond: SearchCondition) {
	return articles.value.filter(art =>
		art.title.includes(cond.title) &&
		art.tags?.includes(cond.tag)
	);
}