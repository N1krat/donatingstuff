//import router
import {createWebHistory, createRouter} from 'vue-router'

import mainPage from './components/views/mainPage.vue'
import registrationPage from './components/views/registrationPage.vue'



const routes = [
    {
        path: '/',
        component: mainPage,
    },
    { 
        path: '/registration', 
        component: registrationPage,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
