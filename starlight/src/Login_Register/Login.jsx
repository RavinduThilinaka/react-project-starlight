import React, { useState } from "react";
import Logo from "../assets/logo.png";
const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    age: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-[500px]">
        <div className="text-center mb-6">
            <div className="bg-gray-950 rounded-full w-32 h-32 flex justify-center items-center mx-auto">
                <img src={Logo} alt="Logo" className="mx-auto w-32 h-32" />
            </div>

          <h2 className="text-2xl font-bold">Join Us</h2>
          <p className="text-sm text-gray-600">Create an account and join our community of designers.</p>
        </div>
        <form onSubmit={handleSubmit}>
           
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Sign In
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Already have an account? <a href="./login.html" className="text-blue-500">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
