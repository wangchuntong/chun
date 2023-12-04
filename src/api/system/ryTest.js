import request from '@/utils/request'

//查询列表
//params 是请求参数，query 是请求参数的对象。 
export function getRyTestList(query) {
    return request({
        url: '/system/ryTest/list',
        method: 'get',
        params: query
    })
}

// 根据id查询
export function getRyTestById(id) {
    return request({
        url: '/system/ryTest/id/' + id,
        method: 'get'
    })
}

// 根据month查询
export function getRyTestByMonth() {
    return request({
        url: '/system/ryTest/month',
        method: 'get'
    })
}

// 新增
//data 是请求数据，data 是请求数据的对象。 
export function insertRyTest(data) {
    return request({
        url: '/system/ryTest',
        method: 'post',
        data: data
    })
}

// 修改
export function updateRyTest(data) {
    return request({
        url: '/system/ryTest',
        method: 'put',
        data: data
    })
}

// 删除
export function deleteRyTests(names) {
    return request({
        url: '/system/ryTest/' + names,
        method: 'delete'
    })
}