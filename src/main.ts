import 'tailwindcss/tailwind.css'

import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { useUserStore } from '@/stores/userStore'

const pinia = createPinia()
const app = createApp(App).use(router).use(pinia).mount('#app')

const userStore = useUserStore()

if (!userStore.isLoggedIn) {
    router.push('/login')
}
