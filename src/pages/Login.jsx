import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const BACKEND_URL = import.meta.env.VITE_API_URL;
    
    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(`Login failed: ${errorData.message || response.statusText}`);
      } else {
        const data = await response.json();
        toast.success("Login successful!");
        // data.user.role = 'admin';
        localStorage.setItem("isLogin", JSON.stringify(data));
        setTimeout(() => {
          const defaultPage = data.user.role === 'user' ? '/' : '/admin';
          const redirectUrl = localStorage.getItem("redirectAfterLogin") || defaultPage;
          
          localStorage.removeItem("redirectAfterLogin"); // Clear after use
          window.dispatchEvent(new Event("storage")); // Notify other components
          navigate(redirectUrl);
          setLoader(false);
          // navigate('/');
        }, 2000);
      }
    } catch (error) {
      setLoader(false);
      setMessage(`Login failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="text-3xl font-serif text-center">Welcome Back</h2>
          <p className="mt-2 text-center text-gray-600">
            Sign in to your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-red-600 focus:border-red-600"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-red-600 focus:border-red-600"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember"
                type="checkbox"
                checked={formData.remember}
                onChange={handleChange}
                className="h-4 w-4 text-red-600 focus:ring-red-600 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forget-password" className="text-red-600 hover:text-red-600-light">
                Forgot your password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-8 py-3 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {loader ? 'Signing in...' : 'Sign in'}
          </button>

          <p className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-red-600 hover:text-red-600-light"
            >
              Sign up
            </Link>
          </p>
          {message && (
            <p className="text-center text-sm mt-4 text-red-600">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
