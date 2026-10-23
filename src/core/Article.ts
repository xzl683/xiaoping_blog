import type { IArticle } from "@/types";
import { Time } from "@/utils/Time";

const maxSummaryLength = 100; // char

export type InputArticleData = Omit<IArticle, 'id' | 'createTime'>;

export default class Article implements IArticle {
	id: string;
	title: string;
	summary: string;
	author: string;
	content: string;
	tags: string[];
	createTime: Time;

	static getSummary(article: Article) {
		const { content } = article;
		if(content.length <= maxSummaryLength) return content;
		let endIndex = content.indexOf('。');
		if(endIndex > maxSummaryLength) {
			endIndex = content.indexOf('，');
			return content.slice(0, endIndex != -1 ? endIndex : maxSummaryLength) + '...';
		}
		return content.slice(0, endIndex + 1);
	}

	constructor(data: InputArticleData) {
		this.id = crypto.randomUUID();
		this.title = data.title;
		this.content = data.content;
		this.summary = data.summary || Article.getSummary(this);
		this.author = data.author;
		this.tags = data.tags;
		this.createTime = new Time();
	}
	public getUrl() {
		return this.id;
	}
}