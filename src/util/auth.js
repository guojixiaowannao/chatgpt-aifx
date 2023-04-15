import Cookies from 'js-cookie'

var inFifteenMinutes = new Date(new Date().getTime() + 100000 * 60 * 1000);

export function getToken(title) {
    return Cookies.get(title)
}

export function setToken(title, token, time = inFifteenMinutes) {
    console.log(time)
    return Cookies.set(title, token, {
        expires: time
    })
}

export function removeToken(title) {
    return Cookies.remove(title)
}