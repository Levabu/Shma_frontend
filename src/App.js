import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './Components/SignIn/SignIn';
import { AuthContext } from './lib/contexts/Auth/AuthContext';
import { WsProvider } from './lib/contexts/Ws/WsContext';
import UserInfo from './Components/UserInfo/UserInfo';
import Chat from './Pages/Chat';
import { useContext, useEffect } from 'react';
import { getToken } from './lib/contexts/Auth/utils';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';


function App() {
  const token = getToken()
  const {user} = useContext(AuthContext);
  
  useEffect(() => {
    console.log(token);
  }, [token]);

  return (
        <WsProvider>
          <div className='App'>
          <Routes>
          {token && <Route path='/user' element={<UserInfo />} />}
          <Route path='/chat' element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
              } />
              <Route path='*' element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
              } />
              {!token && <Route path='/login' element={<SignIn />} />}
              {!token && <Route path='/' element={<SignIn />} />}
            </Routes>
          </div>
        </WsProvider>)
        ;
}

export default App;
