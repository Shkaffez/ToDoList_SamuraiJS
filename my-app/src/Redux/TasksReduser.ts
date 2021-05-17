import { TaskType } from "../DAL/todoListsAPI";
import { InferActionTypes } from "./ReduxStore";


const Actions = {
    setTasks: (tasks: Array<TaskType>) => 
    ( {type: 'TASKS/SET_TASKS', payload: {tasks}} as const),
    setCurrentTask: (task: number) =>
     ( {type: 'TASKS/SET_CURRENT_TASL',  task } as const),
}


const initialState ={
    tasks: [
        {
            description: "Lorem dksdka",
            title: "title",
            completed: false,
            status: 0,
            priority: 1,
            startDate: new Date(),
            deadline: new Date(2021, 8, 24),
            id: "vdvsd1v",
            todoListId: "string",
            order: 0,
            addedDate: new Date(),
        },
        {
            description: "Lorem dkssvdsfagdgdka",
            title: "title2",
            completed: false,
            status: 0,
            priority: 1,
            startDate: new Date(),
            deadline: new Date(2021, 8, 24),
            id: "vdvsddv",
            todoListId: "string",
            order: 1,
            addedDate: new Date(),
        },
        {
            description: "Lorem dksasdasddadadsafsffadka",
            title: "title3",
            completed: true,
            status: 0,
            priority: 3,
            startDate: new Date(),
            deadline: new Date(2021, 8, 24),
            id: "vdvsd32v",
            todoListId: "string",
            order: 2,
            addedDate: new Date(),
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
        default: return state
    }    
}

export default tasksReduser;

type InitialStateType = typeof initialState;

export type ActionTypes = InferActionTypes<typeof Actions>;