export interface Segment {
	text: string;
	match: boolean;
}

export function highlight(keyword: string, text: string): Segment[] {
	if (!keyword) return [{ text, match: false }];

	const lowerText = text.toLowerCase();
	const lowerKw = keyword.toLowerCase();
	const segments: Segment[] = [];

	let start = 0;
	let idx = lowerText.indexOf(lowerKw);

	while (idx !== -1) {
		if (idx > start) segments.push({ text: text.slice(start, idx), match: false });
		segments.push({ text: text.slice(idx, idx + keyword.length), match: true });
		start = idx + keyword.length;
		idx = lowerText.indexOf(lowerKw, start);
	}

	if (start < text.length) segments.push({ text: text.slice(start), match: false });
	return segments;
}
