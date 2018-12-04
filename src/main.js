// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);



import axios from 'axios'
Vue.prototype.$ajax = axios

import { Message } from 'element-ui';
Vue.prototype.$message=Message




Vue.config.productionTip = false


//在进入路由之前 每次都会执行   改title
router.beforeEach(function(to,from,next){
  document.title=to.meta.title;
  // if(to.path==='./list'){  有拦截功能
  //   next({path:'/add'})
  // }else{
  //   next();
  // }
  next();
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
