import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';
import { TodoListType } from '../DAL/todoListsAPI';
import { AppStateType } from '../Redux/ReduxStore';
import { ActionTypes, createTodoList } from '../Redux/TodoListReduser';
import Tasks from './Tasks';

const TodoList : React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    let todoListElement = props.todoLists.map(todoList => (
        <div key={todoList.id}>            
            <h2>{todoList.title}</h2>
            <h3>Дата создания: {todoList.addedDate}</h3>
            <Tasks todoListID={todoList.id} />
        </div>
    ))

    return (
        <div>
            {todoListElement}
            <Form
                onSubmit={values => props.createTodoList(values.input)}
                    
                render={({ handleSubmit }) =>(
                    <form onSubmit={handleSubmit}>
                        <Field name="input" component="input" type="text" />
                        <button>submit</button> 
                    </form>
                    
                )}
            />

        </div>
    )
}

const mapStateToProps = (state: AppStateType) : MapStatePropsType => ({
    todoLists: state.todoLists.todoLists
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        createTodoList: (todoListTitle: string) => dispatch(createTodoList(todoListTitle)),
    }
}

type MapStatePropsType = {
    todoLists: Array<TodoListType>
}

type MapDispatchPropsType = {
    createTodoList: (title: string) => ActionTypes;
}

export default connect<MapStatePropsType, MapDispatchPropsType, undefined, AppStateType>
(mapStateToProps, mapDispatchToProps)(TodoList);

