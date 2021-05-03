import { instance } from "./baseApi"


export const securityAPI = {
    getCaptchUrl: () => {
        return instance.get<string>('security/get-captcha-url').then(response => response.data);
    }
}