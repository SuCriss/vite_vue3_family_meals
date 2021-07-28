import Cookie from 'js-cookie'
const TokenKey = 'token'
const RefreshTokenKey = 'refresh-token'

export function getToken(){
    return Cookie.get(TokenKey)
}

export function getTokenKey(){
    return TokenKey
}
export function getRefreshTokenKey(){
    return RefreshTokenKey
}

export function setToken(token:any){
    return Cookie.set(TokenKey,token)
}
export function getRefreshToken(){
    return Cookie.get(RefreshTokenKey)
}

export function setRefreshToken(refreshToken:any){
    return Cookie.set(RefreshTokenKey,refreshToken)
}

export function removeToken(){
    Cookie.remove(TokenKey);
    Cookie.remove(RefreshTokenKey)
}