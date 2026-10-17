import Article from "../core/Article";
import { articles as initAritcles } from "../mock/init_articles";
import type { IArticle } from "../types";

const storageKey = 'xzl-blog-storage' as const;

export const storage = {
	get() {
		const json = localStorage.getItem(storageKey);
		let articleData: IArticle[];
		if(json === null) {
			articleData = initAritcles;
		} else
		try {
			articleData = JSON.parse(json) as IArticle[];
		} catch(e) {
			articleData = initAritcles;
		}
		return articleData.map(ad => new Article(ad));
    },
	set(value: IArticle[]) {
		const blogJson = JSON.stringify(value);
		localStorage.setItem(storageKey, blogJson);
	}
}