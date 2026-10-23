import { useArticleStore } from '@/composables/useArticlesStore';

const { articles } = useArticleStore();

interface SearchCondition {
	title: string;
	tag: string;
}

function search(cond: SearchCondition) {
	const art = articles.value.filter(art => {
		art.title.includes(cond.title) &&
		art.tag == cond.tag
	});
	return art;
}