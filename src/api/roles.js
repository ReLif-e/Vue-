import request from '@/utils/request'
/**
 *
 * 获取角色列表的接口
 *
 */
export function getRoles(params) {
  return request({
    url: '/sys/role',
    method: 'get',
    params
  })
}

/**
 *
 * 点击按钮删除角色的接口
 *
 */
export function subRoles(id) {
  return request({
    url: '/sys/role/' + id,
    method: 'delete'
  })
}
