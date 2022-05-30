import router from '@/router'

// 导入进度条
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

// 引入token
import store from '@/store'
import getPageTitle from './utils/get-page-title'

// 设置白名单
const witchlist = ['/login', '/404']
// to,去哪，from从哪来，next放行
// 前置路由守卫
router.beforeEach(async(to, from, next) => {
  // console.log(to, from)
  NProgress.start()// 进度条开始
  const token = store.state.user.token
  if (token) {
    if (!store.getters.userid) { // 如果没有Id那么就发送请求
      await store.dispatch('user/GetUserInfo')
    }
    if (to.path === '/login') {
      NProgress.done()
      next('/')
    } else {
      next()
    }
  } else {
    if (witchlist.includes(to.path)) {
      next()
    } else {
      NProgress.done()// 进度条结束
      next('/login')
    }
  }
})

// 路由后置守卫
router.afterEach((to, from) => {
  // console.log(to)
  NProgress.done()
  document.title = getPageTitle(to.meta.title)
})
// import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist

// router.beforeEach(async(to, from, next) => {
//   // start progress bar
//   NProgress.start()

//   // set page title
//   document.title = getPageTitle(to.meta.title)

//   // determine whether the user has logged in
//   const hasToken = getToken()

//   if (hasToken) {
//     if (to.path === '/login') {
//       // if is logged in, redirect to the home page
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       const hasGetUserInfo = store.getters.name
//       if (hasGetUserInfo) {
//         next()
//       } else {
//         try {
//           // get user info
//           await store.dispatch('user/getInfo')

//           next()
//         } catch (error) {
//           // remove token and go to login page to re-login
//           await store.dispatch('user/resetToken')
//           Message.error(error || 'Has Error')
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else {
//     /* has no token*/

//     if (whiteList.indexOf(to.path) !== -1) {
//       // in the free login whitelist, go directly
//       next()
//     } else {
//       // other pages that do not have permission to access are redirected to the login page.
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
// })

// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })
