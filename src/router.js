import { createRouter, createWebHistory } from 'vue-router'

import mainPage from './components/views/mainPage.vue'
import registrationPage from './components/views/registrationPage.vue'
import loginPage from './components/views/loginPage.vue'
import dashboardPage from './components/views/dashboardPage.vue'
import dashboardMain from './components/views/dashboard/dashboardMain.vue'
import dashboardPayouts from './components/views/dashboard/dashboardPayOuts.vue'
import dashboardSettings from './components/views/dashboard/dashboardSettings.vue'
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
                path: 'payouts',
                component: dashboardPayouts
            }, 
            {
                path: 'settings',
                component: dashboardSettings
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

