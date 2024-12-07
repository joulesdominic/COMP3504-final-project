import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import SearchBook from './components/SearchBook';
import BookList from './components/BookList';
import GenerateStory from './components/GenerateBook';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-500 p-4 shadow-md flex space-x-6 justify-center">
        <Link to="/" className="text-white font-medium hover:underline">Home</Link>
        <Link to="/books" className="text-white font-medium hover:underline">Book List</Link>
        <Link to="/books/search" className="text-white font-medium hover:underline">Search Books</Link>
        <Link to="/books/generate" className='text-white font-medium hover:underline'>Generate Story</Link>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/books' element={<BookList />} />
        <Route path='/books/search' element={<SearchBook />} />
        <Route path='/books/generate' element={<GenerateStory />} />
      </Routes>
    </div>
  )
}

export default App;