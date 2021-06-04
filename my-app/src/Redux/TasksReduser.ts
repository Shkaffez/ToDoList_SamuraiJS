import { ResultCode } from "../DAL/baseApi";
import { tasksAPI, TaskType } from "../DAL/tasksAPI";
import { BaseThunkType, InferActionTypes } from "./ReduxStore";


const Actions = {
    setTasks: (tasks: Array<TaskType>) => 
    ( {type: 'TASKS/SET_TASKS', payload: {tasks}} as const),
    setCurrentTask: (task: number) =>
     ( {type: 'TASKS/SET_CURRENT_TASK',  task } as const),
    addTask: (task: TaskType) => 
    ( {type: 'TASKS/ADD_TASK', task} as const )
}


const initialState ={
    tasks: [] as Array<TaskType>,
    currentTask: 0   
}

const tasksReduser = (state = initialState, action: ActionTypes) : InitialStateType => {
    switch(action.type){
        case "TASKS/SET_TASKS": {
            return {
                ...state, ...action.payload
            }
        }
        case "TASKS/SET_CURRENT_TASK": {
            return {
                ...state, currentTask: action.task
            }
        }
        case "TASKS/ADD_TASK": {
            return {
                ...state, tasks: [...state.tasks, action.task]
            }
        }        
        default: return state
    }    
}

export const getAllTasks = (todolistId: string):BaseThunkType<ActionTypes> => async (dispatch) => {
    const data = await tasksAPI.getTasks(todolistId);    
    if(!data.error) {
        dispatch(Actions.setTasks(data.items))
    } else if (data.error) {
        alert(data.error);
    }
}

export const createTask = (todolistId: string, title: string):BaseThunkType<ActionTypes> => async (dispatch) => {
    const data = await tasksAPI.createTask(todolistId, title);    
    if(data.resultCode === ResultCode.Success) {
        dispatch(Actions.addTask(data.data.item))
    } else if (data.resultCode === ResultCode.Error) {
        alert(data.messages[0]);
    }

}

export default tasksReduser;

type InitialStateType = typeof initialState;

export type ActionTypes = InferActionTypes<typeof Actions>;