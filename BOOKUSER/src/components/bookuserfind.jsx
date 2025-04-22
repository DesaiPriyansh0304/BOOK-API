import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";

const BookIssueSearch = () => {
    const [bookName, setBookName] = useState("");
    const [bookData, setBookData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!bookName) return;
        setLoading(true);
        try {
            const res = await axios.get(
                `http://localhost:8000/api/auth/searchbookuser?book_name=${bookName}`
            );
            setBookData(res.data.data[0] || null);
            setLoading(false);
        } catch (err) {
            console.error("Error:", err);
        }
    };

    return (
        <>
            <Header />
            <div className="p-6 max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-center">Book Issued Users</h2>
                <div className="flex gap-2 mb-6">
                    <input
                        type="text"
                        placeholder="Enter book name"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300"
                        value={bookName}
                        onChange={(e) => setBookName(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        {loading ? "Searching..." : "Search"}
                    </button>
                </div>

                {bookData ? (
                    <div className="bg-white p-4 rounded-xl shadow-md">
                        <h3 className="text-xl font-semibold mb-4">
                            Book: <span className="text-blue-600">{bookData.book_name}</span>
                        </h3>
                        <div className="space-y-3">
                            {bookData.users.map((user, id) => (
                                <div key={id} className="flex items-center gap-3 p-2 border rounded-lg">
                                    <img
                                        src={
                                            user.profile_avatar
                                                ? `http://localhost:8000/${user.profile_avatar}`
                                                : "/default-profile.png"
                                        }
                                        alt="avatar"
                                        className="w-12 h-12 rounded-full object-cover"
                                    />

                                    <div>
                                        <p className="font-medium">
                                            {user.first_name} {user.last_name}
                                        </p>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    !loading && <p className="text-center text-gray-500">No data found.</p>
                )}
            </div>
        </>
    );
};

export default BookIssueSearch;
