import { createRouter, createWebHistory } from 'vue-router'

import mainPage from './components/views/mainPage.vue'
import registrationPage from './components/views/registrationPage.vue'
import donationPage from './components/views/donationPage.vue'
import loginPage from './components/views/loginPage.vue'
import dashboardPage from './components/views/dashboardPage.vue'
import dashboardMain from './components/views/dashboard/dashboardMain.vue'
import dashboardPayouts from './components/views/dashboard/dashboardPayOuts.vue'
import dashboardSettings from './components/views/dashboard/dashboardSettings.vue'
import dashboardHelp from './components/views/dashboard/dashboardHelp.vue'
import dashboardDonations from './components/views/dashboard/dashboardDonations.vue'


const routes = [
    {
        path: '/',
        name: 'mainPage',
        component: mainPage,
    },
    { 
        path: '/donation/:username', 
        name: 'donationPage',
        component: donationPage, 
        beforeEnter: async (to, from, next) => {
            try {
                const response = await fetch(`http://localhost:3000/donations?username=${to.params.username}`);
    
                if (response.ok) {
                    next();
                } else {
                    next('/'); // Redirect if user does not exist
                }
            } catch (error) {
                next('/'); // Redirect on API error
            }
        }
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
                name: 'dashboardMain',
                component: dashboardMain
            },   
            { 
                path: 'donations',
                name: 'dashboardDonations',
                component: dashboardDonations
            }, 
            {
                path: 'payouts',
                name: 'dashboardPayouts',
                component: dashboardPayouts
            }, 
            {
                path: 'settings',
                name: 'dashboardSettings',
                component: dashboardSettings
            },
            {
                path: 'help',
                name: 'dashboardHelp',
                component: dashboardHelp
            }
        ]
    } 
]

const router = createRouter({
    history: createWebHashHistory(),
    mode: 'hash',
    routes,
})

export default router

