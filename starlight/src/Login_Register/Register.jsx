import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState(""); // Ensure the initial value is not undefined
  const [email, setEmail] = useState(""); // Ensure the initial value is not undefined
  const [age, setAge] = useState(""); // Ensure the initial value is not undefined
  const [role, setRole] = useState(""); // Ensure the initial value is not undefined
  const [password, setPassword] = useState(""); // Ensure the initial value is not undefined
  const [secretKey, setSecretKey] = useState(""); // State for secret key input
  const [keyVerified, setKeyVerified] = useState(false); // Track if key is verified
  const [isDisabled, setIsDisabled] = useState(false); // Track if form is disabled
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/api/signupUser', { name, email, age, role, password })
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((error) => {
        console.error("There was an error signing up!", error);
        alert("Error during signup. Please try again.");
      });
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);

    if (selectedRole === "ADMIN") {
      setIsModalOpen(true); 
    } else {
      setKeyVerified(false);
      setIsDisabled(false);
    }
  };

  const verifySecretKey = () => {
    if (secretKey === "admin") { 
      setKeyVerified(true);
      setIsDisabled(false); 
      setIsModalOpen(false); 
    } else {
      alert("Incorrect secret key. You are not authorized.");
      setIsDisabled(true);
    }
  };

  const handleCancel = () => {
    setRole("");
    setName(""); 
    setEmail("");
    setAge("");
    setPassword("");
    setSecretKey(""); 
    setIsDisabled(false); 
    setIsModalOpen(false); 
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
            required
            onChange={handleRoleChange}
            className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={role}
          >
            <option value="">Select your Role</option>
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            name="name"
            required
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={isDisabled}
            value={name}
          />
          <input
            type="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={isDisabled}
            value={email}
          />
          <input
            type="number"
            name="age"
            required
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={isDisabled}
            value={age}
          />
          <input
            type="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={isDisabled}
            value={password}
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            disabled={isDisabled}
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </div>

      {/* Modal for Secret Key */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Admin Secret Key</h3>
            <input
              type="text"
              placeholder="Enter the secret key"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="w-full p-2 mb-4 border rounded-lg"
            />
            <div className="flex justify-between">
              <button
                onClick={verifySecretKey}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Verify
              </button>
              <button
                onClick={handleCancel} 
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
