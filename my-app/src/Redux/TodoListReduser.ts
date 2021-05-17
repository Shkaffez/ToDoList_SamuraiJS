import { todoListsAPI } from './../DAL/todoListsAPI';
import { InferActionTypes, BaseThunkType } from './ReduxStore';
import { TodoListType } from "../DAL/todoListsAPI";


export const Actions = {
    setTodoLists: (todoLists: Array<TodoListType>) => 
    ( {type: 'TODOLISTS/SET_TODOLISTS', payload: {todoLists}} as const),
    setCurrentList: (todoListNumber: number) =>
     ( {type: 'TODOLISTS/SET_CURRENT_TODOLIST',  todoListNumber } as const),
    addTodoList: (todoList: TodoListType) => 
    ( {type: 'TODOLISTS/ADD_TODOLIST',   todoList} as const),
    fetchingInProgress: () => ( {type: 'TODOLISTS/FETCHING_IN_PROGRESS'} as const),
    fetchingSuccess: () => ( {type: 'TODOLISTS/FETCHING_SUCCESS'} as const),
}



const initialState = {
    todoLists : [
        {
            title: "Первый тудуЛист",
            id: "csdsfsf",
            addedDate: new Date(),
            order: 0,
        },        
        {
            title: "Второй тудуЛист",
            id: "ggfsgsfg",
            addedDate: new Date(),
            order: 1,
        },
        {
            title: "Третий тудуЛист",
            id: "sfsgfad",
            addedDate: new Date(),
            order: 2,
        }
    ] as Array<TodoListType>,
    currentList: 0,
    fetchingInProgress: false,
}



const todoListReduser = (state = initialState, action: ActionTypes) : InitialStateType => {
    switch(action.type) {
        case 'TODOLISTS/SET_TODOLISTS':
            return {
                ...state, ...action.payload
            }
        case 'TODOLISTS/SET_CURRENT_TODOLIST':
            return {
                ...state, currentList: action.todoListNumber
            }
        case 'TODOLISTS/ADD_TODOLIST':
            return {
                ...state, todoLists: [...state.todoLists, action.todoList]
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


export const loadTodoLists = (): BaseThunkType<ActionTypes> => async (dispatch: any) => {
    dispatch(Actions.fetchingInProgress());
    const data = await todoListsAPI.getAllTodoLists();
    dispatch(Actions.fetchingSuccess());    
    dispatch(Actions.setTodoLists(data));
}





export type ActionTypes = InferActionTypes<typeof Actions>;
type InitialStateType = typeof initialState;

export default todoListReduser;

