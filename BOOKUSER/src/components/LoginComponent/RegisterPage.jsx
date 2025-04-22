import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header';
import { useAuth } from '../../Context/auth';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation 
const validationSchema = Yup.object().shape({
    first_name: Yup.string()
        .required('First name is required')
        .test('first-last-not-same', 'First and last name cannot be the same', function (value) {
            const { last_name } = this.parent;
            return value?.toLowerCase() !== last_name?.toLowerCase();
        }),
    last_name: Yup.string()
        .required('Last name is required')
        .test('last-first-not-same', 'Last and first name cannot be the same', function (value) {
            const { first_name } = this.parent;
            return value?.toLowerCase() !== first_name?.toLowerCase();
        }),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(7, 'Password must be at least 7 characters').required('Password is required'),
});


const RegisterPage = () => {
    const { storeTokenInLS } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            const response = await fetch('http://localhost:8000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Register successful:', data);
                storeTokenInLS(data.token);
                toast.success('Registered! Check your email to verify your account.');
                navigate('/');
            } else {
                console.error('Register failed:', data.message || 'Unknown error');
                toast.error(data.message || 'Register failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <Header />
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-bold text-white text-center">Register</h2>
                    <Formik
                        initialValues={{ first_name: '', last_name: '', email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                {['first_name', 'last_name', 'email', 'password'].map((field) => (
                                    <div key={field}>
                                        <label className="block text-sm text-gray-300 capitalize">{field.replace('_', ' ')}</label>
                                        <Field
                                            type={field === 'password' ? 'password' : 'text'}
                                            name={field}
                                            className="w-full px-4 py-2 mt-1 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder={`Enter your ${field.replace('_', ' ')}`}
                                        />
                                        <ErrorMessage
                                            name={field}
                                            component="div"
                                            className="text-sm text-red-500 mt-1"
                                        />
                                    </div>
                                ))}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                                >
                                    {isSubmitting ? 'Registering...' : 'Register'}
                                </button>

                                <Link
                                    to="/login"
                                    className="block w-full py-2 text-center font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                                >
                                    Already have an account? Login
                                </Link>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
