'use client';
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-gray-800 p-10 rounded-xl shadow-lg w-96 text-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-6">Welcome</h1>
        <p className="text-gray-300 mb-6">Sign in or create an account to continue</p>
        <div className="space-y-4">
          <button 
            onClick={() => router.push('/login')} 
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold p-3 rounded-lg">
            Login
          </button>
          <button 
            onClick={() => router.push('/register')} 
            className="w-full bg-blue-500 hover:bg-blue-600 text-gray-900 font-bold p-3 rounded-lg">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
