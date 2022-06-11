import Vue from 'vue'
// 重置css样式:padding:0 margin:0等
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 导入语言包
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n英语
import locale from 'element-ui/lib/locale/lang/ja' // lang i18n

//global 全局css
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import i18n from '@/lang'

// 公共组件注册-----------------------------------------------------
// 第一个参数是v-XXX  的名字
Vue.directive('allow', {
  inserted(el, binding) {
    // console.log(el) el 是当前绑定的元素
    // console.log(binding)  元素内部的属性

    // poins是登入时获取的登入人的全部信息
    const poins = store.state.user.getUser.roles.points

    // 如果登入的权限信息里面没有按钮级权限的文字,那么就不会显示
    if (!poins.includes(binding.value)) {
      el.remove() // 自我删除
    }
  }
})
// import PageTool from '@/components/PageTool'
// // 第一个是自定义的,第二个是导入的文件名
// Vue.component('PageTool', PageTool)
import MYUI from '@/components'
Vue.use(MYUI)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') { //关掉上线的mock
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
