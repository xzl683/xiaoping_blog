import { computed, ref, type ComputedRef } from 'vue';
import type { InputArticleData } from '@/types';
import { storage } from '@/utils/storage';
import Article from '@/core/Article';
import { articleData as mockData } from '@/mock/mock_articles';

const articles = ref<Article[]>([]);
let initialized = false;

/** 首次访问时才读取 localStorage，避免模块导入阶段就依赖浏览器存储 */
function ensureLoaded() {
	if (initialized) return;
	initialized = true;

	const stored = storage.get();
	if (stored === null) {
		// 没有任何存档：写入示例文章
		articles.value = mockData.map(data => new Article(data));
		setStorage();
		return;
	}
	articles.value = stored;
}

function setStorage() {
	storage.set(articles.value);
}

function getExistingTags() {
	const set = new Set<string>();
	for (const art of articles.value)
		for (const t of art.tags) set.add(t);
	return Array.from(set);
}

/** 只读视图：外部只能读取，写操作统一走下方 actions */
const articlesView: ComputedRef<readonly Article[]> = computed(() => articles.value);

export const useArticleStore = () => {
	ensureLoaded();

	function addArticle(data: InputArticleData) {
		const article = new Article(data);
		articles.value.unshift(article);
		setStorage();
	}

	function deleteArticle(id: string) {
		articles.value = articles.value.filter(art => art.id !== id);
		setStorage();
	}

	function updateArticle(article: Article, data: InputArticleData) {
		article.set(data);
		setStorage();
	}

	return {
		articles: articlesView,
		addArticle,
		deleteArticle,
		updateArticle,
		setStorage,

		tags: computed(() => getExistingTags())
	};
};
