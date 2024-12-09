import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            name: 'index',
            path: '/',
            component: () => import('@/views/IndexView.vue')
        },
        {
            name: 'login',
            path: '/login',
            component: () => import('@/views/LoginView.vue'),
        },
        {
            name: 'register',
            path: '/register',
            component: () => import('@/views/RegisterView.vue')
        },
        {
            name: "home",
            path: "/home",
            component: () => import("@/views/HomeView.vue")
        }
    ],
})

export default router
