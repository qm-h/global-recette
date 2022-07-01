import { AuthResponse, AuthUser, User } from '../../../server/src/shared/types'

import { AuthRequest } from '../../../server/src/shared/types'
import axios from 'axios'

export function getUser(id: number): Promise<User> {
    return axios
        .get(`/api/login/${id}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function registerUser(data: AuthRequest): Promise<number | void> {
    return axios
        .post('/api/auth/signup', {
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            avatar: data.avatar,
        })
        .then((res) => res.status)
        .catch((err) => console.log(err))
}

export function userAuth(data: AuthUser): Promise<AuthResponse> {
    return axios
        .post('/api/auth/signin', {
            email: data.email,
            password: data.password,
        })
        .then((res) => {
            const user = res.data
            return { ...user }
        })
        .catch((err) => console.log(err))
}

export function userLogout(userID: number) {
    return axios
        .post('/api/auth/signout', {
            userID: userID,
        })
        .then((res) => res.status)
        .catch((err) => console.log(err))
}