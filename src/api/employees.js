import request from '@/utils/request'
/**
 *
 * @returns 获取公司全部人的名称
 */
export function GetEmployess() {
  return request({
    method: 'get',
    url: '/sys/user/simple'
  })
}
