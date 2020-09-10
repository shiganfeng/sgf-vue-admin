import service from '../utils/request.js'

//获取用户列表
export function GetUserList(data) {
    return service.request({
        method: 'post',
        url: '/user/getList/',
        data: data
    })
}

//获取省
export function GetCityPicker(data) {
    return service.request({
        method: 'post',
        url: '/cityPicker/',
        data: data
    })
}

//获取角色
export function GetRole(data = {}) {
    return service.request({
        method: 'post',
        url: '/role/',
        data: data
    })
}

//获取用户角色(动态路由)
export function GetSystemRole(data = {}) {
    return service.request({
        method: 'post',
        url: '/userRole/',
        data: data
    })
}


//获取系统
export function GetSystem(data = {}) {
    return service.request({
        method: 'post',
        url: '/system/',
        data: data
    })
}

//增加用户
export function UserAdd(data) {
    return service.request({
        method: 'post',
        url: '/user/add/',
        data: data
    })
}

//删除用户
export function UserDelete(data) {
    return service.request({
        method: 'post',
        url: '/user/delete/',
        data: data
    })
}

//用户禁启用
export function UserActive(data) {
    return service.request({
        method: 'post',
        url: '/user/actives/',
        data: data
    })
}

//用户编辑
export function UserEdit(data) {
    return service.request({
        method: 'post',
        url: '/user/edit/',
        data: data
    })
}