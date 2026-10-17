export class Time {
	public year: number;
	public month: number;
	public day: number;
	public hours: number;
	public minutes: number;
	public seconds: number;

	constructor() {
		const { year, month, day, hours, minutes, seconds } = this.getCurrentTime();
		this.year	= year;
		this.month   = month;
		this.day	 = day;
		this.hours   = hours;
		this.minutes = minutes;
		this.seconds = seconds;
	}

	public getCurrentTime() {
		const date = new Date();
		return {
			year   : date.getFullYear(),
			month  : date.getMonth() + 1,
			day	: date.getDate(),
			hours  : date.getHours(),
			minutes: date.getMinutes(),
			seconds: date.getSeconds()
		};
	}

	public toLocaleDateString() {
		return `${this.year}-${this.month}-${this.day}` as const;
	}

	public toChineseDateString() {
		return `${this.year}年${this.month}月${this.day}日` as const;
	}
}