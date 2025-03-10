import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const location = useLocation();
  const igLogin = JSON.parse(localStorage.getItem('isLogin'));

  // Check if the user is logged in and has the role of admin when accessing admin routes
  if (location.pathname.startsWith('/admin') && (!igLogin || igLogin.user?.role !== 'admin')) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
