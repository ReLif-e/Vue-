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

export function getInfo(token) {

}

export function logout() {

}
