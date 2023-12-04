import request from '@/utils/request'

//查询员工列表
export function getRyStaffList(query){
    return request({
        url:'/system/ryStaff/list',
        method:'get',
        params:query
    })
} 

// 根据员工编号查询员工信息
export function getRyStaff(staffNumber){
    return request({
        url:'/system/ryStaff/'+staffNumber,
        method:'get'
    })
}

// 新增员工信息
export function insertRyStaff(data){
    return request({
        url:'/system/ryStaff',
        method:'post',
        data:data
    })
}

// 修改员工信息
export function updateRyStaff(data){
    return request({
        url:'/system/ryStaff',
        method:'put',
        data:data
    })
}

// 删除员工信息
export function deleteRyStaff(staffNumbers){
    return request({
        url:'/system/ryStaff/'+staffNumbers,
        method:'delete'
    })
} 

// 上传头像
export function upload(data){
    return request({
        url:'/system/ryStaff/upload',
        headers:{'Content-Type': 'multipart/form-data'},
        method:'post',
        data:data
    })
} 

// 上传文件(增加)
export function importExcel01(data){
    return request({
        url:'/system/ryStaff/importExcel01',
        headers:{'Content-Type': 'multipart/form-data'},
        method:'post',
        data:data
    })
} 

// 上传文件(修改)
export function importExcel02(data){
    return request({
        url:'/system/ryStaff/importExcel02',
        headers:{'Content-Type': 'multipart/form-data'},
        method:'post',
        data:data
    })
} 

// 导入Excel文件
export function importExcel(data){
    return request({
        url:'/system/ryStaff/importExcel',
        method:'post',
        data:data
    })
} 
// 导出Excel文件
export function exportExcel(data){
    return request({
        url:'/system/ryStaff/exportExcel',
        method:'get',
        data:data
    })
} 