import type { IArticle } from "../types";
import type { Time } from "../utils/Time";

const summaryLength = 30; // char

export default class Article implements IArticle {
	id: string;
	title: string;
	summary: string;
	author: string;
	content: string;
	tag: string;
	createTime: Time;

	constructor(data: IArticle) {
		this.id = data.id;
		this.title = data.title;
		this.content = data.content;
		this.summary = data.summary || this.getSummary();
		this.author = data.author;
		this.tag = data.tag;
		this.createTime = data.createTime;
	}

	private getSummary() {
		return this.content.slice(0, summaryLength);
	}

	public getUrl() {
		return this.id;
	}
}