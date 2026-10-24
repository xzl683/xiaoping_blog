import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it } from 'vitest';
import TagSelector from './TagSelector.vue';

function mountSelector() {
	const updates: string[][] = [];

	const wrapper = mount(TagSelector, {
		props: {
			modelValue: [],
			suggestions: ['vue'],
			'onUpdate:modelValue': (value: string[]) => updates.push(value),
		},
	});

	return { wrapper, updates };
}

describe('TagSelector', () => {
	it('空草稿点击外部会被丢弃，且不触发更新', async () => {
		const { wrapper, updates } = mountSelector();

		await wrapper.find('.tag-add-btn').trigger('click');

		const newTagButton = wrapper
			.findAll('.tag-menu-item')
			.find(item => item.text() === '新建标签');
		expect(newTagButton).toBeTruthy();

		await newTagButton!.trigger('click');
		await nextTick();

		expect(wrapper.find('.tag-chip--draft').exists()).toBe(true);

		document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }));
		await nextTick();

		expect(wrapper.find('.tag-chip--draft').exists()).toBe(false);
		expect(updates).toHaveLength(0);
	});

	it('输入内容后按回车会提交新标签', async () => {
		const { wrapper, updates } = mountSelector();

		await wrapper.find('.tag-add-btn').trigger('click');
		const newTagButton = wrapper
			.findAll('.tag-menu-item')
			.find(item => item.text() === '新建标签');
		await newTagButton!.trigger('click');
		await nextTick();

		const input = wrapper.find('.tag-chip--draft input');
		await input.setValue('新标签');
		await input.trigger('keydown.enter');

		expect(updates).toEqual([['新标签']]);
	});
});
