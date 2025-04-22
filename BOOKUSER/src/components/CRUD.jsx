import React from 'react'
import { Link } from 'react-router-dom'

function CRUD() {
    return (
        <div className="flex justify-between p-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                <Link to="/admin">
                    ADMIN PANAL
                </Link>
            </button>

        </div>
    )
}

export default CRUD
