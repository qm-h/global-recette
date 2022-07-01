import { User } from '../../../../server/src/shared/types'
import Cookie from 'js-cookie'

export const createUser = (user: User) => user

export const createCookies = (
    name: string,
    saveData: any,
    expiration: number
) => {
    Cookie.set(name, JSON.stringify(saveData), {
        expires: expiration,
    })
}
