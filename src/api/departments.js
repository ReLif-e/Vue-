import request from '@/utils/request'
/**
 *
 * @returns 获取组织架构
 */
export function GetList() {
  return request({
    method: 'get',
    url: '/company/department'
  })
}

export function AddDepartment(data) {
  return request({
    method: 'post',
    url: '/company/department',
    data
  })
}

export function getByid(id) {
  return request({
    method: 'get',
    url: '/company/department/' + id
  })
}

export function putByid(data) {
  return request({
    method: 'put',
    url: '/company/department/' + data.id,
    data
  })
}

export function DelId(id) {
  return request({
    method: 'delete',
    url: '/company/department/' + id
  })
}
