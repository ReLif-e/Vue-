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

/**
 *
 * 点击按钮添加角色的接口
 *
 */
export function addRoles(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}

/**
 *
 * 点击按钮更新角色的接口
 *
 */
export function putRoles(data) {
  return request({
    url: '/sys/role/' + data.id,
    method: 'put',
    data
  })
}

/**
 *
 * 点击按钮获取角色权限
 *
 */
export function GetRoleDetail(id) {
  return request({
    url: '/sys/role/' + id,
    method: 'get'
  })
}

/**
 *
 * 点击按钮更新角色权限信息
 *
 */
export function PutRoleDetail(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
