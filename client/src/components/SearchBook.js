import React, { useEffect, useState } from 'react';
import { searchBooks, fetchBooks, searchBookById } from '../services/api.js';

function SearchBook() {
    const [searchParams, setSearchParams] = useState({
        id: '',
        child_name: '',
        child_age: '',
        title: '',
        genre: ''
    });
    const [searchResults, setSearchResults] = useState([]);
    const [allBooksExist, setAllBooksExist] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBooks()
            .then((data) => {
                if(data.length === 0) {
                    setAllBooksExist(false);
                } else {
                    setAllBooksExist(true);
                }
            })
            .catch((error) => {
                setError(error);
            });
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();

        if(searchParams.id) {
            try {
                const result = await searchBookById(searchParams.id);
                setSearchResults([result]);
                setError(null);
            } catch(error) {
                setError(error);
                setSearchResults([]);
            }
            return;
        }

        const filteredParams = Object.fromEntries(
            Object.entries(searchParams).filter(([key, value]) => key !== 'id' && value.trim() !== '')
        );

        if (Object.keys(filteredParams).length === 0) {
            setError("Please input at least one input in the search bar");
            setSearchResults([]);
            return;
        }

        try {
            const results = await searchBooks(filteredParams);
            setSearchResults(results);
            setError(null);
        } catch(error) {
            setError(error);
            setSearchResults([]);
        }
    };

    const handleChange = (e) => {
        setSearchParams({...searchParams, [e.target.name]: e.target.value});
    };

    const handleReset = () => {
        setSearchParams({
            id: '',
            child_name: '',
            child_age: '',
            title: '',
            genre: ''
        });
        setSearchResults([]);
        setError(null);
    };

    return (
        <div>
            <h1>Search Books</h1>
            <form onSubmit={handleSearch}>
                <label>Search by ID:</label>
                <input 
                    type='text'
                    id='id'
                    name='id'
                    placeholder='Enter book ID'
                    value={searchParams.id}
                    onChange={handleChange}
                />

                <label>Enter name:</label>
                <input 
                    type='text'
                    id='child_name'
                    name='child_name'
                    placeholder='Enter name'
                    value={searchParams.child_name}
                    onChange={handleChange}
                />

                <label>Enter age:</label>
                <input
                    type='text'
                    id='child_age'
                    name='child_age'
                    placeholder='Enter age'
                    value={searchParams.child_age}
                    onChange={handleChange}
                />

                <label>Enter title:</label>
                <input
                    type='text'
                    id='title'
                    name='title'
                    placeholder='Enter title'
                    value={searchParams.title}
                    onChange={handleChange}
                />

                <lable>Enter genre:</lable>
                <input
                    type='text'
                    id='genre'
                    name='genre'
                    placeholder='Enter Genre'
                    value={searchParams.genre}
                    onChange={handleChange}
                />
                <input type='submit'/>
                <button type='button' onClick={handleReset}>Reset</button>
            </form>

            {error && <div style={{ color: 'red' }}>Error: {error}</div>}
            {!allBooksExist && (
                <p>No books are currently available in the database.</p>
            )}
            {allBooksExist && searchResults.length > 0 && (
                <ul>
                    {searchResults.map((book) => (
                        <li key={book.id}>
                            <h2>{book.title}</h2>
                            <p><strong>Name:</strong> {book.child_name}</p>
                            <p><strong>Age:</strong> {book.child_age}</p>
                            <p><strong>Genre:</strong> {book.genre}</p>
                            <p><strong>Topic:</strong> {book.topic}</p>
                            <p><strong>Story:</strong> {book.story}</p>
                        </li>
                    ))}
                </ul>
            )}

            {allBooksExist && searchResults === 0 && (
                <p>Book does not exits. Try modifying the search criteria.</p>
            )}
        </div>
    );
}

export default SearchBook;