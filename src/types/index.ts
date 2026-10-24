/** 时间数据的纯结构，与具体 Time 类解耦，供类型层和持久化复用 */
export interface TimeData {
	year: number;
	month: number;
	day: number;
}

export interface IArticle {
	id: string;
	title: string;
	summary: string;
	author: string;
	content: string;
	tags: string[];
	createTime: TimeData;
}

// id / createTime / summary 可选：新建时自动生成或补全，反序列化时复用已持久化的值
export type InputArticleData = Omit<IArticle, 'id' | 'createTime' | 'summary'> & {
	id?: string;
	createTime?: Partial<TimeData>;
	summary?: string;
};
