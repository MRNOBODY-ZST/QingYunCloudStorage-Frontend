import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            name: 'index',
            path: '/',
            component: () => import('@/views/IndexView.vue'),
        },
        {
            name: 'login',
            path: '/login',
            component: () => import('@/views/LoginView.vue'),
        },
        {
            name: 'register',
            path: '/register',
            component: () => import('@/views/RegisterView.vue'),
        },
        {
            name: 'sidebar',
            path: '/sidebar',
            component: () => import('@/components/SidebarComponent.vue'),
            children: [
                {
                    name: 'home',
                    path: '/home',
                    component: () => import('@/views/HomeView.vue'),
                },
                {
                    name: 'file',
                    path: '/file',
                    component: () => import('@/views/FileView.vue'),
                },
                {
                    name: 'file_parent_id',
                    path: '/file/:parentId',
                    component: () => import('@/views/FileView.vue'),
                },
                {
                    name: 'recent',
                    path: '/recent',
                    component: () => import('@/views/RecentView.vue'),
                },
                {
                    name: 'user',
                    path: '/user',
                    component: () => import('@/views/UserView.vue'),
                },
                {
                    name: 'share',
                    path: '/share',
                    component: () => import('@/views/ShareView.vue'),
                },
            ],
        },
    ],
})

export default router
