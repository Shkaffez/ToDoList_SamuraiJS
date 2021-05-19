import React from 'react';
import { connect } from 'react-redux';
import { TaskType } from '../DAL/tasksAPI';
import { AppStateType } from '../Redux/ReduxStore';
import Task from './Task';

const Tasks : React.FC<MapStatePropsType & OwnPropsType> = (props) => {
    
    let taskElements = props.tasks
    .filter(task => task.todoListId === props.todoListID)
    .map(task => <Task key={task.id} title={task.title} description={task.description}
        startDate={task.startDate.toString()}  deadline={task.deadline.toString()}
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
    tasks: state.tasks.tasks
});

type MapStatePropsType = {
    tasks: Array<TaskType>    
}

type OwnPropsType = {
    todoListID: string
}

export default connect<MapStatePropsType, undefined, OwnPropsType, AppStateType>(mapStateToProps)(Tasks);
