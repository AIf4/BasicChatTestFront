
import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Chat from './components/Chat.vue';

const routes = [
    {
        path: "/",
        component: Login
    },
    {
        path: "/register",
        component: Register
    },
    {
        path: "/chat",
        component: Chat
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;