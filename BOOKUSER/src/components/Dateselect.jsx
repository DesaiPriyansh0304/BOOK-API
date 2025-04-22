import React, { useState } from 'react';
import { DatePicker, Space, Button, message } from 'antd';
import moment from "moment";
import axios from "axios";
import { useAuth } from '../Context/auth';
import Header from './Header';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const { RangePicker } = DatePicker;

function Dateselect() {
    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(false);


    const { authorizationToken } = useAuth();
    const navigate = useNavigate();

    const cartItems = useSelector((state) => state.cards.cards);
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

    const handleDateChange = (dates) => {
        setDates(dates);
    };
    const [issueDate, submissionDate] = dates;

    const disabledDate = (current) => current && current < moment().startOf("day");

    const handleSubmit = async () => {
        if (!dates || dates.length !== 2) {
            message.error("Please select both issue and submission dates.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            message.error("User not not provid token.");
            return;
        }


        const payload = {
            issue_date: issueDate.format("YYYY-MM-DD"),
            submission_date: submissionDate.format("YYYY-MM-DD"),
            bookId: cartItems.map((e) => e),
        };
        console.log("Payload being sent/bookissues:", payload);

        try {
            setLoading(true);
            const response = await axios.post("http://localhost:8000/api/books/bookissue", payload, {
                headers: {
                    Authorization: authorizationToken,
                    "Content-Type": "application/json"
                }
            });

            message.success("Book issued successfully!");
            console.log("Response:", response.data);
            setDates([]);
            navigate('/mybookings');
            setLoading(false);
        } catch (error) {
            console.error("Error issuing book:", error);
            message.error("Failed to issue book.");
        }
    };

    return (
        <>
            <Header />
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
                <Space direction="vertical" className="w-full">
                    <div className="mb-4">
                        <label className="text-lg text-gray-700 font-semibold">
                            Issue Date and Submission Date Range:
                        </label>
                        <RangePicker
                            disabledDate={disabledDate}
                            onChange={handleDateChange}
                            value={dates}
                            className="mt-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <Button
                        type="primary"
                        loading={loading}
                        onClick={handleSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2"
                    >
                        Submit Dates (Total: ₹{totalPrice})
                    </Button>
                </Space>
            </div>
        </>
    );
}

export default Dateselect;
