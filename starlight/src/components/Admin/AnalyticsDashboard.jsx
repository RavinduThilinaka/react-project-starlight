import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { AiOutlineMenu, AiOutlineBell } from 'react-icons/ai';
import Sidebar from './AdminSidebar';

const AnalyticsDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const analyticsData = [
    { date: 'Jan 1', users: 120, orders: 85, payments: 78 },
    { date: 'Jan 2', users: 180, orders: 120, payments: 112 },
    { date: 'Jan 3', users: 150, orders: 95, payments: 89 },
    { date: 'Jan 4', users: 210, orders: 140, payments: 132 },
    { date: 'Jan 5', users: 240, orders: 160, payments: 154 },
    { date: 'Jan 6', users: 300, orders: 200, payments: 190 },
    { date: 'Jan 7', users: 350, orders: 240, payments: 225 },
  ];

  const totalUsers = analyticsData.reduce((sum, item) => sum + item.users, 0);
  const totalOrders = analyticsData.reduce((sum, item) => sum + item.orders, 0);
  const totalPayments = analyticsData.reduce((sum, item) => sum + item.payments, 0);
  const conversionRate = ((totalOrders / totalUsers) * 100).toFixed(1);

  const handleLogout = () => {
    console.log('Logging out...');
    // Add your logout logic here
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        handleLogout={handleLogout}
      />

      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <AiOutlineMenu className="w-6 h-6 text-gray-600" />
          </motion.button>
          
          <div className="flex items-center space-x-4">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="relative p-2 rounded-full hover:bg-gray-100 cursor-pointer"
            >
              <AiOutlineBell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="font-medium">Admin</span>
            </motion.div>
          </div>
        </header>

        <main className="p-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-800 mb-6"
          >
            Analytics Dashboard
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {[
              { title: 'Registered Users', value: totalUsers, color: 'blue', trend: '↑ 12%' },
              { title: 'Total Orders', value: totalOrders, color: 'purple', trend: '↑ 8%' },
              { title: 'Successful Payments', value: totalPayments, color: 'green', trend: '↑ 5%' },
              { title: 'Conversion Rate', value: `${conversionRate}%`, color: 'orange', trend: '↑ 2%' },
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`bg-white rounded-lg shadow p-6 border-t-4 border-${card.color}-500`}
              >
                <h3 className="text-gray-500 font-medium">{card.title}</h3>
                <p className={`text-3xl font-bold text-${card.color}-600`}>{card.value}</p>
                <p className="text-green-500 text-sm mt-2">{card.trend} from last week</p>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-gray-800 font-semibold mb-4">User Registration Trend</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#3b82f6" 
                      strokeWidth={2} 
                      name="Registered Users"
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-gray-800 font-semibold mb-4">Orders & Payments</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="orders" 
                      fill="#8b5cf6" 
                      name="Orders"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar 
                      dataKey="payments" 
                      fill="#10b981" 
                      name="Payments"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow p-6 mt-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-800 font-semibold">Daily Analytics</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
              >
                Export Data
              </motion.button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Users</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payments</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {analyticsData.map((item, index) => (
                    <motion.tr 
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ backgroundColor: '#f9fafb' }}
                      className="transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">{item.users}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600 font-medium">{item.orders}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">{item.payments}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600 font-medium">
                        {((item.orders / item.users) * 100).toFixed(1)}%
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;