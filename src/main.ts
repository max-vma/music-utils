import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/dark/css-vars.css';
import 'element-plus/theme-chalk/index.css';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from '@/app/routes';

const pinia = createPinia();

createApp(App).use(router).use(ElementPlus).use(pinia).mount('#app');
