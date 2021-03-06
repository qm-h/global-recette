import {
    AuthResponse,
    AuthUser,
    ExpressResponseMessageType,
    ResetPasswordRequest,
    User,
} from '../../../server/src/shared/types'

import { AuthRequest } from '../../../server/src/shared/types'
import axios from 'axios'

export function getUser(id: number): Promise<User> {
    return axios
        .get(`/api/login/${id}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function registerUser(
    data: AuthRequest
): Promise<ExpressResponseMessageType> {
    return axios
        .post('/api/auth/signup', {
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            generated_avatar: data.generated_avatar,
        })
        .then((res) => res.data)
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

export function userLogout(
    userID: number
): Promise<ExpressResponseMessageType> {
    return axios
        .post('/api/auth/signout', {
            userID: userID,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function forgotPassword(
    email: string
): Promise<ExpressResponseMessageType> {
    return axios
        .post('/api/auth/forgot-password', {
            email: email,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function resetPassword(
    data: ResetPasswordRequest
): Promise<ExpressResponseMessageType> {
    console.log(data)
    return axios
        .post('/api/auth/reset-password', {
            password: data.password,
            token: data.token,
        })
        .then((res) => {
            console.log(res.data)
            return res.data
        })
        .catch((err) => console.log(err))
}

export function sendConfirmationRegisterEmail(
    email: string
): Promise<ExpressResponseMessageType> {
    return axios
        .post('/api/auth/send-email-confirmation', {
            email: email,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function confirmRegister(
    token: string
): Promise<ExpressResponseMessageType> {
    return axios
        .post('/api/auth/confirm-email', {
            token: token,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function hasUUID(uuid: string): Promise<ExpressResponseMessageType> {
    return axios
        .post('/api/auth/has-uuid', {
            uuid: uuid,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function deleteAccount(
    userID: number,
    userUUID: string,
    email: string
): Promise<ExpressResponseMessageType> {
    return axios
        .post(`/api/auth/delete-account/${userID}`, {
            userID: userID,
            userUUID: userUUID,
            email: email,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err))
}
