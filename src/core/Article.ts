import { config } from "@/config";
import type { IArticle, InputArticleData } from "@/types";
import { Time } from "@/utils/Time";

const endChars = ['.', '。', '，', ',', '\n'] as const;
const maxLen = config.summaryLen - 3;

function getSummary(content: string) {
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

export default class Article implements IArticle {
	public id      : string;
	public title  !: string;
	public summary!: string;
	public content!: string;
	public author !: string;
	public tags   !: string[];
	public createTime: Time;

	constructor(data: InputArticleData) {
		this.id = data.id ?? crypto.randomUUID();
		this.set(data);
		this.createTime = new Time(data.createTime);
	}

	public set(data: InputArticleData) {
		this.title   = data.title;
		this.summary = data.summary || getSummary(data.content);
		this.content = data.content;
		this.author  = data.author;
		this.tags    = [...data.tags];
	}

	public clone() {
		return {
			title: this.title,
			summary: this.summary,
			content: this.content,
			author: this.author,
			tags: [...this.tags],
		}
	}

	/** 返回可序列化的普通对象（由调用方统一做 JSON.stringify） */
	public toJSON(): InputArticleData {
		return {
			id     : this.id,
			title  : this.title,
			summary: this.summary,
			content: this.content,
			author : this.author,
			tags   : this.tags,
			createTime: {
				year : this.createTime.year,
				month: this.createTime.month,
				day  : this.createTime.day
			},
		};
	}
}
