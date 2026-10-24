import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const STORAGE_KEY = 'xzl-blog-storage';

const seed = [
	{
		id: '1',
		title: 'Vue 深入',
		author: 'a',
		content: 'content',
		summary: 'summary',
		tags: ['vue'],
		createTime: { year: 2026, month: 1, day: 1 },
	},
	{
		id: '2',
		title: 'JS 基础',
		author: 'b',
		content: 'content',
		summary: 'summary',
		tags: ['js'],
		createTime: { year: 2026, month: 1, day: 2 },
	},
	{
		id: '3',
		title: 'Vue 与 JS',
		author: 'c',
		content: 'content',
		summary: 'summary',
		tags: ['vue', 'js'],
		createTime: { year: 2026, month: 1, day: 3 },
	},
];

async function mountSearch() {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
	vi.resetModules();

	const { default: Search } = await import('./Search.vue');
	const router = createRouter({
		history: createMemoryHistory(),
		routes: [
			{ path: '/', name: 'home', component: { template: '<div />' } },
			{ path: '/article/:slug', name: 'article', component: { template: '<div />' } },
		],
	});

	const wrapper = mount(Search, {
		global: {
			plugins: [router],
			// 只渲染弹窗内容，避免依赖原生 <dialog>
			stubs: {
				BaseModal: { template: '<div><slot /></div>' },
			},
		},
	});
	await nextTick();

	return wrapper;
}

function tagChip(wrapper: Awaited<ReturnType<typeof mountSearch>>, label: string) {
	const chip = wrapper.findAll('.tag-chip').find(item => item.text() === label);
	if (!chip) throw new Error(`未找到标签 chip: ${label}`);
	return chip;
}

describe('Search 标签筛选', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('默认 idle 不展示结果，标签 all 与普通标签互斥，多个普通标签按 OR 合并', async () => {
		const wrapper = await mountSearch();

		expect(wrapper.findAll('.result-item')).toHaveLength(0);

		await tagChip(wrapper, 'vue').trigger('click');
		await nextTick();
		expect(wrapper.findAll('.result-item')).toHaveLength(2);
		expect(tagChip(wrapper, '全部').attributes('aria-pressed')).toBe('false');

		await tagChip(wrapper, 'js').trigger('click');
		await nextTick();
		expect(wrapper.findAll('.result-item')).toHaveLength(3);

		await tagChip(wrapper, '全部').trigger('click');
		await nextTick();
		// 回到 all 且无关键词时属于 idle 状态，不展示结果
		expect(wrapper.findAll('.result-item')).toHaveLength(0);
		expect(tagChip(wrapper, '全部').attributes('aria-pressed')).toBe('true');
		expect(tagChip(wrapper, 'vue').attributes('aria-pressed')).toBe('false');
	});
});
