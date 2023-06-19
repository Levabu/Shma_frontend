import {useContext} from 'react'
import { Navigate } from "react-router-dom";
import { AuthContext } from '../../lib/contexts/Auth/AuthContext';

const ProtectedRoute = ({children}) => {
    const user = useContext(AuthContext);
  const { isLoggedIn} = user.user;
    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }
    return children;
}

export default ProtectedRoute