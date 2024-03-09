// CSS files
import './assets/main.css'

// External libraries
import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// Vue related imports
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

axios.defaults.baseURL = import.meta.env.baseURL

app.use(createPinia())
app.use(router)
app.use(axios)
app.use(ElementPlus)

app.mount('#app')
