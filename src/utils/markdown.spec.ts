import { describe, expect, it } from 'vitest';
import { isMarkdown, renderContent } from './markdown';

describe('isMarkdown', () => {
	it('识别常见 Markdown 特征', () => {
		expect(isMarkdown('# 标题')).toBe(true);
		expect(isMarkdown('- 第一项\n- 第二项')).toBe(true);
		expect(isMarkdown('**加粗**')).toBe(true);
		expect(isMarkdown('> 引用')).toBe(true);
	});

	it('普通多行文本不视为 Markdown', () => {
		expect(isMarkdown('这是一段普通文本\n第二行仍然普通')).toBe(false);
	});
});

describe('renderContent', () => {
	it('空内容返回空字符串', () => {
		expect(renderContent('   ')).toBe('');
	});

	it('纯文本按空行分段、段内换行转为 br，并转义 HTML', () => {
		const html = renderContent('第一段\n换行\n\n第二段 <script>alert(1)</script>');

		expect(html).toContain('<p>');
		expect(html).toContain('<br>');
		expect(html).not.toContain('<script>');
	});

	it('Markdown 正常渲染，同时移除事件属性等危险内容', () => {
		const html = renderContent('# 标题\n\n<img src="x" onerror="alert(1)">');

		expect(html).toContain('<h1');
		expect(html).not.toContain('onerror');
	});
});
