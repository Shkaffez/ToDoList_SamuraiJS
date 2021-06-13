import React from 'react';
import styles from './Tasks.module.css'

const Task : React.FC<MapStatePropsType> = (props) => {
    return (
        <div className={styles.task}>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
            <p>Дата начала: {props.startDate}</p>
            <p>Закончит до: {props.deadline}</p>
            <p>Приоритет: {props.priority}</p>
            <p>Статус выполнения: {props.completed ? "DONE" : "In progress"}</p>
        </div>   
    )
}


export default Task;

type MapStatePropsType = {
    title: string
    description: string
    startDate: Date | string
    deadline: Date | string
    priority: number
    completed: boolean
}