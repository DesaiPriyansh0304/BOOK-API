import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/auth";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Adminbookupdate() {
    const [userBook, setBookData] = useState({
        book_name: "",
        author_name: "",
        price: "",
        semester: "",
        image: "",
    });

    const [existingImage, setExistingImage] = useState(null);
    const { authorizationToken } = useAuth();
    const params = useParams();
    console.log('✌️params --->', params);

    // Fetch single book
    const singleBookData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/admin/books/${params.id}/`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            const data = await response.json();
            setBookData(data);
            setExistingImage(data.image); 
        } catch (error) {
            console.error("Error fetching book data:", error);
        }
    };

    useEffect(() => {
        singleBookData();
    }, []);

    // Text input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({
            ...userBook,
            [name]: value,
        });
    };

    // Image select change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBookData({
                ...userBook,
                image: file, // store file
            });
            setExistingImage(URL.createObjectURL(file));
        }
    };

    // Form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("book_name", userBook.book_name);
        formData.append("author_name", userBook.author_name);
        formData.append("price", userBook.price);
        formData.append("semester", userBook.semester);

        // Image only if it's a new file
        if (userBook.image instanceof File) {
            formData.append("book_image", userBook.image);
        }

        try {
            const response = await fetch(
                `http://localhost:8000/api/admin/books/update/${params.id}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: authorizationToken,
                    },
                    body: formData,
                }
            );

            const data = await response.json();

            if (response.ok) {
                toast.success("Book updated successfully!");
            } else {
                toast.error(`Error: ${data.message || "Something went wrong"}`);
            }
        } catch (error) {
            console.error("Error updating book:", error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-5 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Update Book Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="book_name"
                    value={userBook.book_name}
                    onChange={handleChange}
                    placeholder="Book Name"
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="author_name"
                    value={userBook.author_name}
                    onChange={handleChange}
                    placeholder="Author Name"
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={userBook.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="semester"
                    value={userBook.semester}
                    onChange={handleChange}
                    placeholder="Semester"
                    className="w-full border p-2 rounded"
                    required
                />

                {/* Preview Image */}
                {existingImage && (
                    <div>
                        <p className="font-semibold">Image Preview:</p>
                        <img
                            src={`http://localhost:8000/${existingImage}`}
                            alt="Book"
                            className="w-40 h-40 object-cover rounded border mb-2"
                        />
                    </div>
                )}

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border p-2 rounded"
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Update Book
                </button>
            </form>
        </div>
    );
}

export default Adminbookupdate;
