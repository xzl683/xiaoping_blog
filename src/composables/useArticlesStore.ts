import { ref, type Ref } from "vue";
import { storage } from "@/utils/storage";
import type Article from "@/core/Article";

export const useArticlesStore = () => {
    const articles: Ref<Article[]> = ref(storage.get());

    return {
        articles
    }
};
