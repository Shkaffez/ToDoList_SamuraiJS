import { Menu } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { TodoListType } from '../DAL/todoListsAPI';
import { AppStateType } from '../Redux/ReduxStore';
import { Actions, ActionTypes, deleteTodoList } from '../Redux/TodoListReduser';




const NavBar : React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  
  
  
  let todoListElement = props.todoLists.map(todoList => (
    <Menu.Item key={todoList.id} onClick={(e) =>{props.setCurrentList(e.key.toString())}}>
          {todoList.title}
        </Menu.Item>
  )).reverse();
  return (
    <Menu mode="horizontal">
        {todoListElement}
      </Menu>
  )
}

const mapStateToProps = (state: AppStateType) : MapStatePropsType => ({
  todoLists: state.todoLists.todoLists,  
});

const mapDispatchToProps = (dispatch: any) => {
  return {
      setCurrentList: (todoListId: string) => dispatch(Actions.setCurrentList(todoListId)),
      deleteTodoList: (todoListId: string)=> dispatch(deleteTodoList), 
           
  }
}

type MapStatePropsType = {
  todoLists: Array<TodoListType>  
}

type MapDispatchPropsType = {
  setCurrentList: (todoListId: string) => ActionTypes
  deleteTodoList: (todoListId: string) => ActionTypes
  
  
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);