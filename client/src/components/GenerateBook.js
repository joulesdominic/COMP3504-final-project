import React, { useState } from 'react';
import { generateStory } from '../services/api';

function GenerateStory() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [topic, setTopic] = useState('');
    const [genre, setGenre] = useState('');
    const [story, setStory] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setStory(null);

        try{
            const generatedStory = await generateStory(name, age, topic, genre);
            setStory(generatedStory);
        } catch(err) {
            setError(err.message);
        }
    };

    return(
        <div className='max-w-4x1 mx-auto p-6 bg-gray-100 rounded-lg shadow-md'>
            <h1>Generate a Story</h1>
            <form onSubmit={handleSubmit} className='flex flex-col space-y-4 bg=white p-6 rounged-lg shadow-sm'>
                <lable>Enter Name:</lable>
                <input 
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className='w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none p-2'
                />
                <lable>Enter Age:</lable>
                <input 
                    type='text'
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    className='w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none p-2'
                />
                <lable>Enter Topic:</lable>
                <input 
                    type='text'
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    required
                    className='w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none p-2'
                />
                <lable>Enter Genre:</lable>
                <input 
                    type='text'
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    required
                    className='w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none p-2'
                />
                <button type='submit' className='px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors shadow-sm'>Generate Story</button>
            </form>

            {error && <p>{error}</p>}

            {story && (
                <ul>
                    <li>
                    <h2>{story.properties.title}</h2>
                        <p><strong>Name:</strong> {story.properties.child_name}</p>
                        <p><strong>Age:</strong> {story.properties.child_age}</p>
                        <p><strong>Genre:</strong> {story.properties.genre}</p>
                        <p><strong>Topic:</strong> {story.properties.topic}</p>
                        <p><strong>Story:</strong> {story.story.text}</p>
                    </li>
                </ul>
            )}
        </div>
    )
}

export default GenerateStory;