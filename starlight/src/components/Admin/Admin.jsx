import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineHome, AiOutlineUser, AiOutlineSetting, AiOutlineLogout } from "react-icons/ai";
import axios from "axios";
import UserTable from "./UserTable";
import { data, useNavigate } from "react-router-dom";

export default function Admin() {
  const [active, setActive] = useState("Dashboard");
  const [users,setUsers] = useState([])
  const [selectedUser,setSelectedUser] = useState({})
  const [isEdit,setIsEdite] = useState(false)
  const navigate = useNavigate()

  const userName = localStorage.getItem('userName');
  const userFirstLetter = localStorage.getItem('userFirstLetter');
  const menuItems = [
    { name: "Dashboard", icon: <AiOutlineHome className="w-6 h-6" /> },
    { name: "Users", icon: <AiOutlineUser className="w-6 h-6" /> },
    { name: "Settings", icon: <AiOutlineSetting className="w-6 h-6" /> },
  ];

  const handleLogout = () => {
    // Clear the localStorage data (remove token and user info)
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userAge');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userPassword');
    localStorage.removeItem('userFirstLetter');

    // Redirect the user to the login page
    navigate('/login');
  };

useEffect(() =>{
    getUsers();
},[])

  const getUsers = () =>{
    const token = localStorage.getItem('authToken');
    axios.get("http://localhost:3001/api/getUsers",{
        headers: {
            Authorization: `Bearer ${token}`  // Attach the token to the request header
        }
    })
    .then(response =>{
        setUsers(response.data?.response||[])
    })
    .catch(error =>{
        console.error("Axios error",error)
    })
  }

  const deleteUser = (_id) =>{
    axios.delete(`http://localhost:3001/api/deleteUser/${_id}`)
    .then(() =>{
        getUsers();//refresh users
    })
    .catch(error =>{
        console.error("Axios error",error);
    })
  }

  return (
    <>
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col">
                <h1 className="text-2xl font-bold mb-6">Admin <span className="text-3xl">Panel</span></h1>
                <nav className="flex-1">
                    {menuItems.map((item) =>(
                        <motion.div
                            key={item.name}
                            whileHover={{scale:1.1}}
                            whileTap={{scale:0.9}}
                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                                active === item.name ? "bg-gray-700" : "hover:bg-gray-800"
                            }`}
                            onClick={()=>setActive(item.name)}
                        >
                            {item.icon}
                            <span>{item.name}</span>

                        </motion.div>
                    ))}
                </nav>

                <button className="flex items-center gap-3 p-3 mt-5 border-red-600 rounded-lg hover:bg-red-700 transition"  onClick={handleLogout}>
                    <AiOutlineLogout/>
                    Login out
                </button>
            </aside>

            <main className="flex-1 p-6">
                <header className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <div className="bg-gray-700 text-white text-2xl font-bold w-8 h-8 rounded-full flex items-center justify-center mr-3">
                            {userFirstLetter}
                        </div>
                        <h2 className="text-3xl font-semibold">Welcome, {userName}</h2>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {title:"Total Users",value:users.length, icon: <AiOutlineUser className="w-8 h-8 text-blue-500 " />},
                        {title:"Orders Today",value:"320"},
                        {title:"Revenue",value:"$45,000"}
                    ].map((stat,index) =>(
                        <motion.div
                            key={stat.title}
                            initial={{opacity:0,y:50}}
                            animate={{opacity:1,y:0}}
                            transition={{delay:index*0.2}}
                            className="bg-white p-6 rounded-xl shadow-md"
                        >
                            <h3 className="text-lg font-semibold flex items-center justify-between">{stat.title}</h3>
                            {stat.icon}
                            <p className="text-2xl font-bold mt-2">{stat.value}</p>

                        </motion.div>
                    ))}
                </div>
                <UserTable
                   
                    rows={users}
                    selectedUser = {data =>{
                        setSelectedUser(data);
                        setIsEdite(true);
                    }}
                    
                    deleteUser={data => window.confirm('Are you sure?') && deleteUser(data)}
/>
            </main>
        </div>
    </>
  );
}
