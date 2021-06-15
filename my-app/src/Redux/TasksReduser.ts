import { ResultCode } from "../DAL/baseApi";
import { tasksAPI, TaskType } from "../DAL/tasksAPI";
import { BaseThunkType, InferActionTypes } from "./ReduxStore";


export const Actions = {
    setTasks: (tasks: Array<TaskType>) => 
    ( {type: 'TASKS/SET_TASKS', tasks} as const),
    setCurrentTask: (task: number) =>
     ( {type: 'TASKS/SET_CURRENT_TASK',  task } as const),
    addTask: (task: TaskType) => 
    ( {type: 'TASKS/ADD_TASK', task} as const),
    setTasksRecived: (todoListId: string) => 
    ( {type: 'TASKS/SET_TASKS_RECIVED', todoListId} as const),
    removeTask: (taskId: string) => 
    ({type: 'TASKS/REMOVE_TASK', taskId} as const)
}


const initialState ={
    tasks: [] as Array<TaskType>,
    currentTask: 0,
    isTasksRecived: [] as Array<string> // Array of TodoListsID, whose tasks recived
}

const tasksReduser = (state = initialState, action: ActionTypes) : InitialStateType => {
    switch(action.type){
        case "TASKS/SET_TASKS": {
            return {
                ...state, tasks: [...state.tasks, ...action.tasks]
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
        case "TASKS/SET_TASKS_RECIVED": {
            return {
                ...state, isTasksRecived: [...state.isTasksRecived, action.todoListId]
            }
        } 
        case "TASKS/REMOVE_TASK": {
            return {
                ...state, tasks: state.tasks.filter(task => task.id !== action.taskId)
            }
        }  
        default: return state
    }    
}

export const getAllTasks = (todolistId: string):BaseThunkType<ActionTypes> => async (dispatch) => {
    const data = await tasksAPI.getTasks(todolistId);    
    if(!data.error) {
        dispatch(Actions.setTasks(data.items));
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

export const deleteTask = (todolistId: string, taskId: string): BaseThunkType<ActionTypes> => async (dispatch) => {
    const data = await tasksAPI.deleteTask(todolistId, taskId);
    if(data.resultCode === ResultCode.Success) {
        dispatch(Actions.removeTask(taskId));
    }
    else if(data.resultCode === ResultCode.Error) {
        alert(data.messages[0]);
    }  
}

export default tasksReduser;

type InitialStateType = typeof initialState;

export type ActionTypes = InferActionTypes<typeof Actions>;