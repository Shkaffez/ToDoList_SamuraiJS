import { Menu } from 'antd';
import React from 'react';
import {useDispatch, useSelector } from 'react-redux';

import { AppStateType } from '../Redux/ReduxStore';
import { Actions,  } from '../Redux/TodoListReduser';


const NavBar : React.FC = (props) => {
  
  const dispatch = useDispatch();
  const todoLists = useSelector((state: AppStateType) => state.todoLists.todoLists);

  // const dispatchSetCurrentList = (e: MenuInfo) => dispatch(Actions.setCurrentList(e.key.toString()))
  
  let todoListElement = todoLists.map(todoList => (
    <Menu.Item key={todoList.id} onClick={(e) =>{dispatch(Actions.setCurrentList(e.key.toString()))}}>
          {todoList.title}
        </Menu.Item>
  )).reverse();
  return (
    <Menu mode="horizontal">
        {todoListElement}
      </Menu>
  )
}




export default NavBar;