import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/auth';
import Header from './Header';
import axios from 'axios';
import { toast } from 'react-toastify';

function ProfileUpload() {
    const { user } = useAuth(); // user = { userData: { ... } }
    console.log('✌️user --->', user);
    const [userData, setUserData] = useState(null);//userdata store
    const [selectedFile, setSelectedFile] = useState(null); ///user select file
    const [preview, setPreview] = useState('');//URL image
    const [loading, setLoading] = useState(false);
    const [fileError, setFileError] = useState('');

    const { authorizationToken } = useAuth();


    useEffect(() => {
        if (user.userData) {
            setUserData(user.userData);
            setPreview(user.userData.profile_avatar ? `http://localhost:8000/${user.userData.profile_avatar}` : '/avatar.png');
        }
    }, [user]);

    //  no user data,
    if (!userData) {
        return (
            <>
                <Header />
                <div className="text-center mt-10 text-lg">Loading user data...</div>
            </>
        );
    }

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setFileError('');

        if (file) {
            setPreview(URL.createObjectURL(file)); // Show preview of the selected image
        }
    };

    // Handle upload of profile image
    const handleUpload = async () => {
        if (!selectedFile) {
            setFileError('Please select a file to upload.');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('profile_avatar', selectedFile);
        formData.append('id', userData._id); // Send user ID to backend

        try {
            const res = await axios.post(
                'http://localhost:8000/api/upload/upload-profile',
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },

                }
            );

            const imageUrl = res.data.profile_avatar;
            setPreview(`http://localhost:8000/${imageUrl}`);
            setUserData((prev) => ({ ...prev, profile_avatar: imageUrl }));
            setSelectedFile(null);
            toast.success('Upload successful!');

            setLoading(false);
        } catch (err) {
            console.error(err);
            setFileError('Upload failed. Please try again.');
        }
    };

    // Handle deletion of profile image
    const handleDelete = async () => {
        // const confirmDelete = window.confirm('Are you sure you want to delete your profile picture?');
        // if (!confirmDelete) return;

        setLoading(true);

        try {
            console.log("Deleting profile for user ID:", userData._id);
            await axios.delete('http://localhost:8000/api/upload/delete-profile', {
                headers: {
                    Authorization: authorizationToken,
                },
                data: { id: userData._id }, // Send user ID in body
                // withCredentials: true,
            });

            setPreview('/default-avatar.png'); // Reset to default image
            setUserData((prev) => ({ ...prev, profile_avatar: '' }));
            setLoading(false);
            toast.success('Delete successful!');
        } catch (err) {
            console.error(err);
            setFileError('Delete failed. Please try again.');
        }
    };


    return (
        <>
            <Header />
            <div className="max-w-md mx-auto p-6 bg-white shadow-md mt-10 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Your Profile</h2>

                <div className="flex flex-col items-center text-center mb-4">
                    <img
                        src={preview || '/default-avatar.png'}
                        alt="Profile Preview"
                        className="w-32 h-32 rounded-full object-cover border mb-2"
                    />
                    <h3 className="text-xl font-semibold">
                        {userData.first_name} {userData.last_name}
                    </h3>
                    <p className="text-gray-600">{userData.email}</p>
                </div>

                {/* File input */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mb-2 block mx-auto border border-blue-500 p-2"
                />

                {/* File selection error message */}
                {fileError && <p className="text-red-500 text-sm text-center mb-4">{fileError}</p>}

                <div className="flex justify-center gap-4">
                    <button
                        onClick={handleUpload}
                        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Uploading...' : 'Upload'}
                    </button>

                    <button
                        onClick={handleDelete}
                        className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </>
    );
}

export default ProfileUpload;
