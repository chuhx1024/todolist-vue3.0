import { createRouter, createWebHistory } from 'vue-router'
import Todos from '../views'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Todos,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
