import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Field, Form } from 'react-final-form';
import { Row, Col, Button, Input, Tooltip } from 'antd';
import { CloseOutlined } from '@ant-design/icons'

import { AppStateType } from '../Redux/ReduxStore';
import { createTask } from '../Redux/TasksReduser';
import { createTodoList } from '../Redux/TodoListReduser';
import Tasks from './Tasks';
import style from './TodoList.module.css'


const TodoList: React.FC = (props) => {

    const dispatch = useDispatch();
    const todoLists = useSelector((state: AppStateType) => state.todoLists.todoLists);
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    const currentList = useSelector((state: AppStateType) => state.todoLists.currentList);

    if (!isAuth) {
        return <Redirect to="/login" />;
    }


    let todoListElement = todoLists
        .filter(todoList => todoList.id === currentList)
        .map(todoList => (
            <Col key={todoList.id}>
                <h2>Название: {todoList.title}</h2>
                <h3>Дата создания: {new Date(todoList.addedDate).toLocaleString()}</h3>
                <Tasks />
                 <Tooltip title="delete">
                    <Button type="default" shape="circle" icon={<CloseOutlined />}/>
                </Tooltip>
            </Col>

        ))
    return (
        <div>
            <Row className={style.todoList} justify={'space-around'}>
                {todoListElement}               
            </Row>
            <Row justify="center">

                {currentList ? <Form
                    onSubmit={values => dispatch(createTask(currentList, values.input))}

                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>                           
                            <Field name="input" component="input">
                                {({ input }) => (
                                    <div>
                                        <label>Добавить задачу</label>
                                        <Input {...input} type="text" placeholder="название задачи" />
                                    </div>
                                )}
                            </Field>
                            <Button type="primary">submit</Button>
                        </form>
                    )}
                /> : undefined}
            </Row>
            <Row justify="center">
                <Form
                    onSubmit={values => dispatch(createTodoList(values.input))}

                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <Field name="input" component="input">
                                {({ input }) => (
                                    <div>
                                        <label>Добавить Todo List</label>
                                        <Input {...input} type="text" placeholder="название списка дел" />
                                    </div>
                                )}
                            </Field>
                            <Button type="primary">submit</Button>
                        </form>
                    )}
                />
            </Row>
        </div>


    )
}

export default TodoList;

