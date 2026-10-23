import type { IArticle } from "@/types";
import type { Time } from "@/utils/Time";

const maxSummaryLength = 100; // char

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
		if(endIndex > maxSummaryLength) endIndex = content.indexOf('，');
		if(endIndex == -1) endIndex = maxSummaryLength;
		return article.content.slice(0, Math.min(endIndex + 1, maxSummaryLength));
	}

	constructor(data: IArticle) {
		this.id = data.id;
		this.title = data.title;
		this.content = data.content;
		this.summary = data.summary || Article.getSummary(this);
		this.author = data.author;
		this.tags = data.tags;
		this.createTime = data.createTime;
	}
	public getUrl() {
		return this.id;
	}
}