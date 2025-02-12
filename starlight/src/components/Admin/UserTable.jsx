import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";

export default function UserTable({rows = [],selectedUser,deleteUser}) {

    const [searchQuery, setSearchQuery] = useState("");

    const filteredRows = rows.filter(row =>
        Object.values(row).some(
            field => field != null && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
           
        )
    );

  return (
    <div className="overflow-x-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="px-6 py-3 font-semibold">Name</th>
              <th className="px-6 py-3 font-semibold">Email</th>
              <th className="px-6 py-3 font-semibold">Age</th>
              <th className="px-6 py-3 font-semibold">Role</th>
              <th className="px-6 py-3 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
                filteredRows && filteredRows.length > 0 ? filteredRows.map(row =>(
                    <tr key={row.id || row.email}>
                        <td>{row.name}</td>
                        <td>{row.email}</td>
                        <td>{row.age}</td>
                        <td>{row.role}</td>
                        <td className="px-6 py-4 flex justify-center space-x-3">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition"
                                onClick={() => selectedUser(row)}>
                            <FaEye className="w-5 h-5" />
                            </button>
                            <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg transition"
                                onClick={() => selectedUser(row)}>
                            <FaEdit className="w-5 h-5" />
                            </button>
                            <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
                                onClick={() => deleteUser(row._id)}>
                            <FaTrash className="w-5 h-5" />
                            </button>
                        </td>
                    </tr>
                )):(
                    <tr>
                        <td colSpan="5" className="text-center py-4 text-gray-500" >
                        No data available
                        </td>
                    </tr>
                )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
