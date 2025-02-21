'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const PUBLIC_API = process.env.PUBLIC_API;

const calculate_age = dob => {
  if (!dob) return 0;
  const birthDate = new Date(dob); 
  const difference = Date.now() - birthDate.getTime();
  const age = new Date(difference);

  return Math.abs(age.getUTCFullYear() - 1970);
}

const Register = () => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [age, setAge] = useState(0);
  const [dob, setDob] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => setAge(calculate_age(dob)), [dob]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!image || image.size > 50 * 1024) {
      setError("Image size must be under 50KB");
      return;
    }
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("company", company);
    formData.append("age", age);
    formData.append("dob", new Date(dob).toISOString());
    formData.append("image", image);

    try {
      const response = await fetch(PUBLIC_API+"/users/register", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      if (response.ok) {
        alert("Account created successfully. Please login.");
        router.push("/login");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
    <div className="bg-gray-800 p-10 rounded-xl shadow-lg w-96 text-white">
      <h2 className="text-3xl font-semibold mb-6 text-center text-yellow-400">Register</h2>
      {error && <p className="text-red-400 text-center mb-4">{error}</p>}
      <form onSubmit={handleRegister} className="space-y-4">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 border border-yellow-400 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white" required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-yellow-400 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-yellow-400 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white" required />
        <input type="text" placeholder="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full p-3 border border-yellow-400 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white" required />
        <input type="number" disabled placeholder="Age" defaultValue={age}  className="w-full p-3 border border-yellow-400 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white" required />
        <input type="date" placeholder="DOB" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full p-3 border border-yellow-400 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white" required />
        <input type="file" accept="image/png, image/jpg" onChange={(e) => setImage(e.target.files[0])} className="w-full p-3 border border-yellow-400 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white" required />
        <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold p-3 rounded-lg">Register</button>
      </form>
      <p className="mt-6 text-center text-gray-400">
        Already have an account? <a href="/login" className="text-yellow-400 font-bold">Login</a>
      </p>
    </div>
  </div>
  );
};

export default Register;
