import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // Check if the user is logged in. For example, we can check if a token exists.
  const igLogin = localStorage.getItem('isLogin');

  if (!igLogin) {
    // User is not authenticated, so redirect to login
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected component
  return children;
}

export default ProtectedRoute;
