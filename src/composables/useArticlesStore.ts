import { ref, type Ref } from "vue";
import { storage } from "@/utils/storage";
import Article, { type InputArticleData } from "@/core/Article";

export const useArticleStore = () => {
    const articles: Ref<Article[]> = ref(storage.get());

    function addArticle(data: InputArticleData) {
        const article = new Article(data);
        articles.value.push(article);
    }

    return {
        articles,
        addArticle
    };
};
