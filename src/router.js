import {createRouter, createWebHistory} from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: {
                async mounted() {
                    this.$router.push('/ru')
                }
            },
            
        },
        {
            path: '/:lang/auth/login',
            name: 'login',
            component: () => import('@/views/Login.vue'),
            props: true
        },
        {
            path: '/:lang',
            component: AppLayout,
            props: true,
            children: [
                
            ]
        },
    ]
});

export default router;
