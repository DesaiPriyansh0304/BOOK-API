import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../Header";

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [newPassword, setNewPassword] = useState("");

    const handleReset = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/api/password/resetpassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message || "Password reset successfully!");
            } else {
                toast.error(data.message || "Failed to reset password.");
            }
        } catch (error) {
            console.log('✌️error --->', error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-900 flex justify-center items-center">
                <form onSubmit={handleReset} className="bg-gray-800 p-6 rounded-xl text-white space-y-4 w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center">Reset Password</h2>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 rounded-lg"
                        required
                    />
                    <button type="submit" className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition">
                        Reset Password
                    </button>
                </form>
            </div>
        </>
    );
};

export default ResetPasswordPage;
