import { instance, CommonResponseType, ResultCode } from './baseApi';



export const authAPI = {
    login(email: string, password: string, rememberMe: boolean, captcha: string | null = null) {
        return instance.post<CommonResponseType>('auth/login', { email, password, rememberMe, captcha }).then(res => res.data);
    },

    logout() {
        return instance.delete<CommonResponseType>('auth/login').then(res => res.data);
    },

    authMe() {
        return instance.get<AuthMeResponseType>('auth/me').then(res => res.data);
    }

};

export type AuthMeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCode
    message: Array<string>
}
