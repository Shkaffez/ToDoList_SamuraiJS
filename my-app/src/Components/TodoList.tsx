import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { TodoListType } from '../DAL/todoListsAPI';
import { AppStateType } from '../Redux/ReduxStore';
import { ActionTypes, createTodoList, loadTodoLists } from '../Redux/TodoListReduser';
import Tasks from './Tasks';

import { Row, Col } from 'antd';
import { createTask, getAllTasks } from '../Redux/TasksReduser';
import { useEffect } from 'react';

const TodoList: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    if (!props.isAuth) {
        return <Redirect to="/login" />;
    }    
    // eslint-disable-next-line
    useEffect(() => {props.getAllTasks(props.currentList)}, []); 
    
    let todoListElement = props.todoLists
        .filter(todoList => todoList.id === props.currentList)
        .map(todoList => (
            <Col key={todoList.id}>
                <h2>Название: {todoList.title}</h2>
                <h3>Дата создания: {new Date(todoList.addedDate).toLocaleString()}</h3>
                <Tasks todoListID={todoList.id} />
            </Col>

        ))
    return (
        <div>
            <Row justify={'space-around'}>
                {todoListElement}
            </Row>
            <Row justify="center">

                {props.currentList ? <Form
                    onSubmit={values => props.createTask(props.currentList, values.input)}

                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <label><h2>Добавить задачу</h2></label>
                            <Field name="input" component="input" type="text" placeholder="название задачи" />
                            <button>submit</button>
                        </form>
                    )}
                /> : undefined }
            </Row>
            <Row justify="center">
                <Form
                    onSubmit={values => props.createTodoList(values.input)}

                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <label><h2>Добавить Todo List</h2></label>
                            <Field name="input" component="input" type="text" placeholder="название списка дел" />
                            <button>submit</button>
                        </form>
                    )}
                />
            </Row>
        </div>


    )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    todoLists: state.todoLists.todoLists,
    isAuth: state.auth.isAuth,
    currentList: state.todoLists.currentList,
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        createTodoList: (todoListTitle: string) => dispatch(createTodoList(todoListTitle)),
        loadTodoLists: () => dispatch(loadTodoLists()),
        createTask: (todolistId: string, taskTitle: string) => dispatch(createTask(todolistId, taskTitle)),
        getAllTasks: (todoListId: string) => dispatch(getAllTasks)
    }
}

type MapStatePropsType = {
    todoLists: Array<TodoListType>
    isAuth: boolean
    currentList: string
}

type MapDispatchPropsType = {
    createTodoList: (todoListTitle: string) => ActionTypes
    loadTodoLists: () => ActionTypes
    createTask: (todolistId: string, taskTitle: string) => ActionTypes
    getAllTasks: (todoListId: string) => ActionTypes
}

export default connect<MapStatePropsType, MapDispatchPropsType, undefined, AppStateType>
    (mapStateToProps, mapDispatchToProps)(TodoList);

