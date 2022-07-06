import Cookie from 'js-cookie'
import { User } from '../../../server/src/shared/types'

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
