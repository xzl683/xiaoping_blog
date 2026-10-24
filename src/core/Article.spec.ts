import { describe, expect, it } from 'vitest';
import Article from './Article';

const base = {
	title: '标题',
	author: '作者',
	content: '',
	tags: [],
};

describe('Article.getSummary', () => {
	it('短正文直接作为摘要', () => {
		const article = new Article({ ...base, content: '一段简短的正文' });
		expect(article.summary).toBe('一段简短的正文');
	});

	it('超长正文在最早出现的句末标点处截断', () => {
		const article = new Article({ ...base, content: `abcde.${'x'.repeat(200)}` });
		expect(article.summary).toBe('abcde....');
	});

	it('没有句末标点时按最大长度截断', () => {
		const article = new Article({ ...base, content: 'x'.repeat(200) });
		expect(article.summary).toBe(`${'x'.repeat(Article.maxSummaryLength)}...`);
	});

	it('显式传入摘要时优先使用', () => {
		const article = new Article({ ...base, content: '正文', summary: '自定义摘要' });
		expect(article.summary).toBe('自定义摘要');
	});
});

describe('Article 序列化', () => {
	it('toJSON 返回纯对象，createTime 不是字符串', () => {
		const article = new Article({
			...base,
			content: '正文',
			createTime: { year: 2024, month: 3, day: 5 },
		});

		const data = article.toJSON();
		expect(data.createTime).toEqual({ year: 2024, month: 3, day: 5 });
		expect(typeof data.createTime).not.toBe('string');
	});
});
