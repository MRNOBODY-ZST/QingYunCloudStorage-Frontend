import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            name: 'login',
            path: '/login',
            component: () => import('@/views/LoginView.vue'),
        },
    ],
})

export default router
