import Vue from 'vue'
import App from './App.vue'
import VueGeolocationApi from 'vue-geolocation-api'
import ToggleSwitch from 'vuejs-toggle-switch'

Vue.use(ToggleSwitch)
Vue.use(VueGeolocationApi)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')