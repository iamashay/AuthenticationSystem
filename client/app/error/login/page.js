'use client';
import { useRouter } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
    <div className="bg-gray-800 p-10 rounded-xl shadow-lg w-96 text-white text-center">
      <h2 className="text-3xl font-semibold mb-6 text-red-500">Error</h2>
      <p className="text-lg mb-4">Sorry, we can't log you in.</p>
      <button
        onClick={() => router.push("/login")}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold p-3 rounded-lg mt-4"
      >
        Try Again
      </button>
    </div>
  </div>
  );
};

export default ErrorPage;