import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TaskType } from '../DAL/tasksAPI';
import { AppStateType } from '../Redux/ReduxStore';
import { ActionTypes, getAllTasks } from '../Redux/TasksReduser';
import Task from './Task';

const Tasks : React.FC<MapStatePropsType & OwnPropsType & MapDispatchPropsType> = (props) => {
    // eslint-disable-next-line
    useEffect(() => {props.getAllTasks(props.currentList)}, []); 
    let taskElements = props.tasks
    .filter(task => task.todoListId === props.todoListID)
    .map(task => <Task key={task.id} title={task.title} description={task.description}
        startDate={task.startDate}  deadline={task.deadline}
        priority={task.priority}  completed={task.completed} />)

    return (
        <div>
            <h2>Задачи</h2>
            <div>
                {taskElements}
            </div>
        </div>
    )
}

const mapStateToProps = (state: AppStateType) : MapStatePropsType => ({
    tasks: state.tasks.tasks,
    currentList: state.todoLists.currentList,
});

type MapStatePropsType = {
    tasks: Array<TaskType>   
    currentList: string 
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        
        getAllTasks: (todoListId: string) => dispatch(getAllTasks(todoListId))
    }
}

type OwnPropsType = {
    todoListID: string
}
type MapDispatchPropsType = {
    
    getAllTasks: (todoListId: string) => ActionTypes
}

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps)(Tasks);
