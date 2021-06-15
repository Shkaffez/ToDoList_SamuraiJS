import { Col, Row, Tooltip, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons'
import React from 'react';
import styles from './Tasks.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../Redux/TasksReduser';
import { AppStateType } from '../Redux/ReduxStore';

const Task: React.FC<PropsType> = (props) => {

    const dispatch = useDispatch();
    const currentList = useSelector((state: AppStateType) => state.todoLists.currentList); 
    const dispatchDeleteTask = () => dispatch(deleteTask(currentList, props.taskId));

    return (
        <div className={styles.task}>
            <Row>
                <Col>
                    <h2>{props.title}</h2>
                </Col>
                <Col>
                <Tooltip title="Delete this task">
                        <Button onClick={dispatchDeleteTask} type="default" shape="circle" icon={<CloseOutlined />} />
                    </Tooltip>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>{props.description}</p>
                    <p>Дата начала: {props.startDate}</p>
                    <p>Закончит до: {props.deadline}</p>
                    <p>Приоритет: {props.priority}</p>
                    <p>Статус выполнения: {props.completed ? "DONE" : "In progress"}</p>
                </Col>
            </Row>
        </div>
    )
}


export default Task;

type PropsType = {
    title: string
    description: string
    startDate: Date | string
    deadline: Date | string
    priority: number
    completed: boolean
    taskId: string
}