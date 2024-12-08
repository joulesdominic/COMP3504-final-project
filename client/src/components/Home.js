import React from 'react';

import '../index.css';

function Home() {
    return (
        <div className="container mx-auto p-4 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-gray-900">Customized Story Books</h1>
          <p className="mt-4">Welcome to Customized Story Books!  A website with no limit to your childrens imagination!</p>
          <p>Generate a story based on your child's name, age, topic, and genre.</p>
          <img src="/parents.jpg" alt="Parents" width="300" height="200" className="mt-4" />
          <div className="author-section mt-4">
            <h2 className="text-lg font-bold text-gray-900">Created by:</h2>
            <ul className="list-none mt-2">
              <li>Ghoza Ghazali</li>
              <li>Dominic Ramos</li>
              <li>Shaira Aguilar</li>
            </ul>
          </div>
        </div>
    )
}

export default Home;