import { Navigate } from "react-router-dom";
import { getToken } from '../../lib/contexts/Auth/utils';

const ProtectedRoute = ({children}) => {
    const token = getToken();
    if (!token) {
        return <Navigate to="/" />;
    }
    return children;
}

export default ProtectedRoute