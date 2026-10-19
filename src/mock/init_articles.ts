import Article from "../core/Article";
import type { IArticle } from "../types";
import { Time } from "../utils/Time";

const articleData: IArticle[] = [
	{
		id: '1',
		title: 'hello world',
		content: 'print hello world',
		author: 'xzl',
		tag: 'python',
		createTime: new Time()
	}, {
		id: '2',
		title: 'hello world',
		content: `GitHub 构建的目标是让人们编写代码、将其组织到存储库中，并通过分支、提交、问题和 Pull Request 进行协作。
但下一代软件将以不同于以往的方式构建，因为它将服务于一种不同类型的开发者：智能体。
智能体编写的代码比以往任何时候都要多——它们修复漏洞、构建功能、编写测试、审核更改、更新依赖项，以及进行维持应用运行所需的所有日常维护工作。
这个全新世界中，将会有数百甚至数千个智能体同时在同一代码库上协作。那么，基础层应当长什么样？
智能体如何知道其他智能体在做什么？当它们进行存在冲突的更改时会发生什么？如何审查它们产出的所有内容？如何跟踪不仅发生了什么变化，还包括为什么要做出更改？
因此一个紧迫问题就是：下一代 GitHub 会是什么样子的？
我们希望您通过构建它来帮助我们找到答案。
今年早些时候，我们推出了 Artifacts。这是一个版本化文件系统，兼容 Git，可扩展到数百万个代码库。从一开始，我们就将 Artifacts 设计为一套可编程原语，开发者可以利用这些原语构建自己的产品、工作流程和抽象概念。`,
		author: 'xzl',
		tag: 'code',
		createTime: new Time()
	}, {
		id: '3',
		title: 'hello world',
		content: '3 blog',
		author: 'xzl',
		tag: 'post',
		createTime: new Time()
	}, {
		id: '4',
		title: 'hello world',
		content: '4 blog',
		author: 'xzl',
		tag: 'code',
		createTime: new Time()
	}, {
		id: '5',
		title: 'hello world',
		content: '5 blog',
		author: 'xzl',
		tag: 'code',
		createTime: new Time()
	},
	// {
	// 	id: '6',
	// 	title: 'hello world',
	// 	content: '6 blog',
	// 	author: 'xzl',
	// 	tag: 'code',
	// 	createTime: new Time()
	// }
];

export const articles = articleData.map(a => new Article(a));

