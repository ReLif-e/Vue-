// import request from '@/utils/request'
import service from '@/utils/request'
/**
 *
 * @param {Object} data 要传递的数据是Mobile 和 Password
 * @returns 返回的是一个promise------------
 * login是调用axios的方法
 */
export function login(data) {
  return service({
    method: 'post',
    url: 'sys/login',
    data
  })
}
/**
 *
 * @returns 获取用户信息
 */
export function getInfo() {
  return service({
    method: 'post',
    url: '/sys/profile'

  })
}
/**
 *
 * @returns 再次获取员工信息的第二次请求，获取头像
 */
export function getuserDetailById(id) {
  return service({
    method: 'get',
    url: '/sys/user/' + id

  })
}

export function logout() {

}
