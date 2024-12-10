import React, { useEffect, useState } from "react";
import { searchBooks, fetchBooks, searchBookById } from "../services/api.js";

import "../index.css";

function SearchBook() {
  const [searchParams, setSearchParams] = useState({
    id: "",
    child_name: "",
    child_age: "",
    title: "",
    genre: "",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [allBooksExist, setAllBooksExist] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks()
      .then((data) => {
        if (data.length === 0) {
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

    // Validate ID
    if (searchParams.id) {
      if (isNaN(searchParams.id)) {
        setError("Invalid book ID. Please enter a number.");
        return;
      }
      if (searchParams.id.length !== 13) {
        setError("Invalid book ID. Please enter a 13-digit ISBN.");
        return;
      }
    }

    // Validate name
    if (searchParams.child_name) {
      if (searchParams.child_name.length < 2) {
        setError("Invalid name. Please enter at least 2 characters.");
        return;
      }
      if (!/^[a-zA-Z\s]+$/.test(searchParams.child_name)) {
        setError("Invalid name. Please enter only letters and spaces.");
        return;
      }
    }

    // Validate age
    if (searchParams.child_age) {
      if (isNaN(searchParams.child_age)) {
        setError("Invalid age. Please enter a number.");
        return;
      }
      if (searchParams.child_age < 0 || searchParams.child_age > 18) {
        setError("Invalid age. Please enter a number between 0 and 18.");
        return;
      }
    }

    // Validate title
    if (searchParams.title) {
      if (searchParams.title.length < 2) {
        setError("Invalid title. Please enter at least 2 characters.");
        return;
      }
      if (!/^[a-zA-Z\s]+$/.test(searchParams.title)) {
        setError("Invalid title. Please enter only letters and spaces.");
        return;
      }
    }

    // Validate genre
    if (searchParams.genre) {
      if (searchParams.genre.length < 2) {
        setError("Invalid genre. Please enter at least 2 characters.");
        return;
      }
      if (!/^[a-zA-Z\s]+$/.test(searchParams.genre)) {
        setError("Invalid genre. Please enter only letters and spaces.");
        return;
      }
    }

    // If all inputs are valid, proceed with the search
    if (searchParams.id) {
      try {
        const result = await searchBookById(searchParams.id);
        setSearchResults([result]);
        setError(null);
      } catch (error) {
        setError(error);
        setSearchResults([]);
      }
      return;
    }

    const filteredParams = Object.fromEntries(
      Object.entries(searchParams).filter(
        ([key, value]) => key !== "id" && value.trim() !== ""
      )
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
    } catch (error) {
      setError(error);
      setSearchResults([]);
    }
  };

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setSearchParams({
      id: "",
      child_name: "",
      child_age: "",
      title: "",
      genre: "",
    });
    setSearchResults([]);
    setError(null);
  };

  return (
    <div className="max-w-4x1 mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1>Search Books</h1>
      <form
        className="flex flex-col space-y-4 bg=white p-6 rounged-lg shadow-sm"
        onSubmit={handleSearch}
      >
        <label>Search by ID:</label>
        <input
          type="text"
          id="id"
          name="id"
          placeholder="Enter book ID"
          value={searchParams.id}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none p-2"
        />

        <label>Enter name:</label>
        <input
          type="text"
          id="child_name"
          name="child_name"
          placeholder="Enter name"
          value={searchParams.child_name}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none p-2"
        />

        <label>Enter age:</label>
        <input
          type="text"
          id="child_age"
          name="child_age"
          placeholder="Enter age"
          value={searchParams.child_age}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none p-2"
        />

        <label>Enter title:</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter title"
          value={searchParams.title}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none p-2"
        />

        <lable>Enter genre:</lable>
        <input
          type="text"
          id="genre"
          name="genre"
          placeholder="Enter Genre"
          value={searchParams.genre}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none p-2"
        />
        <input
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
        />
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors shadow-sm"
        >
          Reset
        </button>
      </form>

      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {!allBooksExist && (
        <p>No books are currently available in the database.</p>
      )}
      {allBooksExist && searchResults.length > 0 && (
        <ul className="space-y-6 mt-6">
          {searchResults.map((book) => (
            <li key={book.id}>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {book.title}
              </h2>
              <p className="text-gray-600">
                <strong>Name:</strong> {book.child_name}
              </p>
              <p className="text-gray-600">
                <strong>Age:</strong> {book.child_age}
              </p>
              <p className="text-gray-600">
                <strong>Genre:</strong> {book.genre}
              </p>
              <p className="text-gray-600">
                <strong>Topic:</strong> {book.topic}
              </p>
              <p className="text-gray-600">
                <strong>Story:</strong> {book.story}
              </p>
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
