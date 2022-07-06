import Cookie from 'js-cookie'

export const logout = (setIsAuthenticated, setUser, setUUID) => {
    Cookie.remove('user')
    Cookie.remove('userUUID')
    setIsAuthenticated(false)
    setUser({})
    setUUID('')
}
