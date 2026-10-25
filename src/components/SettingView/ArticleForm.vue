<script setup lang="ts">
import Article from '@/core/Article';
import TagSelector from '@/components/SettingView/TagSelector.vue';
import { useArticleStore } from '@/stores/articles';
import { useArticleForm } from '@/composables/useArticleForm';
import { config } from '@/config';

const props = defineProps<{
	/** 传入文章表示编辑，否则为新建 */
	article?: Article | null;
}>();

const emit = defineEmits<{
	(e: 'cancel'): void;
	(e: 'saved'): void;
}>();

const { tags } = useArticleStore();
const { form, errors, submitting, onSubmit, resetForm } = useArticleForm(props.article ?? null);

function handleSubmit() {
	const ok = onSubmit();
	if (ok && props.article) emit('saved');
}
</script>

<template>
	<form class="article-form" @submit.prevent="handleSubmit">
		<!-- 标题 -->
		<div class="field">
			<label for="title">
				标题
				<span class="required">*</span>
			</label>
			<input
				id="title"
				v-model="form.title"
				class="form-input"
				type="text"
				placeholder="文章标题"
				:aria-invalid="!!errors.title"
			/>
			<p v-if="errors.title" class="error">{{ errors.title }}</p>
		</div>

		<!-- 作者 -->
		<div class="field">
			<label for="author">
				作者
				<span class="required">*</span>
			</label>
			<input
				id="author"
				v-model="form.author"
				class="form-input"
				type="text"
				placeholder="作者名"
				:aria-invalid="!!errors.author"
			/>
			<p v-if="errors.author" class="error">{{ errors.author }}</p>
		</div>

		<!-- 标签 -->
		<div class="field">
			<label>标签</label>
			<TagSelector v-model="form.tags" :suggestions="tags" />
			<p class="hint">从已有标签中选择，或新建一个</p>
		</div>

		<!-- 摘要 -->
		<div class="field">
			<label for="summary">摘要</label>
			<textarea
				id="summary"
				v-model="form.summary"
				class="form-input form-textarea"
				rows="2"
				:placeholder="`不填则自动截取正文前 ${config.summaryLen} 字`"
			/>
			<p v-if="errors.summary" class="error">{{ errors.summary }}</p>
		</div>

		<!-- 正文 -->
		<div class="field">
			<label for="content">
				正文
				<span class="required">*</span>
			</label>
			<textarea
				id="content"
				v-model="form.content"
				class="form-input form-textarea"
				rows="12"
				placeholder="支持 Markdown"
				:aria-invalid="!!errors.content"
			/>
			<p v-if="errors.content" class="error">{{ errors.content }}</p>
			<p class="hint">已输入 {{ form.content.length }} 字</p>
		</div>

		<!-- 操作 -->
		<div class="form-actions">
			<template v-if="article">
				<button type="button" class="btn btn--ghost btn--lg" @click="emit('cancel')">
					取消
				</button>
				<button type="submit" class="btn btn--primary btn--lg" :disabled="submitting">
					{{ submitting ? '保存中…' : '保存修改' }}
				</button>
			</template>

			<template v-else>
				<button
					type="button"
					class="btn btn--ghost btn--lg reset-btn"
					@click="resetForm"
				>
					清空
				</button>
				<button type="submit" class="btn btn--primary btn--lg" :disabled="submitting">
					{{ submitting ? '提交中…' : '发布文章' }}
				</button>
			</template>
		</div>
	</form>
</template>

<style scoped lang="less">
.article-form {
	display: flex;
	flex-direction: column;
	gap: 24px;
}

.field {
	display: flex;
	flex-direction: column;
	gap: 8px;

	label {
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--text-h);
	}

	.form-input {
		width: 100%;
		padding: 12px 14px;
		font-size: 0.95rem;
		color: var(--text-h);
		background: var(--bg);
		border: 1px dashed var(--border);
		border-radius: var(--radius-sm);
		transition: border-color 0.2s ease, box-shadow 0.2s ease;

		&::placeholder {
			color: var(--muted);
		}

		&:focus {
			outline: none;
			border-color: var(--accent-border);
			box-shadow: 0 0 0 3px var(--accent-bg);
		}

		&[aria-invalid='true'] {
			border-color: var(--danger);
		}
	}

	.form-textarea {
		resize: vertical;
		line-height: 1.6;
	}
}

.required {
	color: var(--danger);
}

.error {
	margin: 0;
	font-size: 0.8rem;
	color: var(--danger);
}

.hint {
	margin: 0;
	font-size: 0.8rem;
	color: var(--muted);
}

.form-actions {
	display: flex;
	justify-content: space-between;
	padding-top: 8px;
}

.reset-btn {
	color: var(--danger);
}
</style>
