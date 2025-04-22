import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Header from '../Header';
import { useAuth } from '../../Context/auth';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const navigate = useNavigate();
    const { storeTokenInLS, user } = useAuth();
    console.log('✌️user --->', user);

    // Validation 
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    const handleSubmit = async (values) => {
        try {
            const response = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful:', data);
                storeTokenInLS(data.token);
                toast.success('Login successful!');
                navigate('/');
            } else {
                toast.error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <Header />
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-bold text-white text-center">Login</h2>

                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-300">Email</label>
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-2 mt-1 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-red-400 text-sm mt-1"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-300">Password</label>
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        className="w-full px-4 py-2 mt-1 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="text-red-400 text-sm mt-1"
                                    />
                                </div>

                                <Link
                                    to="/forgot-password"
                                    className="block text-sm text-blue-400 hover:underline text-right"
                                >
                                    Forgot Password?
                                </Link>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                                >
                                    {isSubmitting ? 'Logging in...' : 'Login'}
                                </button>

                                <Link
                                    to="/register"
                                    className="block w-full py-2 text-center font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition mt-4"
                                >
                                    Don't have an account? Register
                                </Link>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
