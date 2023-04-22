import { createApp } from 'vue'
import router from "./router"
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

createApp(App)
.use(VueAxios, axios)
.use(router)
.mount('#app')
