import { todoListsAPI } from './../DAL/todoListsAPI';
import { InferActionTypes, BaseThunkType } from './ReduxStore';
import { TodoListType } from "../DAL/todoListsAPI";
import { ResultCode } from '../DAL/baseApi';


export const Actions = {
    fetchingInProgress: () => ( {type: 'TODOLISTS/FETCHING_IN_PROGRESS'} as const),
    fetchingSuccess: () => ( {type: 'TODOLISTS/FETCHING_SUCCESS'} as const),
    setTodoLists: (todoLists: Array<TodoListType>) => 
    ( {type: 'TODOLISTS/SET_TODOLISTS', payload: {todoLists}} as const),
    setCurrentList: (todoListId: string) =>
     ( {type: 'TODOLISTS/SET_CURRENT_TODOLIST',  todoListId } as const),
    addTodoList: (todoList: TodoListType) => 
    ( {type: 'TODOLISTS/ADD_TODOLIST',   todoList} as const),
    removeTodoList: (todoListId: string) => 
    ( {type: 'TODOLISTS/REMOVE_TODOLIST', todoListId} as const ),
    updateTitle: (todolistId: string, title: string) => 
    ( {type: 'TODOLISTS/UPDATE_TITLE', payload: {todolistId, title}} as const ),
}



const initialState = {
    todoLists : [] as Array<TodoListType>,
    currentList: "",
    fetchingInProgress: false,
}



const todoListReduser = (state = initialState, action: ActionTypes) : InitialStateType => {
    switch(action.type) {
        case 'TODOLISTS/SET_TODOLISTS': return {
                ...state, ...action.payload
            }
        case 'TODOLISTS/SET_CURRENT_TODOLIST': return {
                ...state, currentList: action.todoListId
            }
        case 'TODOLISTS/ADD_TODOLIST': return {
                ...state, todoLists: [...state.todoLists, action.todoList]
            }
        case 'TODOLISTS/REMOVE_TODOLIST': return {
            ...state, todoLists: state.todoLists.filter(todoList => todoList.id !== action.todoListId)
        }
        case 'TODOLISTS/UPDATE_TITLE': 
        let todoList = state.todoLists.find(todoList => todoList.id === action.payload.todolistId);
        if(!todoList) {
            return {
                ...state
            } 
        }
        if(todoList) {
            todoList.title = action.payload.title;
        }
        return {
            ...state, todoLists: [...state.todoLists
                    .filter(todoList => todoList.id !== action.payload.todolistId), todoList]
        }
        case 'TODOLISTS/FETCHING_IN_PROGRESS': return {
            ...state, fetchingInProgress: true
        }
        case 'TODOLISTS/FETCHING_SUCCESS': return {
            ...state, fetchingInProgress: false
        }
        default: return state            
        
            
    }
}


export const loadTodoLists = (): BaseThunkType<ActionTypes> => async (dispatch) => {
    dispatch(Actions.fetchingInProgress());
    const data = await todoListsAPI.getAllTodoLists();
    dispatch(Actions.fetchingSuccess());    
    dispatch(Actions.setTodoLists(data));
}

export const createTodoList = (todoListTitle: string): BaseThunkType<ActionTypes> => async (dispatch) => {
    const data = await todoListsAPI.createTodoList(todoListTitle);
    if(data.resultCode === ResultCode.Success) {
        dispatch(Actions.addTodoList(data.data.item));
    }
    else if(data.resultCode === ResultCode.Error) {
        alert(data.messages[0]);
    }
}

export const deleteTodoList = (todoListId: string): BaseThunkType<ActionTypes> => async (dispatch) => {
    const data = await todoListsAPI.deleteTodoList(todoListId);
    if(data.resultCode === ResultCode.Success) {
        dispatch(Actions.removeTodoList(todoListId));
    }
    else if(data.resultCode === ResultCode.Error) {
        alert(data.messages[0]);
    }  
}

export const updateTodoList = (todolistId: string, title: string): BaseThunkType<ActionTypes> => 
    async (dispatch) => {
    const data = await todoListsAPI.updateTodoListTitle(todolistId, title);
    if(data.resultCode === ResultCode.Success) {
        dispatch(Actions.updateTitle(todolistId, title));
    }
    else if(data.resultCode === ResultCode.Error) {
        alert(data.messages[0]);
    }  
}



export type ActionTypes = InferActionTypes<typeof Actions>;
type InitialStateType = typeof initialState;

export default todoListReduser;

