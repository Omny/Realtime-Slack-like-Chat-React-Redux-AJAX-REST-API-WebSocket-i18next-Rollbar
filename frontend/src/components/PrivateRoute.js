import { Navigate } from 'react-router-dom';
import useAuth from '../hooks';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return auth.isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
