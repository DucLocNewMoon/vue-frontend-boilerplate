// CSS files
import './assets/main.css'

// External libraries
import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Vue related imports
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
})

axios.defaults.baseURL = import.meta.env.baseURL

app.use(createPinia())
app.use(router)
app.use(axios)
app.use(vuetify)
app.use(ElementPlus)

app.mount('#app')
