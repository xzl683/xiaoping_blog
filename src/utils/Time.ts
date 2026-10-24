import type { TimeData } from '@/types';

export class Time {
	public year: number;
	public month: number;
	public day: number;
	
	// 传入已持久化的时间数据则复用，否则取当前时间
	constructor(data?: Partial<TimeData>) {
		const current = this.getCurrentTime();
		this.year  = data?.year  ?? current.year;
		this.month = data?.month ?? current.month;
		this.day   = data?.day	 ?? current.day;
	}

	public getCurrentTime() {
		const date = new Date();
		return {
			year   : date.getFullYear(),
			month  : date.getMonth() + 1,
			day	: date.getDate()
		};
	}

	/** 补零的 YYYY-MM-DD，可直接用于 <time datetime> */
	public toISODateString() {
		const pad = (n: number) => String(n).padStart(2, '0');
		return `${this.year}-${pad(this.month)}-${pad(this.day)}` as const;
	}

	public toChineseDateString() {
		return `${this.year}年${this.month}月${this.day}日` as const;
	}
}