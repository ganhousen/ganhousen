import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home'
import Index from './pages/index'
import Product from './pages/product'
import Detail from './pages/detail'
import Cart from './pages/cart'
import Order from './pages/order'
import OrderConfirm from './pages/orderConfirm'
import OrderList from './pages/orderList'
import OrderPay from './pages/orderPay'
import AliPay from './pages/alipay'

Vue.use(Router);

export default new Router({
   routes:[
       {
           path:'/', // 一级路由 根路由
           name:'home', // 根路由名字
           component:Home, // 主键
           redirect:'/index',
           children:[
               {
                   path:'/index', // 二级路由 子路由
                   name:'index', // 子路由名字
                   component:Index, // 主键
               },
               {
                   path:'/product/:id', // 动态路由 产品站 id
                   name:'product', // 产品站名字
                   component:Product, // 主键
               },
               {
                   path:'/detail/:id', // 商品详情 id
                   name:'detail', // 商品详情名字
                   component:Detail, // 主键
               }
           ]
       },
       {
           path:'/cart', // 线下路由 购物车
           name:'cart', // 购物车名字
           component:Cart, // 主键
       },
       {
           path:'/order', // 根主键
           name:'/order', // 根主键名字
           component:Order, // 主键
           children: [
               {
                   path:'list', // 订单列表
                   name:'order-list', // 订单列表
                   component:OrderList, // 主键
               },
               {
                   path:'confirm', // 订单确认
                   name:'order-confirm', // 订单确认
                   component:OrderConfirm, // 主键
               },
               {
                   path:'pay', // 订单支付
                   name:'order-pay', // 订单支付 名字
                   component:OrderPay, // 主键
               },
               {
                   path:'alipay', // 订单支付
                   name:'alipay', // 订单支付 名字
                   component:AliPay, // 主键
               }
           ]
       }
   ]
});
