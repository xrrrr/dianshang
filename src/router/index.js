import Vue from 'vue'
import Router from 'vue-router'
import Public from '@/components/common/public'
import Home from '@/components/pages/home'
import Sort from '@/components/pages/sort'
import Car from '@/components/pages/car'
import CarNone from '@/components/pages/car-none'
import Mine from '@/components/pages/mine'
import Detail from '@/components/detail'
import Login from '@/components/login'
import Regist from '@/components/regist'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/public',
      component: Public,
      children:[
        {
          path:'/home',
          component:Home,
        },{
          path:'/sort',
          component:Sort,
        },{
          path:'/car',
          component:Car,
        },{
          path:'/carNone',
          component:CarNone
        },
        {
          path:'/mine',
          component:Mine,
        }
      ]
    },{
      // name:'detail',
      path:'/detail',
      component: Detail
    },{
      path:'/login',
      component:Login,
    },{
      path:'/regist',
      component:Regist,
    },
    {
      path:'*',
      redirect:'/login',
    }
  ]
})
