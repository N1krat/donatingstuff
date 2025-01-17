import { createRouter, createWebHistory } from 'vue-router'

import mainPage from './components/views/mainPage.vue'
import registrationPage from './components/views/registrationPage.vue'
import dashboardPage from './components/views/dashboardPage.vue'

const routes = [
    {
        path: '/',
        component: mainPage,
    },
    { 
        path: '/registration', 
        component: registrationPage,
    }, 
    { 
        path: '/dashboard',
        component: dashboardPage,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

