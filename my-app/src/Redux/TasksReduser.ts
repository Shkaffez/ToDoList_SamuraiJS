import { TaskType } from "../DAL/tasksAPI";
import { InferActionTypes } from "./ReduxStore";


const Actions = {
    setTasks: (tasks: Array<TaskType>) => 
    ( {type: 'TASKS/SET_TASKS', payload: {tasks}} as const),
    setCurrentTask: (task: number) =>
     ( {type: 'TASKS/SET_CURRENT_TASK',  task } as const),
    addTask: (task: TaskType) => 
    ( {type: 'TASKS/ADD_TASK', task} as const )
}


const initialState ={
    tasks: [
        {
            description: "Lorem dksdka",
            title: "title",
            completed: false,
            status: 0,
            priority: 1,
            startDate: new Date() as Date | string,
            deadline: new Date(2021, 8, 24) as Date | string,
            id: "vdvsd1v",
            todoListId: "csdsfsf",
            order: 0,
            addedDate: new Date() as Date | string,
        },
        {
            description: "Lorem dkssvdsfagdgdka",
            title: "title2",
            completed: false,
            status: 0,
            priority: 1,
            startDate: new Date() as Date | string,
            deadline: new Date(2021, 8, 24) as Date | string,
            id: "vdvsddv",
            todoListId: "ggfsgsfg",
            order: 1,
            addedDate: new Date() as Date | string,
        },
        {
            description: "Lorem dksasdasddadadsafsffadka",
            title: "title3",
            completed: true,
            status: 0,
            priority: 3,
            startDate: new Date() as Date | string,
            deadline: new Date(2021, 8, 24) as Date | string,
            id: "vdvsd32v",
            todoListId: "sfsgfad",
            order: 2,
            addedDate: new Date() as Date | string,
        },
    ] as Array<TaskType>,
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



export default tasksReduser;

type InitialStateType = typeof initialState;

export type ActionTypes = InferActionTypes<typeof Actions>;