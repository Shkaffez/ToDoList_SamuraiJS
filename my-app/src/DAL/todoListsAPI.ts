import { instance, CommonResponseType, ResultCode } from './baseApi';

export const todoListsAPI = {
    getAllTodoLists() {
        return instance.get<GetAllListsResponseType>('todo-lists').then(res => res.data);
    },

    createTodoList(title : string) {
        return instance.post<CreateTodoListResponseType>('todo-lists', title).then(res => res.data);
    },

    deleteTodoList(todolistId: number) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`).then(res => res.data);
    },

    updateTodoListTitle(todolistId: number, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, title).then(res => res.data);
    },

    reorderTodoList(todolistId: number, putAfterItemId: number = 0) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}/reorder`, putAfterItemId)
            .then(res => res.data);
    },

    getTasks(todolistId: number, count: number, page: number) {
        return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks?count=${count}&page=${page}`)
        .then(res => res.data);
    }, 

    createTask(todolistId: number, title: string) {
        return instance.post<CreateTasksResponseType>(`/todo-lists/${todolistId}/tasks`, title)
        .then(res => res.data);
    },

    updateTask(todolistId: number, taskId: number, updatedTask: UpdatedTaskType) {
        return instance.put<CreateTasksResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, updatedTask)
        .then(res => res.data);
    },

    deleteTask(todolistId: number, taskId: number) {
        return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
        .then(res => res.data);
    },

    reorderTasks(todolistId: number, taskId: number, putAfterItemId: number = 0) {
        return instance.put<CommonResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}/reorder`, putAfterItemId)
        .then(res => res.data);
    }, 
}





type GetAllListsResponseType = {
    id: string
    addedDate: Date
    order: number
    title: string
}

type CreateTodoListResponseType = {
    resultCode: ResultCode
    messages: Array<string>
    data: {
        item: {
            id: string
            title: string
            addedDate: Date
            order: number
        }
    }
}

type TaskType = {
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