import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQty, decrementQty, removeCard } from '../features/slice/CardSlice';
import Header from './Header';
import { Link } from 'react-router-dom';

function Addtocard() {

    const cartItems = useSelector((state) => state.cards.cards);
    const dispatch = useDispatch();

    const handleIncrement = (item) => dispatch(incrementQty(item));
    const handleDecrement = (item) => dispatch(decrementQty(item));
    const handleRemove = (id) => dispatch(removeCard(id));

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-900 text-white p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p className="text-center text-gray-400">No items in cart</p>
                ) : (
                    <>
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item._id} className="bg-gray-800 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between shadow-md">
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={`http://localhost:8000/${item.image}`}
                                            alt={item.book_name}
                                            className="w-24 h-24 object-cover rounded-lg"
                                        />
                                        <div>
                                            <h3 className="text-xl font-semibold">{item.book_name}</h3>
                                            <p className="text-gray-400">Author: {item.author_name}</p>
                                            <p className="text-gray-400">Semester: {item.semester}</p>
                                            <p className="text-gray-400">Price: ₹{item.price}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 sm:mt-0">
                                        <div className="flex items-center space-x-3">
                                            <button onClick={() => handleDecrement(item)} className="bg-gray-600 px-2 py-1 rounded hover:bg-gray-500">-</button>
                                            <span>{item.qty}</span>
                                            <button onClick={() => handleIncrement(item)} className="bg-gray-600 px-2 py-1 rounded hover:bg-gray-500">+</button>
                                        </div>
                                        <button onClick={() => handleRemove(item._id)} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold">Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 text-center">
                            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-bold text-lg">
                                <Link to='/selectdate'>
                                    Total: ₹{totalPrice}
                                </Link>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}


export default Addtocard;
