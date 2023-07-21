import { Routes,Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Error from './components/Error';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Task from './components/Task';

function App() {
  return (
    
    <div className='w-[100vw] h-[100vh]'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="signup" element={<SignUp/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="task" element={<Task/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
