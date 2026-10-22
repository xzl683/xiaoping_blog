import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'home',
		component: () => import('@/views/HomeView.vue'),
	}, {
		path: '/articles/:slug',
		name: 'article',
		component: () => import('@/views/ArticleView.vue'),
		// 把参数转成 props 传给组件，组件不用依赖 useRoute
		props: true,
	}, {
		path: '/:pathMatch(.*)*',
		name: 'not-found',
		component: () => import('@/views/NotFoundView.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(to, _from, savedPosition) {
		// 浏览器前进/后退：恢复原滚动位置
		if (savedPosition) return savedPosition;
		// 锚点：#comments
		if (to.hash) return { el: to.hash, behavior: 'smooth' };
		// 普通跳转：回顶部
		return { top: 0 };
	},
});

export default router;
