import Vue from 'vue'
import Router from 'vue-router'

import company from '../components/company'
import custmer from '../components/custmer'
import supplier from '../components/supplier'
import login from '../components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      redirect:'/company'
    },
    {
      path:'/login',
      component:login,
      meta:{title:'登陆'}
    },
    {
      path:'/company',
      component:company,
      meta:{title:'公司资质'}
    },
    {
      path:'/custmer',
      component:custmer,
      meta:{title:'客户信息'}
    },
    {
      path:'/supplier',
      component:supplier,
      meta:{title:'供应商信息'}
    },
    {
      path:"*",
      redirect:'/company'
    },
  ]
})
