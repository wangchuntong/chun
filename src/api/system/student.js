import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listStudent(query) {
  return request({
    url: '/system/student/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getStudent(name) {
  return request({
    url: '/system/student/' + name,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addStudent(data) {
  return request({
    url: '/system/student',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateStudent(data) {
  return request({
    url: '/system/student',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delStudent(name) {
  return request({
    url: '/system/student/' + name,
    method: 'delete'
  })
}
