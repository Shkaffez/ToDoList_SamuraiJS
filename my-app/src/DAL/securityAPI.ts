import { instance } from "./baseApi"


export const securityAPI = {
    getCaptchUrl: () => {
        return instance.get<SecurityResponseType>('security/get-captcha-url').then(response => response.data);
    }
}

type SecurityResponseType = {
    url: string
}