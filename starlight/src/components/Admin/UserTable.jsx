import { FaEye, FaEdit, FaTrash, FaSearch, FaUserPlus } from "react-icons/fa";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function UserTable({ rows = [], selectedUser, deleteUser }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const filteredRows = rows.filter(row =>
    Object.values(row).some(
      field => field != null && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Sorting function
  const sortedRows = [...filteredRows].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-x-auto p-6"
    >
      <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
        {/* Table Header with Search */}
        <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.h2 
              whileHover={{ scale: 1.02 }}
              className="text-2xl font-bold text-white"
            >
              User Management
            </motion.h2>
            
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-300" />
              </div>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 rounded-lg bg-blue-400 bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:bg-opacity-30 transition-all"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(59, 130, 246, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium shadow-md"
            >
              <FaUserPlus />
              Add User
            </motion.button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['name', 'email', 'age', 'role'].map((header) => (
                  <th 
                    key={header}
                    onClick={() => requestSort(header)}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      {header.charAt(0).toUpperCase() + header.slice(1)}
                      <span className="ml-1 text-blue-500">
                        {getSortIndicator(header)}
                      </span>
                    </div>
                  </th>
                ))}
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>
                {sortedRows && sortedRows.length > 0 ? (
                  sortedRows.map((row, index) => (
                    <motion.tr
                      key={row.id || row.email}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                      className="hover:bg-blue-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                            {row.name?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{row.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {row.age}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          row.role === 'admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {row.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <div className="flex justify-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: '#3B82F6' }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:text-white transition-all"
                            onClick={() => selectedUser(row)}
                            title="View"
                          >
                            <FaEye className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: '#F59E0B' }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-lg bg-yellow-100 text-yellow-600 hover:text-white transition-all"
                            onClick={() => selectedUser(row)}
                            title="Edit"
                          >
                            <FaEdit className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: '#EF4444' }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-lg bg-red-100 text-red-600 hover:text-white transition-all"
                            onClick={() => deleteUser(row._id)}
                            title="Delete"
                          >
                            <FaTrash className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                          <FaSearch className="text-gray-400 text-xl" />
                        </div>
                        <p className="text-gray-500 text-lg font-medium">No users found</p>
                        <p className="text-gray-400 mt-1">
                          {searchQuery ? 'Try a different search term' : 'Add a new user to get started'}
                        </p>
                      </div>
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {sortedRows.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="px-6 py-3 flex items-center justify-between border-t border-gray-200"
          >
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
              <span className="font-medium">{sortedRows.length}</span> results
            </div>
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ backgroundColor: '#E5E7EB' }}
                className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 text-sm font-medium"
              >
                Previous
              </motion.button>
              <motion.button
                whileHover={{ backgroundColor: '#3B82F6', color: '#FFF' }}
                className="px-3 py-1 rounded-md bg-blue-100 text-blue-600 text-sm font-medium"
              >
                1
              </motion.button>
              <motion.button
                whileHover={{ backgroundColor: '#E5E7EB' }}
                className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 text-sm font-medium"
              >
                Next
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}