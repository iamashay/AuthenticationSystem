'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const PUBLIC_API = process.env.PUBLIC_API;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isOTPVerification, setisOTPVerification] = useState(true);
  const router = useRouter();

  useEffect(() => { 
    setisOTPVerification(false);
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await fetch(PUBLIC_API + "/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
      
      const data = await response.json();
      if (response.ok) {
        setisOTPVerification(true);
      } else {
        if (data.status === "BLOCKED") router.push("error/login");
        //console.log(data)
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await fetch(PUBLIC_API+"/users/verifyotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
        credentials: "include",
      });
      
      const data = await response.json();
      if (response.ok) {
        router.push("/success");
      } else {
        setError(data.message || "Invalid OTP");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-xl shadow-lg w-96 text-white">
        {isOTPVerification === false ? (
          <>
            <h2 className="text-3xl font-semibold mb-6 text-center text-yellow-400">Sign In</h2>
            {error && <p className="text-red-400 text-center mb-4">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-yellow-400 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white" required />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-yellow-400 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white" required />
              <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold p-3 rounded-lg">Login</button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-semibold mb-6 text-center text-yellow-400">OTP Verification</h2>
            {error && <p className="text-red-400 text-center mb-4">{error}</p>}
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full p-3 border border-yellow-400 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white" required />
              <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-gray-900 font-bold p-3 rounded-lg">Verify OTP</button>
            </form>
          </>
        )}
        <p className="mt-6 text-center text-gray-400">
          Don't have an account? <a href="/register" className="text-yellow-400 font-bold">Sign up</a>
        </p>
      </div>
    </div>
  );
};


export default Login;
