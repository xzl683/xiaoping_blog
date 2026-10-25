import { reactive, ref } from 'vue';
import { useArticleStore } from '@/stores/articles';
import { useToast } from '@/stores/toast';
import type Article from '@/core/Article';
import { config } from '@/config';

interface ArticleFormState {
	title: string;
	author: string;
	summary: string;
	tags: string[];
	content: string;
}

const emptyForm = (): ArticleFormState => structuredClone({
	title: '',
	author: '',
	summary: '',
	tags: [],
	content: '',
});

/**
 * 文章表单状态（工厂：每次调用产生独立状态）
 * source 传入文章表示编辑该文章，否则为新建；变化时自动重置表单
 */
export const useArticleForm = (article: Article | null) => {
	const { addArticle, updateArticle } = useArticleStore();
	const toast = useToast();

	const form = reactive<ArticleFormState>(article?.clone() ?? emptyForm());

	const errors = reactive<Record<string, string>>({});
	const submitting = ref(false);

	function clearErrors() {
		Object.keys(errors).forEach(k => delete errors[k]);
	}

	/* ---------- 校验 ---------- */
	function validate() {
		clearErrors();

		form.title   = form.title  .trim();
		form.author  = form.author .trim();
		form.content = form.content.trim();

		const { title, author, summary, content } = form;
		if (!title  ) errors.title   = '标题不能为空';
		if (!author ) errors.author  = '作者不能为空';
		if (!content) errors.content = '正文不能为空';

		if(title  .length > config.titleLen  ) errors.title   = `标题不能超过${config.titleLen  }个字`;
		if(author .length > config.authorLen ) errors.author  = `作者不能超过${config.authorLen }个字`;
		if(summary.length > config.summaryLen) errors.summary = `摘要不能超过${config.summaryLen}个字`;

		return Object.keys(errors).length === 0;
	}

	/* ---------- 提交 ---------- */
	function onSubmit() {
		if (!validate()) return false;

		submitting.value = true;
		try {
			if (article) {
				updateArticle(article, form);
				toast.success('文章已更新');
			} else {
				addArticle(form);
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
		Object.assign(form, emptyForm());
		clearErrors();
	}

	return {
		form,
		errors,
		submitting,
		onSubmit,
		resetForm,
	};
};
