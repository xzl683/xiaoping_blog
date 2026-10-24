import DOMPurify from 'dompurify';
import { marked } from 'marked';

marked.setOptions({
	gfm: true,
	breaks: true,
});

/** 常见 Markdown 语法特征，命中任意一项即按 Markdown 渲染 */
const MARKDOWN_HINTS: RegExp[] = [
	/^\s{0,3}#{1,6}\s+\S/m, // 标题
	/^\s{0,3}>\s+\S/m, // 引用
	/^\s*([-*+]|\d+\.)\s+\S/m, // 列表
	/^\s*\|.*\|\s*$/m, // 表格
	/^\s*(```|~~~)/m, // 代码块
	/`[^`\n]+`/, // 行内代码
	/\*\*[^*\n]+\*\*/, // 加粗
	/__[^_\n]+__/,
	/!?\[[^\]\n]*\]\([^)\n]+\)/, // 链接 / 图片
	/^\s*(-{3,}|\*{3,}|_{3,})\s*$/m, // 分割线
];

export function isMarkdown(raw: string): boolean {
	return MARKDOWN_HINTS.some(re => re.test(raw));
}

function escapeHtml(text: string) {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

/** 自动识别纯文本 / Markdown 并返回安全的 HTML */
export function renderContent(raw: string): string {
	if (!raw.trim()) return '';

	// 纯文本：按空行分段，保留段内换行
	if (!isMarkdown(raw)) {
		const html = raw
			.split(/\n{2,}/)
			.map(block => `<p>${escapeHtml(block).replace(/\n/g, '<br>')}</p>`)
			.join('');

		return DOMPurify.sanitize(html);
	}

	return DOMPurify.sanitize(marked.parse(raw) as string);
}
