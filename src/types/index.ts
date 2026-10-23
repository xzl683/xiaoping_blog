import type { Time } from "../utils/Time";

export interface IArticle {
	id: string;
	title: string;
	summary?: string;
	author: string;
	content: string;
	tags: string[];
	createTime: Time;
}

