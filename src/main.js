// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import  firebase  from './firebase'

import App from './index.vue'
import router from './router'

import vueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const app = createApp(App)

app.use(createPinia())
app.use(router,firebase,vueSweetalert2)

app.mount('#app')
