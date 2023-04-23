import { createApp } from 'vue'
import router from "./router"
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPaperPlane, faClock } from '@fortawesome/free-solid-svg-icons'


library.add(faPaperPlane, faClock)

createApp(App)
.use(VueAxios, axios)
.use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
