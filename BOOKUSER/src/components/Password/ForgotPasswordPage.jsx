import React, { useState } from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/password/forgotpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Reset link sent successfully");
      } else {
        toast.error(data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.log('✌️error --->', error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-xl text-white space-y-4 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 rounded-lg"
            required
          />
          <button type="submit" className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition">
            Send Reset Link
          </button>
          <Link to="/change-password">
            <button
              type="button"
              className="w-full bg-gray-600 py-2 rounded-lg hover:bg-gray-700 transition mt-2"
            >
              Change Password
            </button>
          </Link>
        </form>
      </div>

    </>
  );
};

export default ForgotPasswordPage;
