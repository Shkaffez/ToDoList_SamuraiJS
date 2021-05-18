import { instance, CommonResponseType, ResultCode } from './baseApi';


export const tasksAPI = {
    getTasks(todolistId: string, count: number, page: number) {
        return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks?count=${count}&page=${page}`)
        .then(res => res.data);
    },
    
    createTask(todolistId: string, title: string) {
        return instance.post<CreateTasksResponseType>(`/todo-lists/${todolistId}/tasks`, title)
        .then(res => res.data);
    },
    
    updateTask(todolistId: string, taskId: number, updatedTask: UpdatedTaskType) {
        return instance.put<CreateTasksResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, updatedTask)
        .then(res => res.data);
    },
    
    deleteTask(todolistId: string, taskId: number) {
        return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
        .then(res => res.data);
    },
    
    reorderTasks(todolistId: string, taskId: number, putAfterItemId: number = 0) {
        return instance.put<CommonResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}/reorder`, putAfterItemId)
        .then(res => res.data);
    },
}

export type TaskType = {
    description: string
    title: string
    completed:boolean
    status: number
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}

type GetTasksResponseType = {
    items: {
        Task: TaskType
    }
    totalCount: number
    error: string
}

type CreateTasksResponseType = {
    items: {
        Task: TaskType
    }
    resultCode: number
    messages: Array<string>
}

type UpdatedTaskType = {
    title: string,
    description: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: Date,
    deadline: Date,
}