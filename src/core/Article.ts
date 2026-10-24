import type { IArticle, InputArticleData } from "@/types";
import { Time } from "@/utils/Time";

const endChars = ['.', '。', '，', ',', '\n'] as const;

export default class Article implements IArticle {
	static readonly maxSummaryLength = 100; // char

	public id: string;
	public title: string;
	public summary: string;
	public author: string;
	public content: string;
	public tags: string[];
	public createTime: Time;

	static getSummary(article: Article) {
		const maxLen = Article.maxSummaryLength;
		const { content } = article;
		if(content.length <= maxLen) return content;

		let endIndex = -1;
		for(const c of endChars) {
			const index = content.indexOf(c);
			if(index !== -1) {
				endIndex = index;
				break;
			}
		}
		return content.slice(0, endIndex === -1 ? maxLen : Math.min(endIndex + 1, maxLen)) + '...';
	}

	constructor(data: InputArticleData) {
		this.id = data.id ?? crypto.randomUUID();
		this.title = data.title;
		this.content = data.content;
		this.summary = data.summary || Article.getSummary(this);
		this.author = data.author;
		this.tags = data.tags;
		this.createTime = new Time(data.createTime);
	}

	/** 返回可序列化的普通对象（由调用方统一做 JSON.stringify） */
	public toJSON(): InputArticleData {
		return {
			id: this.id,
			title: this.title,
			summary: this.summary,
			content: this.content,
			author: this.author,
			tags: this.tags,
			createTime: {
				year: this.createTime.year,
				month: this.createTime.month,
				day: this.createTime.day
			},
		};
	}
}
