import type { InputArticleData } from "@/types";

import a1 from './a1.txt';
import a2 from './a2.txt';
import a3 from './a3.txt';
import a4 from './a4.txt';

const fetchText = (path: string) => fetch(path).then(res => res.text());

export const articleData: InputArticleData[] = [
	{
		title: 'python linkedlist',
		content: await fetchText(a1),
		author: 'xzl',
		tags: ['python', 'code', 'study'],
	}, {
		title: 'hello world',
		content: await fetchText(a2),
		author: 'xzl',
		tags: ['code'],
	}, {
		title: '小平前端考核',
		content: await fetchText(a3),
		author: '小平工作室',
		tags: ['doc', 'web'],
	}, {
		title: '链表 · 栈 · 队列',
		content: await fetchText(a4),
        author: 'xzl',
		tags: ['hello'],
	}, {
		title: 'test',
		content: 'test',
		author: 'xzl',
		tags: ['code'],
	},
	// {
	// 	title: 'hello world',
	// 	content: '6 blog',
	// 	author: 'xzl',
	// 	tags: ['code'],
	// }
];
