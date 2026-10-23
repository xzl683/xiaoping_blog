import { useArticleStore } from "@/composables/useArticlesStore"

const { articles } = useArticleStore();

export function fetchArticle(id: string) {
    return articles.value.find(art => art.id === id) || null;
}