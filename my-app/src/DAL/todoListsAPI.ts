import { instance, CommonResponseType, ResultCode } from './baseApi';


export const todoListsAPI = {
    getAllTodoLists() {
        return instance.get<Array<TodoListType>>('todo-lists').then(res => res.data);
    },

    createTodoList(title : string) {
        return instance.post<CreateTodoListResponseType>('todo-lists', {title: title}).then(res => res.data);
    },

    deleteTodoList(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`).then(res => res.data);
    },

    updateTodoListTitle(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, title).then(res => res.data);
    },

    reorderTodoList(todolistId: string, putAfterItemId: number = 0) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}/reorder`, putAfterItemId)
            .then(res => res.data);
    },

    
}

export type TodoListType = {
    id: string
    addedDate: Date
    order: number
    title: string
}

type CreateTodoListResponseType = {
    resultCode: ResultCode
    messages: Array<string>
    data: {
        item: TodoListType
    }
}
