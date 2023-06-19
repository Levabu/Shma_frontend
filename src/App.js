import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './Components/SignIn/SignIn';
import { AuthProvider } from './lib/contexts/Auth/AuthContext';
import { AuthContext } from './lib/contexts/Auth/AuthContext';
import { WsProvider } from './lib/contexts/Ws/WsContext';
import UserInfo from './Components/UserInfo/UserInfo';
import Chat from './Pages/Chat';
import { useContext } from 'react';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

function App() {
   const auth = useContext(AuthContext);
   const {user} = auth;
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <WsProvider>
          <div className='App'>
            <Routes>
              <Route path='/chat' element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
              } />
              <Route path='/user' element={
              <ProtectedRoute>
                <UserInfo />
              </ProtectedRoute>
              } />
              {/* <Route path='/login' element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
              } /> */}
              
              <Route path='*' element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
              } />
               {user === undefined && <Route path='/login' element={<SignIn />} />}
               {user === undefined && <Route path='*' element={<SignIn />} />}
              
            </Routes>
          </div>
        </WsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
