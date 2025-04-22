import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/auth';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function AdminBook() {
  const { authorizationToken } = useAuth();
  const [adminBook, setAdminBook] = useState([]);

  const getAllBooks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/admin/books",
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      setAdminBook(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      toast.error("Failed to load books");
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);



  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:8000/api/admin/books/delete/${bookId}`, {
        headers: {
          Authorization: authorizationToken,
        },
      });
      toast.success("Book deleted successfully");
      getAllBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Failed to delete book");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Book List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {adminBook.length > 0 ? (
          adminBook.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-2xl shadow-lg p-4 dark:bg-gray-800"
            >
              <img
                src={`http://localhost:8000/${book.image}`}
                alt={book.book_name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <h3 className="text-xl dark:text-gray-300 font-semibold">{book.book_name}</h3>
              <p className="text-gray-600 dark:text-gray-300">Author: {book.author_name}</p>
              <p className="text-gray-600 dark:text-gray-300">Price: ₹{book.price}</p>
              <p className="text-gray-600 dark:text-gray-300">Semester: {book.semester}</p>
              <div className="flex justify-between mt-4">
                <button
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
                >
                  <Link to={`/admin/books/${book._id}/edit`}>
                    Edit
                  </Link>

                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No books found.</p>
        )}
      </div>
    </div>
  );
}

export default AdminBook;
