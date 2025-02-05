import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Register = () => {
 
  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [age,setAge]=useState();
  const [role,setRole]=useState();
  const [password,setPassowrd]=useState();

 const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/api/signupUser',{name,email,age,role,password})
    .then((result) =>{
      console.log(result);
      navigate("/login")
    })
    .catch((error) =>console.log(error));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-[500px]">
        <div className="text-center mb-6">
            <div className="bg-gray-950">
                <img src={Logo} alt="Logo" className="mx-auto w-[150px]" />
            </div>

          <h2 className="text-2xl font-bold">Join Us</h2>
          <p className="text-sm text-gray-600">Create an account and join our community of designers.</p>
        </div>
        <form onSubmit={handleSubmit}>
            <select
                name="role"
                
                onChange={(e) =>setRole(e.target.value)}
                className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                <option value="">Select your Role</option>
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
                <option value="Other">Other</option>
            </select>
            <input
                type="text"
                name="name"
                onChange={(e) =>setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          <input
            type="email"
            name="email"
            onChange={(e) =>setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
         
          <input
            type="number"
            name="age"
            onChange={(e) =>setAge(e.target.value)}
            placeholder="Enter your age"
            className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            onChange={(e) =>setPassowrd(e.target.value)}
            placeholder="Enter password"
            className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Already have an account? <a href="./login.html" className="text-blue-500">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
