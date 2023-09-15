import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css'
import { ToastContainer } from 'react-toastify';
import Home from './Pages/Home';
import UserAccess from './utils/conditions';
function App() {
  return (
    <div className="App">
      <Router>
        <ToastContainer/>
        <Routes>
          <Route path='/' element ={<Login/>}></Route>
          <Route path='signup/' element={<Signup/>}></Route>
          <Route element={<UserAccess/>}>
          <Route path='home/' element={<Home/>}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
