import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/index.ts';
import { useToast } from '@/stores/toast';

const app = createApp(App);

// 统一兜底：组件渲染/生命周期中未捕获的异常不再静默失败
app.config.errorHandler = (err, _instance, info) => {
	console.error(err, info);
	useToast().error('页面出现异常，请稍后重试');
};

app.use(router);
app.mount('#app');
