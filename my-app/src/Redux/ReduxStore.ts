import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import authReduser from "./AuthReduser";
import ReduxThunk, { ThunkAction } from "redux-thunk";
import todoListReduser from "./TodoListReduser";
import tasksReduser from "./TasksReduser"
import appReduser from "./AppReduser";






const rootReduser = combineReducers({
    auth: authReduser,
    todoLists: todoListReduser,
    tasks: tasksReduser,
    app: appReduser,
});

type RootReduserType = typeof rootReduser;
export type AppStateType = ReturnType<RootReduserType>;

type PropertiesTypes<T> = T extends {[key: string] : infer U} ? U : never; 
//Если T являеся объектом, у которого ключ строка, то с помощью infer выведи мне тип значения и верни, а
//в противном случае ничего не возвращай.

export type InferActionTypes<T extends {[key: string]: (...args: any[])=> any}> = ReturnType< PropertiesTypes<T>>
//На тип T наложено ограниечение, он может быть только объектом с ключем стринг и значением функцией,
//принимающей и возвращающей что-то. В InferActionTypes записывается тип, полученный с помощью ReturnType
//В итоге в InferActionTypes внутрь <> можно передать typeof объекта, содержащего в себе action creator'ы, 
//и он выведет их типы.

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>;

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReduser, composeEnhancers(applyMiddleware(ReduxThunk)));


export default store;

