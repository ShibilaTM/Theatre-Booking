import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Main from './components/Navbar/Main';
import UserHome from './components/Home/UserHome';
import UserMain from './components/Navbar/UserMain';
import Login from './components/ui-components/Login';
import Signup from './components/ui-components/Signup';
import AdminLogin from './components/ui-components/AdminLogin';
import MoviePageFinal from './Pages/MoviePageFinal';



function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Main child={<Home />} />}/>
        <Route path='/user' element={<UserMain child={<UserHome />} />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/adminlog' element={<AdminLogin/>}/>
        <Route path="/movie/:title" element={<UserMain child={<MoviePageFinal/>} />}/> 
       

        
      </Routes>
    </div>
  );
}

export default App;

