import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { addCard } from '../features/slice/CardSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    // console.log('✌️books --->', books);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const cartItems = useSelector((state) => state.cards.cards);
    // console.log('✌️cartItems --->', cartItems);


    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/books/book');
            setBooks(response.data.msg);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch data: ' + error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleAddToCart = (book) => {
        // dispatch(addCard({ ...book, qty: 1 }));

        //login
        const token = localStorage.getItem("token");

        if (!token) {
            toast.warning("Please log in to rent to book.");
            navigate("/login");
            return;
        }
            
        const isAlreadyInCart = cartItems.some((item) => item._id === book._id);

        if (isAlreadyInCart) {
            toast.warning(`${book.book_name} Book already in cart`)
        } else {
            dispatch(addCard({ ...book, qty: 1 }));
            toast.success(`${book.book_name} Book added to cart`);
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-900 text-white">
                <div className="w-full max-w-7xl mx-auto p-8 space-y-6">
                    <h2 className="text-3xl font-bold text-center">Books List</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {books.map((book) => (
                            <div key={book._id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                                <div className="flex flex-col items-center">
                                    <img
                                        src={`http://localhost:8000/${book.image}`}
                                        alt={book.book_name}
                                        className="w-full h-48 object-cover mb-4"
                                    />
                                    <div className="px-4 py-2">
                                        <h3 className="text-xl font-semibold text-white text-center">{book.book_name}</h3>
                                        <p className="text-gray-300 mt-2 text-center">Author: {book.author_name}</p>
                                        <p className="text-gray-400 mt-1 text-center">Price: ₹{book.price}</p>
                                        <p className="text-gray-500 mt-1 text-center">Semester: {book.semester}</p>
                                    </div>
                                    <div className="w-full px-4 py-2 bg-gray-700 border-t border-gray-600">
                                        <button
                                            onClick={() => handleAddToCart(book)}
                                            className="w-full py-2 mt-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BooksPage;
