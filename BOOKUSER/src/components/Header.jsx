import React, { useEffect, useState, useRef } from 'react';
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { MdAddCard } from "react-icons/md";
import { useAuth } from '../Context/auth';

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const { user } = useAuth();
    // console.log('✌️user --->', user);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }

        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setMenuOpen(false);
    };

    return (
        <header className="bg-gray-900 text-white p-4 shadow-md">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="text-xl font-bold">MY BOOK</div>
                <div className="space-x-4 flex items-center">
                    <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300">Home</Link>
                    <Link to="/book" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300">Books</Link>
                    <Link to="/mybookings" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300">My Slot</Link>
                    <Link to="/mybookuser" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300">BookUser</Link>
                    <Link to="/addtocard" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"><MdAddCard /></Link>

                    {isLoggedIn ? (
                        <div className="relative" ref={menuRef}>
                            <img
                                src={user?.userData?.profile_avatar ? `http://localhost:8000/${user.userData.profile_avatar}` : "/default-profile.png"}
                                alt="Profile"
                                className="w-10 h-10 rounded-full object-cover border-2 border-white cursor-pointer"
                                onClick={() => setMenuOpen(!menuOpen)}
                            />
                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg z-50">
                                    <div className="px-4 py-2 border-b font-semibold">My Account</div>
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-300">
                            <BsFillPersonFill /> Login
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;
