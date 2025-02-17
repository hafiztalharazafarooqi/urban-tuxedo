import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="text-3xl font-serif text-center">Create Account</h2>
          <p className="mt-2 text-center text-gray-600">
            Join Urban Tuxedo for exclusive offers
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-gold focus:border-gold"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-gold focus:border-gold"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-gold focus:border-gold"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-gold focus:border-gold"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-gold focus:border-gold"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-gold focus:ring-gold border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I agree to the{' '}
              <a href="#" className="text-gold hover:text-gold-light">
                Terms and Conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-gold w-full"
          >
            Create Account
          </button>

          <p className="text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-gold hover:text-gold-light">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;