import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../services/api.js';

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
        <div>
            <h1>Books List</h1>
            {books.length > 0 ? (
                <ul>
                    {books.map((book) => (
                        <li key={book.id} style={{ marginBottom: '20px'}}>
                            <h2>{book.title}</h2>
                            <p><strong>Name:</strong> {book.child_name}</p>
                            <p><strong>Genre:</strong> {book.genre}</p>
                            <p><strong>Topic:</strong> {book.topic}</p>
                            <p><strong>Story:</strong> {book.story}</p>
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