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

// -------------------------
/**
 *
 * 添加部门的接口
 *
 */
export function AddDepartment(data) {
  return request({
    method: 'post',
    url: '/company/department',
    data
  })
}

// -------------------------
/**
 *
 *通过点击按钮的id来回填数据内容
 *
 */
export function getByid(id) {
  return request({
    method: 'get',
    url: '/company/department/' + id
  })
}

// -------------------------
/**
 *
 * 更新数据的接口
 *
 */
export function putByid(data) {
  return request({
    method: 'put',
    url: '/company/department/' + data.id,
    data
  })
}

// -------------------------
/**
 *
 * 删除部门的接口
 *
 */
export function DelId(id) {
  return request({
    method: 'delete',
    url: '/company/department/' + id
  })
}
