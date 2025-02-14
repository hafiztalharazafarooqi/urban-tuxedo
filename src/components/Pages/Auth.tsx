import { useState } from "react";
import { Button } from "../UI/Button";
import { Card } from "../UI/Card";
import { CardContent } from "../UI/Card-Content";
import { Mail, Lock, User } from "lucide-react";
import { Input } from "../UI/Input";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6 shadow-lg bg-white rounded-2xl">
        <CardContent>
          {isForgotPassword ? (
            <>
              <h2 className="text-2xl font-bold text-center mb-4">
                Forgot Password
              </h2>
              <p className="text-center text-gray-500 mb-4">
                Enter your email and we will send you a reset link.
              </p>
              <div className="mb-4 flex items-center border rounded-lg p-2 bg-gray-50">
                <Mail className="text-gray-400" size={20} />
                <Input
                  type="email"
                  placeholder="Email"
                  className="ml-2 border-none bg-transparent w-full"
                />
              </div>
              <Button className="w-full">Send Reset Link</Button>
              <p
                className="text-sm text-center mt-4 text-gray-500 cursor-pointer"
                onClick={() => setIsForgotPassword(false)}
              >
                Back to Login
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-center mb-6">
                {isLogin ? "Login to Your Account" : "Create an Account"}
              </h2>
              {!isLogin && (
                <div className="mb-4 flex items-center border rounded-lg p-2 bg-gray-50">
                  <User className="text-gray-400" size={20} />
                  <Input
                    type="text"
                    placeholder="Full Name"
                    className="ml-2 border-none bg-transparent w-full"
                  />
                </div>
              )}
              <div className="mb-4 flex items-center border rounded-lg p-2 bg-gray-50">
                <Mail className="text-gray-400" size={20} />
                <Input
                  type="email"
                  placeholder="Email"
                  className="ml-2 border-none bg-transparent w-full"
                />
              </div>
              <div className="mb-4 flex items-center border rounded-lg p-2 bg-gray-50">
                <Lock className="text-gray-400" size={20} />
                <Input
                  type="password"
                  placeholder="Password"
                  className="ml-2 border-none bg-transparent w-full"
                />
              </div>
              <Button className="w-full mb-4">
                {isLogin ? "Login" : "Register"}
              </Button>
              {isLogin && (
                <p
                  className="text-sm text-center text-gray-500 cursor-pointer"
                  onClick={() => setIsForgotPassword(true)}
                >
                  Forgot Password?
                </p>
              )}
              <p className="text-sm text-center mt-4 text-gray-500">
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Register" : "Login"}
                </span>
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
