import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueLazyload from "vue-lazyload";
import Vue2TouchEvents from "vue2-touch-events";

library.add(
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faChevronDown
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = true;

Vue.use(VueLazyload);
Vue.use(Vue2TouchEvents);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
