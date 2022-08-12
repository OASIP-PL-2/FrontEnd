import {createRouter,createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import AddNewEvent from '../views/AddNewEvent.vue'
import ShowEvent from '../views/ShowEvent.vue'
import ShowCategory from '../views/ShowCategory.vue'
import AboutUs from '../views/AboutUs.vue'

const history=createWebHistory(import.meta.env.BASE_URL)
const routes = [{ 
        path : '/',
        name : 'Home',
        component: Home
    },
    {
        path : '/add-event',
        name : 'AddNewEvent',
        component: AddNewEvent
    },
    {
        path : '/events/:time',
        name : 'ShowEvent',
        component: ShowEvent
    },
    {
        path : '/category',
        name : 'ShowCategory',
        component: ShowCategory
    },
    {
        path : '/about-us',
        name : 'AboutUs',
        component: AboutUs
    }
]

const router = createRouter({history,routes})
export default router