import Article from '../core/Article';
import type { InputArticleData } from '@/types';

const storageKey = 'xzl-blog-storage' as const;

export const storage = {
	/** 无存档返回 null；存档为空数组返回 []；解析失败按无存档处理 */
	get(): Article[] | null {
		const json = localStorage.getItem(storageKey);
		if(json === null) return null;

		try {
			const list: unknown = JSON.parse(json);
			if(!Array.isArray(list)) return null;
			// 存档是普通对象，需要还原成 Article 实例以保留日期格式化等方法
			return list
				.filter((item): item is InputArticleData => !!item && typeof item === 'object')
				.map(item => new Article(item));
		} catch {
			return null;
		}
	},
	set(articles: Article[]) {
		localStorage.setItem(storageKey, JSON.stringify(articles));
	},
}
