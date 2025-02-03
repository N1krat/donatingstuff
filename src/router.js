import { createRouter, createWebHistory } from 'vue-router'

import mainPage from './components/views/mainPage.vue'
import registrationPage from './components/views/registrationPage.vue'
import loginPage from './components/views/loginPage.vue'
import dashboardPage from './components/views/dashboardPage.vue'
import dashboardMain from './components/views/dashboard/dashboardMain.vue'
import dashboardDonations from './components/views/dashboard/dashboardDonations.vue'
import dashboardSubscriptions from './components/views/dashboard/dashboardSubscriptions.vue'
import dashboardStats from './components/views/dashboard/dashboardStats.vue'
import dashboardPayouts from './components/views/dashboard/dashboardPayOuts.vue'
import dashboardSettings from './components/views/dashboard/dashboardSettings.vue'
import dashboardWidgets from './components/views/dashboard/dashboardWidgets.vue'
import dashboardNews from './components/views/dashboard/dashboardNews.vue'
import dashboardHelp from './components/views/dashboard/dashboardHelp.vue'


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
        path: '/dashboard/:id',
        name: 'dashboardPage',
        component: dashboardPage,
        children: [
            { 
                path: '',
                component: dashboardMain
            }, 
            { 
                path: 'dashboardMain',
                component: dashboardMain
            }, 
            {
                path: 'donations',
                component: dashboardDonations
            }, 
            { 
                path: 'subscriptions',
                component: dashboardSubscriptions
            }, 
            {
                path: 'payouts',
                component: dashboardPayouts
            }, 
            {
                path: 'stats',
                component: dashboardStats
            }, 
            {
                path: 'settings',
                component: dashboardSettings
            }, 
            {
                path: 'widgets',
                component: dashboardWidgets
            }, 
            {
                path: 'news',
                component: dashboardNews
            }, 
            {
                path: 'help',
                component: dashboardHelp
            }
        ]
    } 
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

