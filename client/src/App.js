import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import SearchBook from './components/SearchBook';
import BookList from './components/BookList';

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/books">Book List</Link>
        <Link to="/books/search">Search Books</Link>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/books' element={<BookList />} />
        <Route path='/books/search' element={<SearchBook />} />
      </Routes>
    </div>
  )
}

export default App;