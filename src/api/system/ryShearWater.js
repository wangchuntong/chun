import request from '@/utils/request'

// 查询列表
export function listRyShearWater(query) {
  return request({
    url: '/system/shearWater/selectRyShearWaterList',
    method: 'get',
    params: query
  })
}

//修改中的获取
export function getRyShearWater(sname) {
  return request({
    url: '/system/shearWater/' + sname,
    method: 'get'
  })
}

// 增加
export function addRyShearWater(data) {
  return request({
    url: '/system/shearWater',
    method: 'post',
    data: data
  })
}

// 修改
export function updateRyShearWater(data) {
  return request({
    url: '/system/shearWater',
    method: 'put',
    data: data
  })
}

// 删除
export function delRyShearWater(snames) {
  return request({
    url: '/system/shearWater/' + snames,
    method: 'delete'
  })
}
