import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/auth";
import Header from "./Header";

const UserBookings = () => {
    const [bookings, setBookings] = useState([]);
    const { authorizationToken } = useAuth();

    const fetchBookings = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/auth/mybooking/user",
                {
                    headers: {
                        Authorization: authorizationToken,
                    },
                }
            );
            setBookings(response.data.bookings);
            console.log(" Bookings Fetched:", response.data.bookings);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <>
            <Header />
            <div className="p-4 max-w-5xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>

                {bookings.map((booking) =>
                    booking.BookDetails?.map((book, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow mt-4 duration-300 overflow-hidden border"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="h-56 w-full overflow-hidden">
                                    <img
                                        src={`http://localhost:8000/${book.image}`}
                                        alt={book.book_name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="p-4 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{book.book_name}</h3>
                                        <p className="text-gray-600 mb-1"><strong>Author:</strong> {book.author_name}</p>
                                        <p className="text-gray-600 mb-1"><strong>Price:</strong> ₹{book.price}</p>
                                        <p className="text-gray-600 mb-1"><strong>Semester:</strong> {book.semester}</p>
                                    </div>

                                    <div className="mt-4 text-sm text-gray-700">
                                        <p><strong>Issue Date:</strong> {new Date(booking.issue_date).toLocaleDateString()}</p>
                                        <p><strong>Submission Date:</strong> {new Date(booking.submission_date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default UserBookings;
