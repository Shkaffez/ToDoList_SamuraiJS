import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { TodoListType } from '../DAL/todoListsAPI';
import { AppStateType } from '../Redux/ReduxStore';
import { ActionTypes, createTodoList, loadTodoLists } from '../Redux/TodoListReduser';
import Tasks from './Tasks';

import { Row, Col } from 'antd';

const TodoList : React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    if(!props.isAuth) {
        return <Redirect to="/login" />;
    }
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
                <Form
                    onSubmit={values => props.createTodoList(values.input)}
                        
                    render={({ handleSubmit }) =>(
                        <form onSubmit={handleSubmit}>
                            <label><h2>Добавить Todo List</h2></label>
                            <Field name="input" component="input" type="text" placeholder="название" />
                            <button>submit</button> 
                        </form>                        
                    )}
                />
            </Row>          
        </div>


    )
}

const mapStateToProps = (state: AppStateType) : MapStatePropsType => ({
    todoLists: state.todoLists.todoLists,
    isAuth: state.auth.isAuth,
    currentList: state.todoLists.currentList,
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        createTodoList: (todoListTitle: string) => dispatch(createTodoList(todoListTitle)),
        loadTodoLists: () => dispatch(loadTodoLists()),
    }
}

type MapStatePropsType = {
    todoLists: Array<TodoListType>
    isAuth: boolean
    currentList: string
}

type MapDispatchPropsType = {
    createTodoList: (title: string) => ActionTypes
    loadTodoLists: () => ActionTypes
}

export default connect<MapStatePropsType, MapDispatchPropsType, undefined, AppStateType>
(mapStateToProps, mapDispatchToProps)(TodoList);

