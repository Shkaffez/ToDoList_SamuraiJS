import React from 'react';
import { connect } from 'react-redux';
import { TodoListType } from '../DAL/todoListsAPI';
import { AppStateType } from '../Redux/ReduxStore';
import Tasks from './Tasks';

const TodoList : React.FC<MapStatePropsType> = (props) => {
    let todoListElement = props.todoLists.map(todoList => (
        <div>
            <h2>{todoList.title}</h2>
            <h3>Дата создания: {todoList.addedDate}</h3>
            <Tasks />
        </div>
    ))

    return (
        <div>
            {todoListElement}
        </div>
    )
}

const mapStateToProps = (state: AppStateType) : MapStatePropsType => ({
    todoLists: state.todoLists.todoLists
})

type MapStatePropsType = {
    todoLists: Array<TodoListType>
}

export default connect<MapStatePropsType, undefined, undefined, AppStateType>
(mapStateToProps)(TodoList);

