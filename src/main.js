import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Treeselect from 'vue3-treeselect'
import Slider from '@vueform/slider';
import App from './App.vue'
import router from './router'
import axios from 'axios';
import VueAxios from 'vue-axios'

import './assets/main.css'
import '@vueform/slider/themes/default.css'

const app = createApp(App)
app.component("VTreeSelect", Treeselect)
app.component("VSlider", Slider)
app.use(VueAxios, axios)
.provide('axios',  app.config.globalProperties.axios)
app.use(createPinia())
app.use(router)

app.mount('#app')
