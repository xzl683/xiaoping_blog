import { reactive, ref, toValue, watch, type MaybeRefOrGetter } from 'vue';
import { useArticleStore } from '@/stores/articles';
import { useToast } from '@/stores/toast';
import type Article from '@/core/Article';
import type { InputArticleData } from '@/types';

interface ArticleFormState {
	title: string;
	author: string;
	summary: string;
	tags: string[];
	content: string;
}

const emptyForm = (): ArticleFormState => ({
	title: '',
	author: '',
	summary: '',
	tags: [],
	content: '',
});

function snapshot(article: Article | null | undefined): ArticleFormState {
	return article
		? {
				title: article.title,
				author: article.author,
				summary: article.summary ?? '',
				tags: [...article.tags],
				content: article.content,
			}
		: emptyForm();
}

const config = {
	titleLen: 20,
	authorLen: 20,
	summaryLen: 80
} as const;

/**
 * 文章表单状态（工厂：每次调用产生独立状态）
 * source 传入文章表示编辑该文章，否则为新建；变化时自动重置表单
 */
export const useArticleForm = (source: MaybeRefOrGetter<Article | null | undefined>) => {
	const { addArticle, updateArticle } = useArticleStore();
	const toast = useToast();

	let initial = snapshot(toValue(source));

	const form = reactive<ArticleFormState>({
		...initial,
		tags: [...initial.tags],
	});

	const errors = reactive<Record<string, string>>({});
	const submitting = ref(false);

	function clearErrors() {
		Object.keys(errors).forEach(k => delete errors[k]);
	}

	/** 用给定状态覆盖表单，并记录为重置基准 */
	function resetTo(state: ArticleFormState) {
		initial = { ...state, tags: [...state.tags] };
		Object.assign(form, { ...state, tags: [...state.tags] });
		clearErrors();
	}

	watch(
		() => toValue(source),
		article => resetTo(snapshot(article)),
	);

	/* ---------- 校验 ---------- */
	function validate() {
		clearErrors();

		const { title, author, summary, content } = form;
		if (!title  .trim()) errors.title   = '标题不能为空';
		if (!author .trim()) errors.author  = '作者不能为空';
		if (!content.trim()) errors.content = '正文不能为空';

		if(title  .length > config.titleLen  ) errors.title   = `标题不能超过${config.titleLen  }个字`;
		if(author .length > config.authorLen ) errors.author  = `作者不能超过${config.authorLen }个字`;
		if(summary.length > config.summaryLen) errors.summary = `摘要不能超过${config.summaryLen}个字`;

		return Object.keys(errors).length === 0;
	}

	/* ---------- 提交 ---------- */
	async function onSubmit(): Promise<boolean> {
		if (!validate()) return false;

		const article = toValue(source);

		submitting.value = true;
		try {
			const tags = [...new Set(form.tags.map(t => t.trim()).filter(Boolean))];

			const data: InputArticleData = {
				title: form.title.trim(),
				author: form.author.trim(),
				summary: form.summary.trim(),
				tags,
				content: form.content,
			};

			if (article) {
				updateArticle(article.id, data);
				toast.success('文章已更新');
			} else {
				addArticle(data);
				toast.success('文章添加成功');
				resetForm();
			}

			return true;
		} catch (e) {
			const msg = e instanceof Error ? e.message : '未知错误';
			toast.error(`${article ? '更新' : '添加'}失败：${msg}`, 2000);
			return false;
		} finally {
			submitting.value = false;
		}
	}

	/** 恢复为初始值（编辑时恢复为原文内容，新建时清空） */
	function resetForm() {
		resetTo(initial);
	}

	return {
		form,
		errors,
		submitting,
		onSubmit,
		resetForm,
	};
};
