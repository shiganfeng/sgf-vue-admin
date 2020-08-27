import service from '../utils/request.js'
//列表


//新增


//编辑
export function EditInfo(data) {
    return service.request({
        method: 'post',
        url: '/news/editInfo/',
        data: data
            //左边的data是变量名（key）后台接受的，右边的data是接受的参数，如果两者同名的情况下，可以写一个即可（es6写法）
    })
}

//删除
export function DeleteInfo(data) {
    return service.request({
        method: 'post',
        url: '/news/deleteInfo/',
        data: data
            //左边的data是变量名（key）后台接受的，右边的data是接受的参数，如果两者同名的情况下，可以写一个即可（es6写法）
    })
}


//一级分类添加
export function AddFirstCategory(data) {
    return service.request({
        method: 'post',
        url: '/news/addFirstCategory/',
        data: data
            //左边的data是变量名（key）后台接受的，右边的data是接受的参数，如果两者同名的情况下，可以写一个即可（es6写法）
    })
}

//子级添加
export function AddChildrenCategory(data) {
    return service.request({
        method: 'post',
        url: '/news/addChildrenCategory/',
        data: data
            //左边的data是变量名（key）后台接受的，右边的data是接受的参数，如果两者同名的情况下，可以写一个即可（es6写法）
    })
}

//获取分类
export function GetCategory(data) {
    return service.request({
        method: 'post',
        url: '/news/getCategory/',
        data: data
            //左边的data是变量名（key）后台接受的，右边的data是接受的参数，如果两者同名的情况下，可以写一个即可（es6写法）
    })
}

//获取所有分类(包含子级)
export function GetCategoryAll(data) {
    return service.request({
        method: 'post',
        url: '/news/getCategoryAll/',
        data: data
            //左边的data是变量名（key）后台接受的，右边的data是接受的参数，如果两者同名的情况下，可以写一个即可（es6写法）
    })
}

//删除分类
export function DeleteCategory(data) {
    return service.request({
        method: 'post',
        url: '/news/deleteCategory/',
        data: data
            //左边的data是变量名（key）后台接受的，右边的data是接受的参数，如果两者同名的情况下，可以写一个即可（es6写法）
    })
}

//修改分类
export function EditCategory(data) {
    return service.request({
        method: 'post',
        url: '/news/editCategory/',
        data: data
            //左边的data是变量名（key）后台接受的，右边的data是接受的参数，如果两者同名的情况下，可以写一个即可（es6写法）
    })
}

//新增信息
export function AddInfo(data) {
    return service.request({
        method: 'post',
        url: '/news/add/',
        data: data
            //左边的data是变量名（key）后台接受的，右边的data是接受的参数，如果两者同名的情况下，可以写一个即可（es6写法）
    })
}

//列表信息
export function GetList(data) {
    return service.request({
        method: 'post',
        url: '/news/getList/',
        data: data
            //左边的data是变量名（key）后台接受的，右边的data是接受的参数，如果两者同名的情况下，可以写一个即可（es6写法）
    })
}