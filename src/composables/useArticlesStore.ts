import { ref } from "vue";
import { storage } from "../utils/storage";

export const useArticlesStore = () => {
    const articles = ref(storage.get());

    return {
        articles
    }
};
