import { config } from "@/config";
import type { IArticle, InputArticleData } from "@/types";
import { Time } from "@/utils/Time";

const endChars = ['.', '。', '，', ',', '\n'] as const;

export default class Article implements IArticle {
	public id: string;
	public title: string;
	public summary: string;
	public author: string;
	public content: string;
	public tags: string[];
	public createTime: Time;

	static getSummary(article: Article) {
		const maxLen = config.summaryLen;
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
		return content.slice(0, endIndex === -1 ? maxLen : Math.min(endIndex, maxLen)) + '...';
	}

	constructor(data: InputArticleData) {
		this.id      = data.id ?? crypto.randomUUID();
		this.title   = data.title;
		this.content = data.content;
		this.summary = data.summary || Article.getSummary(this);
		this.author  = data.author;
		this.tags    = data.tags;
		this.createTime = new Time(data.createTime);
	}

	public set(data: Partial<InputArticleData>) {
		data.title   && (this.title   = data.title);
		data.content && (this.content = data.content);
		data.summary && (this.summary = data.summary);
		data.author  && (this.author  = data.author);
		data.tags    && (this.tags    = data.tags);
	}

	public clone() {
		return {
			title: this.title,
			author: this.author,
			summary: this.summary,
			tags: [...this.tags],
			content: this.content,
		}
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
