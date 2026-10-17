import Article from "../core/Article";
import type { IArticle } from "../types";
import { Time } from "../utils/Time";

const articleData: IArticle[] = [
	{
		id: '1',
		title: 'hello world',
		content: 'print hello world',
		author: 'xzl',
		tag: 'python',
		createTime: new Time()
	}, {
		id: '2',
		title: 'hello world',
		content: '2 blog',
		author: 'xzl',
		tag: 'code',
		createTime: new Time()
	}, {
		id: '3',
		title: 'hello world',
		content: '3 blog',
		author: 'xzl',
		tag: 'post',
		createTime: new Time()
	}, {
		id: '4',
		title: 'hello world',
		content: '4 blog',
		author: 'xzl',
		tag: 'code',
		createTime: new Time()
	}, {
		id: '5',
		title: 'hello world',
		content: '5 blog',
		author: 'xzl',
		tag: 'code',
		createTime: new Time()
	}
];

export const articles = articleData.map(a => new Article(a));

