import React, { useState } from 'react';
import Header from '../Header';
import { useAuth } from '../../Context/auth';
import { toast } from 'react-toastify';

function ChangePasswordPage() {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const { authorizationToken } = useAuth();

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { currentPassword, newPassword, confirmPassword } = formData;

        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match");
            return;
        }

        try {
            const res = await fetch('http://localhost:8000/api/password/changepassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authorizationToken
                },
                body: JSON.stringify({ currentPassword, newPassword })
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(data.message || 'Password changed successfully');
                setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                toast.error(data.message || 'Error changing password');
            }
        } catch (error) {
            console.log('✌️error --->', error);
            toast.error('Something went wrong');
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
                <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            placeholder="Current Password"
                            className="w-full p-2 bg-gray-700 rounded outline-none"
                            required
                        />
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="New Password"
                            className="w-full p-2 bg-gray-700 rounded outline-none"
                            required
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm New Password"
                            className="w-full p-2 bg-gray-700 rounded outline-none"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded transition duration-200"
                        >
                            Change Password
                        </button>
                    </form>
                </div>
            </div>

        </>
    );
}

export default ChangePasswordPage;
