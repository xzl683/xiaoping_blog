<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseModal from '@/components/BaseModal.vue';
import { useArticleStore } from '@/composables/useArticlesStore';
import type Article from '@/core/Article';
import { useSearch } from '@/store/search';

const { isOpen } = useSearch();
const router = useRouter();
const { articles } = useArticleStore();

const keyword = ref('');
/** 多选标签，默认 ['all']；all 与其他标签互斥 */
const selectedTags = ref<string[]>(['all']);
const inputRef = ref<HTMLInputElement | null>(null);

/* ---------- 标签列表：从文章里动态收集 ---------- */
const allTags = computed(() => {
	const set = new Set<string>();
	for (const art of articles.value) {
		for (const t of art.tags ?? []) set.add(t);
	}
	return ['all', ...set];
});

/* ---------- 选中状态判断 ---------- */
function isAllSelected() {
	return selectedTags.value.includes('all');
}

function isTagChecked(t: string) {
	return selectedTags.value.includes(t);
}

/* ---------- 点击标签：all 互斥，非 all 多选 ---------- */
function toggleTag(t: string) {
	if (t === 'all') {
		// 点 all：清空其他，只保留 all
		selectedTags.value = ['all'];
		return;
	}

	// 点普通标签：先移除 all，再 toggle
	const list = selectedTags.value.filter(x => x !== 'all');
	const idx = list.indexOf(t);

	if (idx === -1) list.push(t);
	else list.splice(idx, 1);

	// 全部取消后回退到 all
	selectedTags.value = list.length > 0 ? list : ['all'];
}

/* ---------- 是否处于“还没开始搜”的状态 ---------- */
const isIdle = computed(() => !keyword.value.trim() && isAllSelected());

/* ---------- 搜索结果 ---------- */
const resultArt = computed<Article[]>(() => {
	if (isIdle.value) return [];

	const kw = keyword.value.trim().toLowerCase();
	const tags = selectedTags.value;
	const all = isAllSelected();

	return articles.value.filter(art => {
		const matchKeyword = !kw || art.title.toLowerCase().includes(kw);

		const artTags = art.tags ?? [];
		// OR 逻辑：文章命中任意一个选中标签即可
		const matchTag = all || artTags.some(t => tags.includes(t));

		return matchKeyword && matchTag;
	});
});

/* ---------- 打开时聚焦搜索框 ---------- */
async function focusInput() {
	await nextTick();
	inputRef.value?.focus();
}

/* ---------- 跳转并关闭 ---------- */
function goToArticle(article: Article) {
	isOpen.value = false;
	router.push({ name: 'article', params: { slug: article.id } });
}

/* ---------- 标题关键词高亮 ---------- */
interface Segment {
	text: string;
	match: boolean;
}

function highlight(text: string): Segment[] {
	const kw = keyword.value.trim();
	if (!kw) return [{ text, match: false }];

	const lowerText = text.toLowerCase();
	const lowerKw = kw.toLowerCase();
	const segments: Segment[] = [];

	let start = 0;
	let idx = lowerText.indexOf(lowerKw);

	while (idx !== -1) {
		if (idx > start) segments.push({ text: text.slice(start, idx), match: false });
		segments.push({ text: text.slice(idx, idx + kw.length), match: true });
		start = idx + kw.length;
		idx = lowerText.indexOf(lowerKw, start);
	}

	if (start < text.length) segments.push({ text: text.slice(start), match: false });
	return segments;
}

/* ---------- 文章标签是否命中当前筛选 ---------- */
function isTagMatched(t: string) {
	return !isAllSelected() && selectedTags.value.includes(t);
}
</script>

<template>
	<BaseModal
		v-model:open="isOpen"
		title="搜索文章"
		:style="{ width: 'min(92vw, 640px)' }"
		@opened="focusInput()"
	>
		<div class="search-panel">
			<!-- 搜索栏 -->
			<div class="search-bar">
				<img
					class="search-icon"
					src="/src/assets/images/search-icon.svg"
					alt=""
					aria-hidden="true"
				/>

				<input
					ref="inputRef"
					v-model="keyword"
					type="search"
					placeholder="搜索文章标题…"
					autocomplete="off"
				/>
			</div>

			<!-- 标签多选 -->
			<div class="tag-bar" role="group" aria-label="按标签筛选">
				<button
					v-for="t in allTags"
					:key="t"
					type="button"
					class="tag-chip"
					:class="{ active: isTagChecked(t) }"
					:aria-pressed="isTagChecked(t)"
					@click="toggleTag(t)"
				>
					{{ t === 'all' ? '全部' : t }}
				</button>
			</div>

			<!-- 结果区 -->
			<div class="result">
				<div v-if="resultArt.length === 0" class="empty">
					<p>{{ isIdle ? '输入关键词或选择标签开始搜索' : '未找到相关文章' }}</p>
				</div>

				<template v-else>
					<article
						v-for="article in resultArt"
						:key="article.id"
						class="result-item"
						role="link"
						tabindex="0"
						@click="goToArticle(article)"
						@keydown.enter="goToArticle(article)"
					>
						<header>
							<span class="title">
								<template v-for="(seg, i) in highlight(article.title)" :key="i">
									<mark v-if="seg.match">{{ seg.text }}</mark>
									<template v-else>{{ seg.text }}</template>
								</template>
							</span>
							<span class="author">{{ article.author }}</span>
							<time :datetime="article.createTime.toLocaleDateString()">
								{{ article.createTime.toChineseDateString() }}
							</time>
						</header>

						<p class="summary">{{ article.summary }}</p>

						<div v-if="article.tags?.length" class="tags">
							<span
								v-for="t in article.tags"
								:key="t"
								class="tag"
								:class="{ 'tag--match': isTagMatched(t) }"
							>
								{{ t }}
							</span>
						</div>
					</article>
				</template>
			</div>
		</div>
	</BaseModal>
</template>

<style scoped lang="less">
.search-panel {
	display: flex;
	flex-direction: column;
	height: min(60vh, 480px);
}

/* ---------- 搜索栏 ---------- */
.search-bar {
	display: flex;
	align-items: center;
	gap: 12px;
	flex-shrink: 0;
	padding: 4px 6px;
	border-bottom: 1px solid #eee;

	.search-icon {
		flex-shrink: 0;
		margin-left: 3px;
		width: 20px;
		height: 20px;
		opacity: 0.5;
	}

	input {
		flex: 1;
		min-width: 0;
		padding: 8px 0;
		border: none;
		outline: none;
		background: transparent;
		font-size: 1rem;

		&::placeholder {
			color: #aaa;
		}
	}
}

/* ---------- 标签多选 ---------- */
.tag-bar {
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
	flex-shrink: 0;
	max-height: 96px;
	overflow-y: auto;
	padding: 8px 6px;
	margin-bottom: 4px;
	border-bottom: 1px solid #eee;

	&::-webkit-scrollbar {
		width: 6px;
	}

	&::-webkit-scrollbar-thumb {
		background: #e0e0e0;
		border-radius: 10px;
	}
}

.tag-chip {
	padding: 2px 10px;
	border: 1px solid #ddd;
	border-radius: 999px;
	background: #fff;
	color: #5a6b82;
	font-size: 0.8rem;
	line-height: 1.6;
	cursor: pointer;
	transition:
		background-color 120ms ease,
		border-color 120ms ease,
		color 120ms ease;

	&:hover {
		border-color: #b9c6d6;
		background: #f7f9fc;
	}

	&:focus-visible {
		outline: 2px solid var(--accent-border, #4a90e2);
		outline-offset: 1px;
	}

	&.active {
		border-color: var(--accent-border, #4a90e2);
		background: var(--accent-bg, #eaf2ff);
		color: var(--accent-text, #1d4ed8);
		font-weight: 600;
	}
}

/* ---------- 结果区 ---------- */
.result {
	flex: 1;
	min-height: 0;
	overflow-y: auto;
	padding: 0 4px;

	&::-webkit-scrollbar {
		width: 8px;
	}

	&::-webkit-scrollbar-thumb {
		background: #d4d4d4;
		border-radius: 10px;
	}

	&::-webkit-scrollbar-track {
		background: transparent;
	}
}

.empty {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	color: #999;
	font-size: 0.9rem;
}

/* ---------- 结果项 ---------- */
.result-item {
	margin-bottom: 4px;
	padding: 10px 12px;
	border: 1px solid transparent;
	border-radius: 8px;
	cursor: pointer;
	transition:
		background-color 120ms ease,
		border-color 120ms ease;

	&:hover,
	&:focus-visible {
		background-color: var(--accent-bg, #f5f8ff);
		border-color: var(--accent-border, #d6e4ff);
		outline: none;
	}

	> header {
		display: flex;
		align-items: baseline;
		gap: 12px;
	}

	.title {
		flex: 1;
		min-width: 0;
		font-weight: 600;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

		mark {
			background: transparent;
			color: #d97706;
			font-weight: 700;
		}
	}

	.author {
		flex-shrink: 0;
		font-size: 0.8rem;
		color: #888;
	}

	time {
		flex-shrink: 0;
		font-size: 0.8rem;
		color: #aaa;
	}

	.summary {
		margin: 0;
		font-size: 0.85rem;
		color: #707070;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-top: 6px;
	}

	.tag {
		padding: 1px 8px;
		border-radius: 999px;
		background: #eef2f7;
		color: #5a6b82;
		font-size: 0.75rem;
		transition:
			background-color 120ms ease,
			color 120ms ease;

		/* 命中当前筛选的标签 */
		&--match {
			background: #fff3cd;
			color: #b45309;
			font-weight: 600;
		}
	}
}
</style>
