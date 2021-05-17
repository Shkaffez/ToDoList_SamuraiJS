import React from 'react';
import { connect } from 'react-redux';
import { TaskType } from '../DAL/todoListsAPI';
import { AppStateType } from '../Redux/ReduxStore';
import Task from './Task';

const Tasks : React.FC<MapStatePropsType> = (props) => {
    
    let taskElements = props.tasks.map(task => <Task key={task.id} title={task.title} 
        description={task.description} startDate={task.startDate}  deadline={task.deadline}
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

export default connect(mapStateToProps)(Tasks);
