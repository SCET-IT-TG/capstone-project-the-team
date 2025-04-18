import './App.css';
import {Navigate , Route ,Routes ,useLocation , useNavigate } from 'react-router-dom';
import { useState  } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import RefreshHandler from './RefreshHandler';
import Shortener from './pages/Shortener';
import MyUrls from './pages/MyUrls';


function App() {
 const [isAuthenticated , setIsAuthenticated] = useState(false);

 const PrivateRoute = ({ element }) => {
  return isAuthenticated ? element : <Navigate to="/shortener" />;
 }
  
  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/Shortener' element={<Shortener />} />
        <Route path='/' element= {<Navigate to = "shortener" />} />
        <Route path="/myurls" element={<MyUrls />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home'  element={ <PrivateRoute element={ <Home /> } />}  />

      </Routes>
      </div>
  );
}

export default App;
