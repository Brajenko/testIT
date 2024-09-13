import './assets/main.css'

import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './helpers/router'
import { useAuthStore } from './stores/auth.store'

const app = createApp(App)
const pinia = createPinia()

watch(
  pinia.state,
  (state) => {
    localStorage.setItem('auth', JSON.stringify(state.auth))
  },
  { deep: true }
)

app.use(pinia)
app.use(router)

useAuthStore().refreshToken()

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)
app.component('font-awesome-icon', FontAwesomeIcon)

// quill extensions and dependencies
import 'katex/dist/katex.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import 'mathquill4quill/mathquill4quill.css'
import 'quill-paste-smart'

app.mount('#app')
