import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

function AdminupdateUser() {
    const [initialData, setInitialData] = useState(null);
    const params = useParams();
    console.log('✌️params --->', params);
    const { authorizationToken } = useAuth();

    // Fetch existing user data

    const fetchUser = async () => {
        try {
            const res = await fetch(`http://localhost:8000/api/admin/users/${params.id}/`, {
                method: "GET",
                headers: { Authorization: authorizationToken },
            });
            const data = await res.json();
            setInitialData(data);
            formik.setValues({
                first_name: data.first_name || "",
                last_name: data.last_name || "",
                email: data.email || "",
                profile_avatar: "",
            });
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    // Formik setup with Yup validation
    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            profile_avatar: "",
        },
        validationSchema: Yup.object({
            first_name: Yup.string()
                .required("First name is required"),

            last_name: Yup.string()
                .required("Last name is required")
                .test(
                    "not-same",
                    "Last name should not be the same as first name",
                    function (value) {
                        return value !== this.parent.first_name;
                    }
                ),

            email: Yup.string()
                .email("Invalid email")
                .required("Email is required"),
        })
        ,
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append("first_name", values.first_name);
            formData.append("last_name", values.last_name);
            formData.append("email", values.email);

            if (values.profile_avatar instanceof File) {
                formData.append("profile_avatar", values.profile_avatar);
            }

            try {
                const response = await fetch(`http://localhost:8000/api/admin/users/update/${params.id}`, {
                    method: "PATCH",
                    headers: { Authorization: authorizationToken },
                    body: formData,
                });

                if (response.ok) {
                    toast.success("User updated successfully!");
                } else {
                    toast.error("Error updating user. Please try again.");
                }
            } catch (error) {
                toast.error("Something went wrong!");
                console.log('✌️error --->', error);
            }
        },
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        formik.setFieldValue("profile_avatar", file);
    };

    if (!initialData) return <p>Loading user data...</p>;

    return (
        <section className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">Edit User</h2>
            <form onSubmit={formik.handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block font-bold text-gray-700">First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.first_name}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {formik.touched.first_name && formik.errors.first_name && (
                        <div className="text-red-500 text-sm">{formik.errors.first_name}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block font-bold text-gray-700">Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.last_name}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {formik.touched.last_name && formik.errors.last_name && (
                        <div className="text-red-500 text-sm">{formik.errors.last_name}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block font-bold text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="text-red-500 text-sm">{formik.errors.email}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block font-bold text-gray-700">Profile Avatar</label>
                    <input
                        type="file"
                        name="profile_avatar"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {(formik.values.profile_avatar instanceof File || initialData.profile_avatar) && (
                        <img
                            src={
                                formik.values.profile_avatar instanceof File
                                    ? URL.createObjectURL(formik.values.profile_avatar)
                                    : `http://localhost:8000/${initialData.profile_avatar}`
                            }
                            alt="Avatar Preview"
                            className="w-20 h-20 mt-2 rounded-full object-cover border"
                        />
                    )}
                </div>

                <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                    Save Changes
                </button>
            </form>
        </section>
    );
}

export default AdminupdateUser;
