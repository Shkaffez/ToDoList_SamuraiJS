import { ResultCode } from '../DAL/baseApi';
import { securityAPI } from '../DAL/securityAPI';
import { authAPI } from './../DAL/authAPI';
import { InferActionTypes, BaseThunkType } from './ReduxStore';
import { loadTodoLists } from './TodoListReduser';




export const Actions = {
    setUserData: (login: string, email: string, id: number, isAuth: boolean) =>
         ( {type: 'AUTH/SET_USER_DATA', payload: { login, email, id, isAuth } } as const ),
    fetchingInProgress: () => ( {type: 'AUTH/FETCHING_IN_PROGRESS'} as const),
    fetchingSuccess: () => ( {type: 'AUTH/FETCHING_SUCCESS'} as const),
    fetchUser: (email: string, password: string, rememberMe: boolean, captch: string | undefined) => 
        ( {type: 'AUTH/FETCH_USER', payload: { email, password, rememberMe, captch}} as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ( {type: 'AUTH/GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}} as const ),
    setLoginError: (loginError: string) => ( {type: 'AUTH/SET_LOGIN_ERROR', payload: { loginError }} as const)
}

const initialState = {
    login: null as string | null,
    email: null as string | null,
    id: null as number | null,
    isAuth: false,   
    fetchingInProgress: false,
    loginError: null as string | null,
    captchaUrl: null as string | null,
}


const authReduser = (state = initialState, action: ActionTypes) : InitialStateType => {
    switch(action.type) {
        case 'AUTH/SET_USER_DATA':
        case 'AUTH/GET_CAPTCHA_URL_SUCCESS':
        case 'AUTH/SET_LOGIN_ERROR':
            return {
            ...state, ...action.payload
        }
        case 'AUTH/FETCHING_IN_PROGRESS': return {
            ...state, fetchingInProgress: true
        }
        case 'AUTH/FETCHING_SUCCESS': return {
            ...state, fetchingInProgress: false
        }
        default: return state;
    }
}

export const authentication = (): BaseThunkType<ActionTypes> => async (dispatch: any) => {
    const data = await authAPI.authMe();
    if(data.resultCode === ResultCode.Success) {
        const { id, email, login } = data.data;
        dispatch(Actions.setUserData(login, email, id, true));
    }
}

export const login =
 (email: string, password: string, rememberMe: boolean, captcha: string ): BaseThunkType<ActionTypes> =>
    async (dispatch: any) => {
        dispatch(Actions.fetchingInProgress());
        const data = await authAPI.login(email, password, rememberMe, captcha);
        await dispatch(loadTodoLists());
       
        dispatch(Actions.fetchingSuccess());
        if(data.resultCode === ResultCode.Success) {
            dispatch(authentication());
        }
        else {
            if(data.resultCode === ResultCode.CaptchIsRequired) {
                dispatch(getCaptchaUrl());
            }             
            const message = data.messages.length > 0 ? data.messages[0] : "login error";
            dispatch(Actions.setLoginError(message));

        }

    }

export const getCaptchaUrl = (): BaseThunkType<ActionTypes> => async (dispatch: any) => {
    const data = await securityAPI.getCaptchUrl();
    const captchaURL = data.url;       
    dispatch(Actions.getCaptchaUrlSuccess(captchaURL));
}


export type ActionTypes = InferActionTypes<typeof Actions>;

export default authReduser;




type InitialStateType = typeof initialState;