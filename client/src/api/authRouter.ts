import { AuthResponse, AuthUser, User } from '../../../server/src/shared/types'

import { AuthRequest } from './../../../server/src/shared/types'
import axios from 'axios'

export function getUser(id: number): Promise<User> {
    return axios
        .get(`/api/login/${id}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function registerUser(data: AuthRequest): Promise<number | void> {
    return axios
        .post('/api/auth/register', {
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
        })
        .then((res) => res.status)
        .catch((err) => console.log(err))
}

export function authentication(data: AuthUser): Promise<AuthResponse> {
    return axios
        .post('/api/auth/login', {
            email: data.email,
            password: data.password,
        })
        .then((res) => {
            const user = res.data
            return { ...user }
        })
        .catch((err) => console.log(err))
}
