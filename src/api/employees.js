import request from '@/utils/request'
/**
 *
 * @returns 获取公司全部人的名称下拉框
 */
export function GetEmployess() {
  return request({
    method: 'get',
    url: '/sys/user/simple'
  })
}

/**
 *
 * @returns 获取员工列表,渲染表单
 */
export function Getemploy(params) {
  return request({
    method: 'get',
    url: '/sys/user',
    params
  })
}
