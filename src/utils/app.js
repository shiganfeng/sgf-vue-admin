import cookie from "cookie_js";

const adminToken = 'admin_token'
const usernameKey = 'username'

export function getToken() {
    return cookie.get(adminToken)
}

export function setToken(toKen) {
    return cookie.set(adminToken, toKen)
}

export function removeToken(toKen) {
    console.log('removeToken')
    return cookie.remove(adminToken)
}


export function setUserName(value) {
    return cookie.set(usernameKey, value)
}

export function getUserName() {
    return cookie.get(usernameKey)
}

export function removeUserName(value) {
    return cookie.remove(usernameKey)
}


export function removeOpenTab(value) {
    return localStorage.removeItem('tabSwitch')
}

export function resetActiveIndex(value) {
    return localStorage.setItem('activeIndex', value)
}