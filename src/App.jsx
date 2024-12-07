import './App.css';
import Homepage from './pages/Homepage';
import Temp from './pages/Temp';
import Signin from './pages/Signin';
import UserDashboard from './pages/UserDashboard.jsx';
import CampusDashboard from './pages/CampusDashboard.jsx';
import Signup from './pages/Signup';
import UserDetailsInput from './pages/UserDetailsInput';
import CampusDetailsInput from './pages/CampusDetailsInput';
import EventsPage from './pages/EventsPage';
import ResetPasswordReq from './pages/ResetPasswordReq';
import ResetPassword from './pages/ResetPassword';
import ShowEventPage from './pages/ShowEventPage';
import CreateEventPage from './pages/CreateEventPage';
import EditEventPage from './pages/EditEventPage';
import UserProfilePage from './pages/UserProfilePage.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <ToastContainer position="top-center" className="w-[30%] text-xl  " />
      <Routes>
        <Route path='/' element={<Outlet />}>
          <Route index element={<Homepage />} />
          <Route path='/temp' element={<Temp />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/user-details' element={<UserDetailsInput />} />
          <Route path='/campus-details' element={<CampusDetailsInput />} />
          <Route path='/events' element={<EventsPage />} />
          <Route path='/reset-password-request' element={<ResetPasswordReq />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/events/:id' element={<ShowEventPage />} />
          <Route path='/events/new' element={<CreateEventPage />} />
          <Route path='/events/:id/edit' element={<EditEventPage />} />
          <Route path='/user/:id' element={<UserProfilePage />} />
          <Route path='/campus-dashboard' element={<CampusDashboard />} />
          <Route path='/user-dashboard' element={<UserDashboard />} />

        </Route>
      </Routes>
    </div>
  )
}

export default App;
