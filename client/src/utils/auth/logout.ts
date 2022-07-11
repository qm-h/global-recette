import Cookie from 'js-cookie'

export const logout = (setIsAuthenticated, setUser, setUUID) => {
    Cookie.remove('user')
    Cookie.remove('userUUID')
    Cookie.remove('jwt_token')
    setIsAuthenticated(false)
    setUser({})
    setUUID('')
}
