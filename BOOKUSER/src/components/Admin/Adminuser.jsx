import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/auth';
import axios from 'axios';
import { toast } from 'react-toastify';  // Import the toast function
import { Link } from 'react-router-dom';

function Adminuser() {
    const { authorizationToken } = useAuth();
    const [adminUser, setAdminUser] = useState([]);
    const [loading, setLoading] = useState(true);

    // Initialize react-toastify


    const getAlluser = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/admin/users",
                {
                    headers: {
                        Authorization: authorizationToken,
                    },
                }
            );
            setAdminUser(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // const handleEdit = (userId) => {
    //     alert(`Edit user with ID: ${userId}`);
    // };

    const Deleteuser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8000/api/admin/users/delete/${userId}`, {
                headers: {
                    Authorization: authorizationToken,
                },
            });
            setAdminUser(prev => prev.filter(user => user._id !== userId));
            toast.success('User deleted successfully!');
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error('Failed to delete user.');
        }
    };

    useEffect(() => {
        getAlluser();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold text-black mb-4">Admin Users</h2>

            {loading ? (
                <p>Loading...</p>
            ) : adminUser.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <tr>
                                <th className="py-3 px-6 text-left">Avatar</th>
                                <th className="py-3 px-6 text-left">Name</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm">
                            {adminUser.map((user) => (
                                <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6">
                                        <img
                                            src={`http://localhost:8000/${user.profile_avatar}`}
                                            alt={`${user.first_name}'s avatar`}
                                            className="w-10 h-10 rounded-full object-cover border"
                                        />
                                    </td>
                                    <td className="py-3 px-6">{user.first_name} {user.last_name}</td>
                                    <td className="py-3 px-6">{user.email}</td>
                                    <td className="py-3 px-6">
                                        <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">
                                            <Link to={`/admin/users/${user._id}/edit`}>Edit</Link>
                                        </button>
                                        <button
                                            onClick={() => Deleteuser(user._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            )}
        </div>
    );
}

export default Adminuser;
