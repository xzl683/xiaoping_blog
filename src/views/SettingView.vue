<script setup lang="ts">
import { ref } from 'vue';
import Footer from '@/components/Footer.vue';
import BaseModal from '@/components/BaseModal.vue';

import { useArticleStore } from '@/composables/useArticlesStore';

const activeMode = ref<'add' | 'delete'>('add');

const { articles } = useArticleStore();

const confirmOpen = ref(false);
const deleteId = ref<string | null>(null);

function openDeleteDialog(id: string) {
	deleteId.value = id;
	confirmOpen.value = true;
}

function confirmDelete() {
	articles.value = articles.value.filter(art => art.id !== deleteId.value);
	console.log(deleteId.value);
	confirmOpen.value = false;
}
</script>

<template>
	<div id="setting">
		<!-- Hero 标题区 -->
		<div class="full-horizon dashed-btm">
			<section class="setting-header dashed-section">
				<h1>文章管理</h1>
				<p class="subtitle">添加新文章或删除已有文章</p>

				<!-- 模式切换按钮组 -->
				<div class="mode-switch" :data-mode="activeMode">
					<!-- 滑动高亮背景 -->
					<div class="mode-highlight"></div>

					<button
						class="mode-btn"
						type="button"
						:class="{ active: activeMode === 'add' }"
						@click="activeMode = 'add'"
					>
						添加文章
					</button>
					<button
						class="mode-btn"
						type="button"
						:class="{ active: activeMode === 'delete' }"
						@click="activeMode = 'delete'"
					>
						删除文章
					</button>
				</div>
			</section>
		</div>

		<!-- 添加文章模式 -->
		<Transition name="fade" mode="out-in">
		<div class="full-horizon dashed-btm" v-if="activeMode === 'add'">
			<section class="mode-panel dashed-section">
				<form class="article-form" @submit.prevent="console.log">
					<div class="form-group">
						<label for="title">标题</label>
						<input id="title" type="text" placeholder="输入文章标题" />
					</div>

					<div class="form-group">
						<label for="author">作者</label>
						<input id="author" type="text" placeholder="作者名" />
					</div>

					<div class="form-group">
						<label for="tags">标签</label>
						<input id="tags" type="text" placeholder="多个标签用逗号分隔" />
					</div>

					<div class="form-group">
						<label for="summary">摘要（可选）</label>
						<input id="summary" type="text" placeholder="留空则自动从正文提取" />
					</div>

					<div class="form-group">
						<label for="content">正文</label>
						<textarea id="content" rows="10" placeholder="写点什么吧..."></textarea>
					</div>

					<div class="form-actions">
						<button type="submit" class="submit-btn">发布文章</button>
					</div>
				</form>
			</section>
		</div>

		<!-- 删除文章模式 -->
		<div class="full-horizon dashed-btm" v-else>
			<section class="mode-panel dashed-section">
				<div class="delete-list">
					<article class="delete-item" v-for="art in articles">
						<div class="delete-item-info">
							<h3 class="delete-item-title">{{ art.title }}</h3>
							<time class="delete-item-date">{{ art.createTime.toChineseDateString() }}</time>
							&nbsp;·&nbsp;
							<span class="author">{{ art.author }}</span>
						</div>
						<div class="delete-item-summary">{{ art.summary }}</div>
						<button type="button" class="delete-btn" @click="openDeleteDialog(art.id)">删除</button>
					</article>
				</div>
			</section>
		</div>
		</Transition>

		<BaseModal v-model:open="confirmOpen" title="确认删除?">
			<p>删除后无法恢复，确定要删除这篇文章吗?</p>

			<template #footer>
				<button type="button" @click="confirmOpen = false">取消</button>
				<button type="button" class="danger" @click="confirmDelete">
					确认删除
				</button>
			</template>
		</BaseModal>

		<Footer />
	</div>
</template>

<style scoped lang="less">
@content-max-width: 800px;

#setting {
	position: relative;
	flex-direction: column;
	align-items: center;
	display: flex;
	min-height: 100vh;
	overflow-x: hidden;

	/* ===== 两侧竖向虚线（与 HomeView 一致） ===== */
	&::before,
	&::after {
		content: "";
		position: absolute;
		top: 0;
		bottom: 0;
		width: 1px;
		background-image: var(--dashed-v);
		background-repeat: repeat-y;
		z-index: 0;
		pointer-events: none;
	}
	&::before {
		left: calc(50% - var(--content-max-width) / 2);
	}
	&::after {
		right: calc(50% - var(--content-max-width) / 2);
	}
}

/* ===== 顶部 Hero ===== */
.setting-header {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;

	width: 100%;
	max-width: var(--content-max-width);
	padding: var(--content-padding);
	text-align: left;

	&::before,
	&::after {
		content: "";
		position: absolute;
		bottom: 0;
		width: 12px;
		height: 12px;
		background-image: var(--connector);
		background-repeat: no-repeat;
		background-size: contain;
		z-index: 1;
	}
	&::before {
		left: 0;
		translate: -50% 50%;
	}
	&::after {
		right: 0;
		translate: 50% 50%;
	}
}

.setting-header h1 {
	font-size: 2.5rem;
	font-weight: 700;
	color: var(--text-h);
	line-height: 1.2;
	margin: 0;
}

.subtitle {
	font-size: 1.1rem;
	color: var(--text);
	line-height: 1.6;
	margin: 0;
}

/* ===== 模式切换按钮组 ===== */
.mode-switch {
	position: relative;
	display: inline-flex;
	width: fit-content;
	margin-top: 10px;
	padding: 4px;
	border: 1px solid var(--border);
	border-radius: 8px;
	background: var(--bg);
	z-index: 0;

	/* 滑动高亮背景 */
	.mode-highlight {
		position: absolute;
		top: 4px;
		bottom: 4px;
		left: 4px;
		width: calc(50% - 4px);
		background: var(--accent-bg);
		border: 1px dashed var(--accent-border);
		border-radius: 6px;
		transition: left 0.35s cubic-bezier(0.4, 0, 0.2, 1);
		z-index: -1;
	}

	/* 切到 delete 模式时高亮移动到右侧 */
	&[data-mode="delete"] .mode-highlight {
		left: 50%;
	}
}

.mode-btn {
	position: relative;
	flex: 1;
	min-width: 110px;
	padding: 10px 20px;
	font-size: 0.95rem;
	font-weight: 500;
	color: var(--text);
	background: transparent;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	transition: color 0.25s ease;
	white-space: nowrap;

	&:hover {
		color: var(--text-h);
	}

	&.active {
		color: var(--accent);
		font-weight: 600;
	}
}

/* ===== 模式面板 ===== */
.mode-panel {
	position: relative;
	width: 100%;
	max-width: var(--content-max-width);
	padding: 40px var(--content-padding);

	&::before,
	&::after {
		content: "";
		position: absolute;
		bottom: 0;
		width: 12px;
		height: 12px;
		background-image: var(--connector);
		background-repeat: no-repeat;
		background-size: contain;
		z-index: 1;
	}
	&::before {
		left: 0;
		translate: -50% 50%;
	}
	&::after {
		right: 0;
		translate: 50% 50%;
	}
}

/* ===== 添加文章表单 ===== */
.article-form {
	display: flex;
	flex-direction: column;
	gap: 24px;
}

.form-group {
	display: flex;
	flex-direction: column;
	gap: 8px;

	label {
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--text-h);
	}

	input[type="text"],
	textarea {
		width: 100%;
		padding: 12px 14px;
		font-size: 0.95rem;
		font-family: var(--sans);
		color: var(--text-h);
		background: var(--bg);
		border: 1px dashed var(--border);
		border-radius: 6px;
		transition: border-color 0.2s ease, box-shadow 0.2s ease;

		&::placeholder {
			color: #b0a8b8;
		}

		&:focus {
			outline: none;
			border-color: var(--accent-border);
			box-shadow: 0 0 0 3px var(--accent-bg);
		}
	}

	textarea {
		resize: vertical;
		line-height: 1.6;
	}
}

.form-actions {
	display: flex;
	justify-content: flex-end;
	padding-top: 8px;
}

.submit-btn {
	padding: 12px 28px;
	font-size: 0.95rem;
	font-weight: 600;
	color: #fff;
	background: var(--accent);
	border: none;
	border-radius: 6px;
	cursor: pointer;
	transition: background 0.2s ease, transform 0.15s ease;

	&:hover {
		background: #9129d6;
	}

	&:active {
		transform: scale(0.97);
	}
}

/* ===== 删除文章列表 ===== */
.delete-list {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.delete-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 20px;
	padding: 16px 20px;
	border: 1px dashed var(--border);
	border-radius: 8px;
	background: var(--bg);
	transition: border-color 0.2s ease, background 0.2s ease;

	&:hover {
		border-color: var(--accent-border);
		background: var(--accent-bg);
	}
}

.delete-item-info {
	width: 30%;
	// min-width: 0;
}

.delete-item-title {
	font-size: 1.1rem;
	font-weight: 600;
	color: var(--text-h);
	margin: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.delete-item-author {}

.delete-item-date {
	font-size: 0.8rem;
	color: var(--text);
}

.delete-item-summary {
	width: 50%;
	font-size: 0.75rem;
}

.delete-btn {
	flex-shrink: 0;
	padding: 8px 18px;
	font-size: 0.85rem;
	font-weight: 500;
	color: #e74c3c;
	background: transparent;
	border: 1px solid #e74c3c;
	border-radius: 6px;
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		color: #fff;
		background: #e74c3c;
	}
}

/* ===== Footer ===== */
.site-footer {
	width: 100%;
	max-width: var(--content-max-width);
	padding: 40px var(--content-padding);
	text-align: center;
	color: var(--text);
}

/* ===== 手机端适配 ===== */
@media (max-width: @content-max-width) {
	#setting::before {
		left: 20px;
	}
	#setting::after {
		right: 20px;
	}

	.setting-header,
	.mode-panel,
	.site-footer {
		padding-left: 20px;
		padding-right: 20px;
	}

	.mode-btn {
		min-width: 90px;
		padding: 10px 14px;
	}
}

/* ===== 模式面板切换淡入淡出动画 ===== */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25s ease, transform 0.25s ease;
}
.fade-enter-from {
	opacity: 0;
	transform: translateY(6px);
}
.fade-leave-to {
	opacity: 0;
	transform: translateY(-6px);
}
</style>
