'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const PUBLIC_API = process.env.PUBLIC_API;
const ThankYou = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(PUBLIC_API + "/users/profile", {
            credentials: "include", // Allows cookies to be sent
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data?.user);
        } else {
          router.push("/login");
        }
      } catch (error) {
        router.push("/login");
      }
    };
    fetchUserDetails();
  }, [router]);

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(PUBLIC_API+'/users/delete', {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete account');
      }

      alert('Your account has been deleted.');
      router.push('/');
    } catch (err) {
      alert('Error deleting account. Please try again.');
    }
  };


  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {user ? (
          <div className="text-center">
            <img
              src={`${PUBLIC_API}/uploads/${user.image}`}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-300"
            />
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">Company: {user.company}</p>
            <p className="text-gray-600">Age: {user.age}</p>
            <p className="text-gray-600">DOB: {new Date(user.dob).toDateString()}</p>
          </div>
        ) : (
          <p className="text-gray-600">Loading...</p>
        )}


        <button
          onClick={handleDeleteAccount}
          className="w-full bg-red-500 text-white p-2 rounded mt-2"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
