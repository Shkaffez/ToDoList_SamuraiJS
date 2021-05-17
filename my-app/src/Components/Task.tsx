import React from 'react';

const Task : React.FC<MapStatePropsType> = (props) => {
    return (
        <div>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
            <p>Дата начала: {props.startDate}</p>
            <p>Закончит до: {props.deadline}</p>
            <p>Приоритет: {props.priority}</p>
            <p>{props.completed ? "DONE" : "In progress"}</p>
        </div>   
    )
}


export default Task;

type MapStatePropsType = {
    title: string
    description: string
    startDate: Date
    deadline: Date
    priority: number
    completed: boolean
}