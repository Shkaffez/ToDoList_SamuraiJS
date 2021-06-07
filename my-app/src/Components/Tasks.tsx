// import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TaskType } from '../DAL/tasksAPI';
import { AppStateType } from '../Redux/ReduxStore';
import { ActionTypes, getAllTasks } from '../Redux/TasksReduser';
import Task from './Task';

const Tasks : React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    // // eslint-disable-next-line
    // useEffect(() => {props.getAllTasks(props.currentList)}, []); 

    if(!props.isTasksRecived.includes(props.currentList)) {
        props.getAllTasks(props.currentList)
    }

    let taskElements = props.tasks
    .filter(task => task.todoListId === props.currentList)
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
    isTasksRecived: state.tasks.isTasksRecived,
});

type MapStatePropsType = {
    tasks: Array<TaskType>   
    currentList: string 
    isTasksRecived: Array<string>
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getAllTasks: (todoListId: string) => dispatch(getAllTasks(todoListId))
    }
}


type MapDispatchPropsType = {
    getAllTasks: (todoListId: string) => ActionTypes
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(Tasks);
