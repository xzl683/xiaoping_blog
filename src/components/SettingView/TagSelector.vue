<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';

const modelValue = defineModel<string[]>({ required: true });

const props = defineProps<{
	suggestions: string[];
}>();

const root = ref<HTMLElement | null>(null);
const draftInput = ref<HTMLInputElement | null>(null);

const open = ref(false);
/** null 表示当前没有正在输入的新标签 */
const draft = ref<string | null>(null);

/* 已有标签中尚未被选中的部分 */
const availableSuggestions = computed(() =>
	props.suggestions.filter(tag => !modelValue.value.includes(tag)),
);

function pick(tag: string) {
	if (!modelValue.value.includes(tag))
		modelValue.value = [...modelValue.value, tag];
	open.value = false;
}

async function addNew() {
	if (draft.value !== null) return;

	draft.value = '';
	open.value = false;

	await nextTick();
	draftInput.value?.focus();
}

/** 提交新标签：为空则取消加入 */
function commitDraft() {
	if (draft.value === null) return;

	const name = draft.value.trim();
	draft.value = null;

	if (!name || modelValue.value.includes(name)) return;
	modelValue.value = [...modelValue.value, name];
}

function remove(tag: string) {
	modelValue.value = modelValue.value.filter(t => t !== tag);
}

/* 点击组件外部时：收起下拉，并丢弃空的新标签 */
function onDocPointerDown(e: PointerEvent) {
	const target = e.target as Node;
	if (root.value && root.value.contains(target)) return;

	if (open.value) open.value = false;
	// 有内容时交给 blur 提交；为空则直接取消加入
	if (draft.value !== null && draft.value.trim() === '') draft.value = null;
}

onMounted(() => document.addEventListener('pointerdown', onDocPointerDown));
onUnmounted(() => document.removeEventListener('pointerdown', onDocPointerDown));
</script>

<template>
	<div ref="root" class="tag-selector" @keydown.esc="open = false">
		<!-- 左侧：添加标签按钮 + 下拉选择 -->
		<div class="tag-add">
			<button
				type="button"
				class="btn btn--ghost tag-add-btn"
				:aria-expanded="open"
				@click="open = !open"
			>
				＋ 添加标签
			</button>

			<div v-if="open" class="tag-menu">
				<button
					type="button"
					class="tag-menu-item"
					:disabled="draft !== null"
					@click="addNew"
				>
					新建标签
				</button>

				<button
					v-for="tag in availableSuggestions"
					:key="tag"
					type="button"
					class="tag-menu-item"
					@click="pick(tag)"
				>
					{{ tag }}
				</button>

				<p v-if="!availableSuggestions.length" class="tag-menu-empty">
					暂无其它已有标签
				</p>
			</div>
		</div>

		<!-- 右侧：已选标签 -->
		<div class="tag-list">
			<span v-for="tag in modelValue" :key="tag" class="tag-chip">
				{{ tag }}
				<button
					type="button"
					class="tag-remove"
					aria-label="移除标签"
					@click="remove(tag)"
				>
					×
				</button>
			</span>

			<!-- 新建中的空标签 -->
			<span v-if="draft !== null" class="tag-chip tag-chip--draft">
				<input
					ref="draftInput"
					v-model="draft"
					type="text"
					placeholder="输入标签名"
					@keydown.enter.prevent="commitDraft"
					@blur="commitDraft"
				/>
				<button
					type="button"
					class="tag-remove"
					aria-label="取消该标签"
					@mousedown.prevent
					@click="draft = null"
				>
					×
				</button>
			</span>

			<span v-if="!modelValue.length && draft === null" class="tag-empty">
				还没有标签
			</span>
		</div>
	</div>
</template>

<style scoped lang="less">
.tag-selector {
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
	gap: 12px;
}

/* ===== 左侧按钮 ===== */
.tag-add {
	position: relative;
	flex-shrink: 0;
}

.tag-add-btn {
	white-space: nowrap;
}

.tag-menu {
	position: absolute;
	top: calc(100% + 6px);
	left: 0;
	z-index: 20;

	display: flex;
	flex-direction: column;
	min-width: 160px;
	max-height: 220px;
	overflow-y: auto;

	padding: 6px;
	background: var(--surface);
	border: 1px solid var(--border);
	border-radius: var(--radius-md);
	box-shadow: var(--shadow);
}

.tag-menu-item {
	padding: 8px 10px;
	font-size: 0.85rem;
	color: var(--text);
	text-align: left;
	background: transparent;
	border: none;
	border-radius: var(--radius-sm);
	cursor: pointer;
	transition: background 0.15s ease, color 0.15s ease;

	&:hover:not(:disabled) {
		background: var(--accent-bg);
		color: var(--accent);
	}

	&:disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}
}

.tag-menu-empty {
	margin: 4px 10px 6px;
	font-size: 0.8rem;
	color: var(--muted);
}

/* ===== 右侧已选标签 ===== */
.tag-list {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 8px;
	min-height: 38px;
}

.tag-chip {
	display: inline-flex;
	align-items: center;
	gap: 4px;
	padding: 6px 8px 6px 12px;
	font-size: 0.85rem;
	color: var(--accent);
	background: var(--accent-bg);
	border: 1px dashed var(--accent-border);
	border-radius: var(--radius-pill);
}

.tag-chip--draft {
	padding: 4px 8px 4px 12px;

	input {
		width: 7em;
		padding: 2px 0;
		font-size: 0.85rem;
		color: var(--text-h);
		background: transparent;
		border: none;
		outline: none;

		&::placeholder {
			color: var(--muted);
		}
	}
}

.tag-remove {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 18px;
	height: 18px;
	padding: 0;
	font-size: 0.9rem;
	line-height: 1;
	color: var(--accent);
	background: transparent;
	border: none;
	border-radius: 50%;
	cursor: pointer;
	transition: background 0.15s ease, color 0.15s ease;

	&:hover {
		color: #fff;
		background: var(--accent);
	}
}

.tag-empty {
	font-size: 0.85rem;
	color: var(--muted);
}
</style>
