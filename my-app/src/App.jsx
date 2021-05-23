import { Route } from 'react-router';
import Login from './Components/LoginForm';
import TodoList from './Components/TodoList';
import { initializeApp } from './Redux/AppReduser'
import './App.css';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import Preloader from './Components/common/preloader'


const App = (props) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {props.initializeApp()}, []);
  return (    
    <div>
    {!props.isInitialized ? <Preloader /> : undefined}
     <Route path="/login" render={()=><Login />} />
     <Route path="/main" render={()=><TodoList />} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  isInitialized: state.app.isInitialized
})

export default connect(mapStateToProps, { initializeApp })(App);
