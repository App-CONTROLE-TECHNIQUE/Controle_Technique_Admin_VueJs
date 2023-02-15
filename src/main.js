// import "babel-polyfill";
import Vue from "vue";
import App from "./App.vue";
import VueHtmlToPaper from 'vue-html-to-paper';
import router from "./router";

// import VueRouter from "vue-router";
import GullKit from "./plugins/gull.kit";
// import "babel-polyfill";
// import es6Promise from "es6-promise";
// es6Promise.polyfill();
import store from "./store";
import axios from "axios";
import VueKeyCloak from '@dsb-norge/vue-keycloak-js'
import Breadcumb from "./components/breadcumb";
import firebase from "firebase/app";
import "firebase/auth";
import {firebaseSettings} from "@/data/config";
import i18n from "./lang/lang";
import Multiselect from 'vue-multiselect'
import DateRangePicker from 'vue2-daterange-picker'
//you need to import the CSS manually (in case you want to override it)
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
//import material-icon scss
import "font-awesome/css/font-awesome.min.css";

//defined as global component
Vue.component('VueFontawesome', require('vue-fontawesome-icon/VueFontawesome.vue').default);
Vue.component('multiselect', Multiselect);
Vue.component("breadcumb", Breadcumb);
import InstantSearch from 'vue-instantsearch';
import vuetify from './plugins/vuetify';
// Vue.use(VueRouter);
import  VueCompositionAPI from '@vue/composition-api'
import constants from "./plugins/constants";



Vue.use(InstantSearch);
Vue.use(GullKit);
function tokenInterceptor () {
  axios.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${Vue.prototype.$keycloak.token}`
      return config
  }, error => {
      return Promise.reject(error)
  })
}
Vue.use(VueCompositionAPI);

const options = {
    name: '_blank',
    specs: [
        'fullscreen=yes',
        'titlebar=yes',
        'scrollbars=yes'
    ],
    styles: [
        'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
        'https://unpkg.com/kidlat-css/css/kidlat.css'
    ]
}

Vue.use(VueHtmlToPaper, options);
Vue.use(VueKeyCloak, {

  config:{
      authRealm: "mtckeycloak",
      authUrl: constants.resource_url_auth,
      authClientId: "assuranceVue",
      logoutRedirectUri: constants.resource_home
  },

  init:{
      onLoad: 'login-required',
      checkLoginIframe : false,

  },
  onReady() {

    let just = `Bearer ${Vue.prototype.$keycloak.token}`
    localStorage.setItem("token",just)

    if(Vue.prototype.$keycloak.authenticated){
        tokenInterceptor()
    }

    //console.log(`I wonder what Keycloak returns: ${keycloak}`)

    new Vue({
        router,
        store,
        i18n,
        vuetify,
        render: h => h(App)
    }).$mount('#app');

  },

});

firebase.initializeApp(firebaseSettings);

Vue.config.productionTip = false;

/*new Vue({
  store,
  router,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount("#app");*/
