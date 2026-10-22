import { useArticlesStore } from "@/composables/useArticlesStore"

const { articles } = useArticlesStore();

export function fetchArticle(id: string) {
    return articles.value.find(art => art.id === id) || null;
}