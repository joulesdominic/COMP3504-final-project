import React, { useEffect, useState } from 'react';

function App() {
  const [backendData, setBackendData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/books')
      .then(response => {
        if(!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setBackendData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if(loading) {
    return <div>Loading...</div>;
  }

  if(error) {
    return <div>Error: {error.message}</div>;
  }

  return(
    <div>
      <h1>Books List</h1>
      {backendData.length > 0 ? (
        <ul>
          {backendData.map((book) => (
            <li key={book.id} style={{ marginBottom: '20px' }}>
              <h2>{book.title}</h2>
              <p><strong>Author:</strong> {book.child_name} (Age: {book.child_age})</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>Topic:</strong> {book.topic}</p>
              <p><strong>Story:</strong> {book.story}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books available.</p>
      )}
    </div>
  )
}

export default App