import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
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
    setLoading(true);
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (!formData.terms) {
      setMessage("You must agree to the Terms and Conditions.");
      setLoading(false);
      return;
    }

    const username = `${formData.firstName}${formData.lastName}`;
    const payload = {
      username,
      email: formData.email,
      password: formData.password,
      role: "user",
    };

    try {
      const response = await fetch("https://urban-tuxedo-backend.vercel.app/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.message || "Registration failed.");
      } else {
        toast.success("Registration successful! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      setMessage("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Urban <span className="text-red-500">Tuxedo</span></h1>
            <p className="text-gray-600 mt-2">Join the premium fashion experience</p>
          </div>
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
            <h2 className="text-2xl font-bold mb-2">Create an Account</h2>
            <p className="text-gray-600 mb-6">Join us today</p>
            {message && <div className="mb-4 p-4 bg-red-50 text-red-700 border-l-4 border-red-500 rounded">{message}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full pl-10 p-3 border rounded-lg" placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input type="password" name="password" required value={formData.password} onChange={handleChange} className="w-full pl-10 p-3 border rounded-lg" placeholder="••••••••" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input type="password" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} className="w-full pl-10 p-3 border rounded-lg" placeholder="••••••••" />
                </div>
              </div>
              <div className="flex items-center">
                <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded" />
                <label className="ml-2 text-sm text-gray-700">I agree to the <a href="#" className="text-red-500 hover:underline">Terms & Conditions</a></label>
              </div>
              <button type="submit" disabled={loading} className={`w-full flex items-center justify-center gap-2 p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition ${loading ? "opacity-70 cursor-not-allowed" : ""}`}>
                {loading ? "Signing up..." : "Sign up"}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>
            <p className="text-center text-gray-600 mt-4">Already have an account? <Link to="/login" className="text-red-500 hover:underline">Sign in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
