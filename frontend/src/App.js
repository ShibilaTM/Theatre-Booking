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
import BuyTicketPage from './Pages/BuyTickets/BuyTicketPage';
import Seat from './Pages/BuyTickets/Seat';
import AdminHome from './Admin/AdminHome/AdminHome';
import AdminMain from './Admin/Sidebar/AdminMain';



function App() {
  return (
    <div>
      <Routes>
        {/* User Routes */}
        <Route path='/' element={<Main child={<Home />} />}/>
        <Route path='/user' element={<UserMain child={<UserHome />} />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/adminlog' element={<AdminLogin/>}/>
        <Route path="/movie/:title" element={<UserMain child={<MoviePageFinal/>} />}/> 
        <Route path="/buytickets/:id" element={<UserMain child={<BuyTicketPage/>} />}/> 
        <Route path="/buytickets/:id/screen" element={<UserMain child={<Seat/>} />}/>
       
        {/* Admin Routes */}
        <Route path="/admindashboard" element={<AdminMain child={<AdminHome/>} />}/>
        
        
      </Routes>
    </div>
  );
}

export default App;

