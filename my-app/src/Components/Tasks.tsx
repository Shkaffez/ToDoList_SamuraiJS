import { useDispatch, useSelector } from 'react-redux';

import { AppStateType } from '../Redux/ReduxStore';
import { Actions, getAllTasks } from '../Redux/TasksReduser';
import Task from './Task';

const Tasks : React.FC = (props) => {
    
    const dispatch = useDispatch();
    const isTasksRecived = useSelector((state: AppStateType) => state.tasks.isTasksRecived)
    const currentList = useSelector((state: AppStateType) => state.todoLists.currentList)
    const tasks = useSelector((state: AppStateType) => state.tasks.tasks)
    

    if(!isTasksRecived.includes(currentList)) {
        dispatch(getAllTasks(currentList));
        dispatch(Actions.setTasksRecived(currentList));    
    }

    let taskElements = tasks
    .filter(task => task.todoListId === currentList)
    .map(task => <Task key={task.id} title={task.title} description={task.description}
        startDate={task.startDate}  deadline={task.deadline}
        priority={task.priority}  completed={task.completed} taskId={task.id} />)

    return (
        <div>
            <h2>Задачи</h2>
            <div>
                {taskElements}
            </div>
        </div>
    )
}

export default Tasks;

