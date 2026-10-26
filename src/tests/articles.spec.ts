import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { InputArticleData } from '@/types';

const STORAGE_KEY = 'xzl-blog-storage';

const sample = (title: string): InputArticleData => ({
	title,
	author: 'tester',
	content: `${title} 的正文`,
	tags: ['test'],
});

/** store 是模块级单例，每个用例前重置模块以隔离 initialized 状态 */
async function loadStore() {
	vi.resetModules();
	const { useArticleStore } = await import('../stores/articles');
	return useArticleStore();
}

describe('useArticleStore', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('无存档时用示例文章初始化，并写入 localStorage', async () => {
		const store = await loadStore();

		expect(store.articles.value.length).toBeGreaterThan(0);
		expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toBeInstanceOf(Array);
	});

	it('新增、更新、删除都会同步持久化', async () => {
		const store = await loadStore();
		const before = store.articles.value.length;

		store.addArticle(sample('新文章'));
		expect(store.articles.value.length).toBe(before + 1);

		const created = store.articles.value[0];
		expect(created.title).toBe('新文章');

		store.updateArticle(created, sample('改名文章'));
		const updated = store.articles.value[0];
		expect(updated.title).toBe('改名文章');
		expect(updated.id).toBe(created.id);
		expect(updated.createTime.toISODateString()).toBe(created.createTime.toISODateString());

		store.deleteArticle(created.id);
		expect(store.articles.value.some(article => article.id === created.id)).toBe(false);

		const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)!) as Array<{ id: string }>;
		expect(saved.some(item => item.id === created.id)).toBe(false);
	});
});
