import { createRouter, createWebHistory } from 'vue-router'

import mainPage from './components/views/mainPage.vue'
import registrationPage from './components/views/registrationPage.vue'
import loginPage from './components/views/loginPage.vue'
import dashboardPage from './components/views/dashboardPage.vue'

const routes = [
    {
        path: '/',
        name: 'mainPage',
        component: mainPage,
    },
    { 
        path: '/registration', 
        name: 'registrationPage',
        component: registrationPage,
    }, 
    { 
        path: '/login', 
        name: 'loginPage',
        component: loginPage,
    },
    { 
        path: '/dashboard',
        name: 'dashboardPage',
        component: dashboardPage,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

