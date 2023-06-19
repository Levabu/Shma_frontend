import {useContext} from 'react'
import { Navigate } from "react-router-dom";
import { AuthContext } from '../../lib/contexts/Auth/AuthContext';

const ProtectedRoute = ({children}) => {
    const auth = useContext(AuthContext);
  const { user} = auth;
    console.log('user in ProtectedRoute', user);
    if (!user) {
        return <Navigate to="/login" />;
    }
    
    
    return children;
}

export default ProtectedRoute