import type { InputArticleData } from "@/types";

import a1 from './a1.txt';
import a2 from './a2.txt';
import a3 from './a3.txt';
import a4 from './a4.txt';
import a5 from './a5.txt';

const fetchText = (path: string) => fetch(path).then(res => res.text());

export const articleData: InputArticleData[] = [
	{
		title: 'c链表',
		content: await fetchText(a1),
		author: 'xzl',
		tags: ['c', 'code', 'study'],
	}, {
		title: 'cookie',
		content: await fetchText(a2),
		author: 'xzl',
		tags: ['code', 'web', 'study'],
	}, {
		title: '小平前端考核',
		content: await fetchText(a3),
		author: '小平工作室',
		tags: ['doc', 'web'],
	}, {
		title: '链表 · 栈 · 队列',
		content: await fetchText(a4),
        author: 'xzl',
		tags: ['acm', 'study'],
	}, {
		title: '老外爱上“垒长城” 中国麻将在美国爆火：一套300美元起供不应求',
		content: await fetchText(a5),
		author: 'xzl',
		tags: ['news'],
	},
	// {
	// 	title: 'hello world',
	// 	content: '6 blog',
	// 	author: 'xzl',
	// 	tags: ['code'],
	// }
];
