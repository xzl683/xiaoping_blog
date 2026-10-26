<script setup lang="ts">
import { computed, nextTick, ref, useTemplateRef } from 'vue';
import { ALL_TAG_SYMBOL } from '@/config'
import BaseModal from '@/components/BaseModal.vue';
import { useArticleStore } from '@/stores/articles';
import type Article from '@/core/Article';
import { useSearch } from '@/stores/search';
import { highlight } from '@/utils/highlightKeyWord';

const { isOpen, close } = useSearch();
const { articles, tags: existingTags } = useArticleStore();

const inputRef = useTemplateRef<HTMLInputElement>('inputRef');
	
const keyword = ref('');
const selectedTags = ref<string[]>([ALL_TAG_SYMBOL]);

const allTags = computed(() => [ALL_TAG_SYMBOL].concat(existingTags.value));
const isAllSelected = computed(() => !!selectedTags.value.find(tag => tag === ALL_TAG_SYMBOL));
const isIdle = computed(() => !keyword.value.trim() && isAllSelected.value);

/* ---------- 点击标签：all 互斥，非 all 多选 ---------- */
function toggleTag(t: string) {
	if (t === ALL_TAG_SYMBOL) {
		// 点 all：清空其他，只保留 all
		selectedTags.value = [ALL_TAG_SYMBOL];
		return;
	}

	// 点普通标签：先移除 all，再 toggle
	const list = selectedTags.value.filter(x => x !== ALL_TAG_SYMBOL);
	const idx = list.indexOf(t);

	if (idx === -1) list.push(t);
	else list.splice(idx, 1);

	// 全部取消后回退到 all
	selectedTags.value = list.length > 0 ? list : [ALL_TAG_SYMBOL];
}


/* ---------- 搜索结果 ---------- */
const resultArt = computed<Article[]>(() => {
	if (isIdle.value) return [];

	const kw = keyword.value.trim().toLowerCase();

	return articles.value.filter(art =>
		(!kw || art.title.toLowerCase().includes(kw)) &&
		(
			isAllSelected.value ||
			art.tags.some(t => selectedTags.value.includes(t))
		)
	);
});

/** 结果项 + 标题高亮片段 */
const highlightedResults = computed(() =>
	resultArt.value.map(article => ({
		article,
		titleSegments: highlight(keyword.value.trim(), article.title),
	})),
);

async function focusInput() {
	await nextTick();
	inputRef.value?.focus();
}
</script>

<template>
	<BaseModal
		id="search-dialog"
		v-model:open="isOpen"
		title="搜索文章"
		header-close
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
					:class="{ active: selectedTags.includes(t) }"
					:aria-pressed="selectedTags.includes(t)"
					@click="toggleTag(t)"
				>
					{{ t === ALL_TAG_SYMBOL ? '全部' : t }}
				</button>
			</div>

			<!-- 结果区 -->
			<div class="result">
				<div v-if="resultArt.length === 0" class="empty">
					<p>{{ isIdle ? '输入关键词或选择标签开始搜索' : '未找到相关文章' }}</p>
				</div>

				<template v-else>
					<RouterLink
						v-for="result in highlightedResults"
						:key="result.article.id"
						class="result-item"
						:to="{ name: 'article', params: { slug: result.article.id } }"
						@click="close"
					>
						<header>
							<span class="title">
								<template v-for="(seg, i) in result.titleSegments" :key="i">
									<mark v-if="seg.match">{{ seg.text }}</mark>
									<template v-else>{{ seg.text }}</template>
								</template>
							</span>
							<span class="author">{{ result.article.author }}</span>
							<time :datetime="result.article.createTime.toISODateString()">
								{{ result.article.createTime.toChineseDateString() }}
							</time>
						</header>

						<p class="summary">{{ result.article.summary }}</p>

						<div v-if="result.article.tags?.length" class="tags">
							<span
								v-for="t in result.article.tags"
								:key="t"
								class="tag"
								:class="{ 'tag--match': selectedTags.includes(t) }"
							>
								{{ t }}
							</span>
						</div>
					</RouterLink>
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
	border-bottom: 1px solid var(--divider);

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
			color: var(--muted);
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
	border-bottom: 1px solid var(--divider);

	&::-webkit-scrollbar {
		width: 6px;
	}

	&::-webkit-scrollbar-thumb {
		background: var(--border);
		border-radius: 10px;
	}
}

.tag-chip {
	padding: 2px 10px;
	border: 1px solid var(--border);
	border-radius: var(--radius-pill);
	background: var(--surface);
	color: var(--text);
	font-size: 0.8rem;
	line-height: 1.6;
	cursor: pointer;
	transition:
		background-color 120ms ease,
		border-color 120ms ease,
		color 120ms ease;

	&:hover {
		border-color: var(--accent-border);
		background: var(--surface-2);
	}

	&:focus-visible {
		outline: 2px solid var(--accent-border);
		outline-offset: 1px;
	}

	&.active {
		border-color: var(--accent-border);
		background: var(--accent-bg);
		color: var(--accent);
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
		background: var(--border);
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
	color: var(--muted);
	font-size: 0.9rem;
}

/* ---------- 结果项 ---------- */
.result-item {
	display: block;
	margin-bottom: 4px;
	padding: 10px 12px;
	border: 1px solid transparent;
	border-radius: var(--radius-md);
	color: inherit;
	text-decoration: none;
	cursor: pointer;
	transition:
		background-color 120ms ease,
		border-color 120ms ease;

	&:hover,
	&:focus-visible {
		background-color: var(--accent-bg);
		border-color: var(--accent-border);
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
			color: var(--warning);
			font-weight: 700;
		}
	}

	.author {
		flex-shrink: 0;
		font-size: 0.8rem;
		color: var(--muted);
	}

	time {
		flex-shrink: 0;
		font-size: 0.8rem;
		color: var(--muted);
	}

	.summary {
		margin: 0;
		font-size: 0.85rem;
		color: var(--text);
		display: -webkit-box;
		line-clamp: 2;
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
		border-radius: var(--radius-pill);
		background: var(--surface-2);
		color: var(--text);
		font-size: 0.75rem;
		transition:
			background-color 120ms ease,
			color 120ms ease;

		/* 命中当前筛选的标签 */
		&--match {
			background: var(--warning-bg);
			color: var(--warning);
			font-weight: 600;
		}
	}
}
</style>
