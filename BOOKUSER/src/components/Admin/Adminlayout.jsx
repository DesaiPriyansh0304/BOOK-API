import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { MdPerson3, } from "react-icons/md";
import { PiBookFill } from "react-icons/pi";
import Header from "../Header"

function AdminLayout() {

    return (
        <>
            <Header />
            <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-800 text-white">
                    <div className="p-4 text-center text-lg font-bold border-b border-gray-700">
                        Admin Dashboard
                    </div>
                    <nav className="mt-4">
                        <ul>
                            <li className="px-4 py-2 hover:bg-gray-700">
                                <NavLink to="/admin" className="flex items-center space-x-2">
                                    <span>Dashboard</span>
                                </NavLink>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-700">
                                <NavLink to="/admin/users" className="flex items-center space-x-2">
                                    <MdPerson3 className="text-xl" />
                                    <span>Users</span>
                                </NavLink>
                            </li>

                            <li className="px-4 py-2 hover:bg-gray-700">
                                <NavLink to="/admin/books" className="flex items-center space-x-2">
                                    <PiBookFill className="text-xl" />
                                    <span>Book</span>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </aside>


                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export default AdminLayout;
