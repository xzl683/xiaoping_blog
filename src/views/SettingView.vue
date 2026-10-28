<script setup lang="ts">
import { ref, watch } from 'vue';
import Footer from '@/components/Footer.vue';
import BaseModal from '@/components/BaseModal.vue';
import ModeSwitch from '@/components/SettingView/ModeSwitch.vue';
import ArticleForm from '@/components/SettingView/ArticleForm.vue';
import ArticleList from '@/components/SettingView/ArticleList.vue';

import { useArticleStore } from '@/stores/articles';
import { useDeleteArticle } from '@/stores/delete';
import { useEditArticle } from '@/stores/edit';

type Mode = 'add' | 'edit' | 'delete';

const modes: { value: Mode; label: string }[] = [
	{ value: 'add', label: '添加文章' },
	{ value: 'edit', label: '编辑文章' },
	{ value: 'delete', label: '删除文章' },
];

const activeMode = ref<Mode>('add');

const { articles } = useArticleStore();

const editor = useEditArticle();
const deleter = useDeleteArticle();

/* 离开编辑模式时收起编辑器 */
watch(activeMode, mode => {
	if (mode !== 'edit') editor.close();
});
</script>

<template>
	<div id="setting" class="page-frame">
		<!-- Hero 标题区 -->
		<div class="full-horizon dashed-btm">
			<section class="setting-header content-section">
				<h1>文章管理</h1>
				<ModeSwitch v-model="activeMode" :options="modes" />
			</section>
		</div>

		<Transition name="fade" mode="out-in">
			<!-- 添加文章模式 -->
			<div v-if="activeMode === 'add'" class="full-horizon dashed-btm">
				<section class="mode-panel content-section">
					<ArticleForm />
				</section>
			</div>

			<!-- 编辑文章模式 -->
			<div v-else-if="activeMode === 'edit'" class="full-horizon dashed-btm">
				<section class="mode-panel content-section">
					<ArticleForm
						v-if="editor.editing.value"
						:key="editor.editing.value.id"
						:article="editor.editing.value"
						@cancel="editor.close()"
						@saved="editor.close()"
					/>
					<ArticleList
						v-else
						:articles="articles"
						action="edit"
						@action="editor.open"
					/>
				</section>
			</div>

			<!-- 删除文章模式 -->
			<div v-else class="full-horizon dashed-btm">
				<section class="mode-panel content-section">
					<ArticleList
						:articles="articles"
						action="delete"
						@action="deleter.open"
					/>
				</section>
			</div>
		</Transition>

		<BaseModal v-model:open="deleter.isOpen.value" title="确认删除?" header-close>
			<div class="delete-modal">删除后无法恢复，确定要删除这篇文章吗?</div>

			<template #footer>
				<button type="button" class="btn btn--ghost" @click="deleter.close()">
					取消
				</button>
				<button type="button" class="btn btn--danger" @click="deleter.confirm()">
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
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;
}

/* ===== 顶部 Hero ===== */
.setting-header {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	text-align: left;

	h1 {
		margin: 0;
		font-size: 2.5rem;
		font-weight: 700;
		line-height: 1.2;
		color: var(--text-h);
	}
}

.mode-panel {
	--section-pad-y: 40px;
}

.delete-modal {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 30px;
	width: 300px;
	height: 100px;
}

@media (max-width: @content-max-width) {
	.delete-modal {
		width: 80%;
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
