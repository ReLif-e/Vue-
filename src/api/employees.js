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
/**
 *
 * 表单点击删除按钮
 *
 */
export function delEmployee(id) {
  return request({
    method: 'delete',
    url: `/sys/user/${id}`
  })
}

/**
 *
 * 表单添加员工按钮
 *
 */
export function addEmployee(data) {
  return request({
    method: 'post',
    url: `/sys/user`,
    data
  })
}

/**
 *
 * 批量导入员工接口
 *
 */
export function importEmployee(data) {
  return request({
    method: 'post',
    url: `/sys/user/batch`,
    data
  })
}
