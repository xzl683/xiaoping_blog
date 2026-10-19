import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import ArticleDetail from '../views/ArticleDetail.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: Home
    }, {
        path: '/article',
        component: ArticleDetail
    }
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
