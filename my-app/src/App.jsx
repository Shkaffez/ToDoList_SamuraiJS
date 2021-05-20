import { Route } from 'react-router';
import Login from './Components/LoginForm';
import TodoList from './Components/TodoList';
import './App.css';


const App = () => {
  return (
    <div>
     <Route path="/login" render={()=><Login />} />
      <Route path="/main" render={()=><TodoList />} />
    </div>
  )
}

export default App;
