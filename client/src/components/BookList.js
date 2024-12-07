import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../services/api.js';

import '../index.css';

function BookList() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBooks()
            .then(data => {
                setBooks(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if(loading) {
        return <div>Loading...</div>
    }

    if(error) {
        return <div>Error: {error.message}</div>
    }

    return(
        <div className='max-w-4x1 mx-auto p-6 bg-gray-100 rounded-lg shadow-md'>
            <h1>Books List</h1>
            {books.length > 0 ? (
                <ul className='space-y-6 mt-6'>
                    {books.map((book) => (
                        <li key={book.id} style={{ marginBottom: '20px'}} className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
                            <h2 className='text-x1 font-semibold text-gray-900 mb-2'>{book.title}</h2>
                            <p className="text-gray-600"><strong>Name:</strong> {book.child_name}</p>
                            <p className="text-gray-600"><strong>Genre:</strong> {book.genre}</p>
                            <p className="text-gray-600"><strong>Topic:</strong> {book.topic}</p>
                            <p className="text-gray-600"><strong>Story:</strong> {book.story}</p>
                        </li>
                    ))}
                </ul>
            ): (
                <p>No books available</p>
            )}
        </div>
    )
}

export default BookList;