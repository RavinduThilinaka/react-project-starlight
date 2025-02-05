import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {

  const navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
   
    axios.post('http://localhost:3001/api/login',{email,password})
    .then(result =>{
      console.log(result);

      if(result.data.message === "Success"){
        localStorage.setItem('userName',result.data.name);
        localStorage.setItem('userEmail',result.data.email);
        localStorage.setItem('userAge',result.data.age);
        localStorage.setItem('userRole',result.data.role);
        localStorage.setItem('userPassword',result.data.password);

        const role = result.data.role;

        switch(role){
          case 'ADMIN':
            navigate('/admin')
            break;

            default:
              navigate('/')
        }
      }else{
        alert(result.data.message);
      }
    })

    .catch(error =>{
      console.log(error);
      alert('Incorrect password or email')
    })
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
            onChange={(e) =>setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            required
            onChange={(e) =>setPassword(e.target.value)}
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
