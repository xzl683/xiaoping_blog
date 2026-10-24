import { useArticleStore } from "@/stores/articles"

export function fetchArticle(id: string) {
    const { articles } = useArticleStore();
    return articles.value.find(art => art.id === id) || null;
}
