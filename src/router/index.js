import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//view page warp component
import viewPageComponent from 'pages/App'

//home
import homeComponent from 'pages/home'
//transaction
import transactionComponent from 'pages/transaction'
//Holders
import holdersComponent from 'pages/holders'
//block
import blockComponent from 'pages/block'
//交易详情页面
import transactionDetailComponent from 'pages/transaction_detail'
//区块详情页面
import blockDetailComponent from 'pages/block_detail'
//地址详情页面
import addressDetailComponent from 'pages/address_detail'

//no results
import noResultComponent from 'pages/no_results'
//404
import noPageComponent from 'pages/error/404'

Vue.use(VueRouter);

//使用AMD方式加载
// component: resolve => require(['pages/home'], resolve),
const routes = [{
  path: '/404',
  name: 'notPage',
  component: noPageComponent
}, {
  path: '*',
  redirect: '/404'
}, {
    path: '/transaction',
    name: 'inkTransaction',
    component: transactionComponent,
}, {
    path: '/holders',
    name: 'inkHolders',
    component: holdersComponent,
},{
    path: '/block',
    name: 'inkBlock',
    component: blockComponent,
},{
    path: '/no-results',
    name: 'noResults',
    component: noResultComponent,
},{
    path: '/tx/:tx_id',
    name: 'transactionDetail',
    component: transactionDetailComponent
},{
    path: '/block/:block_hash',
    name: 'blockDetail',
    component: blockDetailComponent
},{
    path: '/address/:address_hash',
    name: 'addressDetail',
    component: addressDetailComponent
}, {
  path: '/',
  redirect: '/',
  component: viewPageComponent,
  children: [{
    path: '/',
    name: 'homePage',
    component: homeComponent,
  }]
}]

const router = new VueRouter({
  routes,
  mode: 'history', //default: hash ,history
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

//全局路由配置
//路由开始之前的操作
router.beforeEach((to, from, next) => {
  NProgress.done().start()
    next();
})

//路由完成之后的操作
router.afterEach(route => {
  NProgress.done()
});

export default router
