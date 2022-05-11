// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import VueResource from 'vue-resource'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import Routes from './routes'
import maconEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { marked } from 'marked'


Vue.use(ElementUI)

Vue.config.productionTip = false

// Vue.use(VueResource)

Vue.use(VueRouter)

Vue.use(maconEditor)

//Vue.use({ marked })

Vue.filter("snippet",function(value){
  return value.slice(0,30) + "......";
})
Vue.filter("snippet_date",function(value){
  return value.slice(0,10);
})
Vue.filter("snippet_title",function(value){
  if(value.length > 14){
    return value.slice(0,14) + "......";
  }
  else return value;
})
Vue.filter("snippet_year",function(value){
  return value.slice(0,4);
})

//创建路由
const router = new VueRouter({
  routes: Routes
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router: router
})
