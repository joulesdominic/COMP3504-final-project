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
        <div>
            <h1>Generate a Story</h1>
            <form onSubmit={handleSubmit}>
                <lable>Enter Name:</lable>
                <input 
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <lable>Enter Age:</lable>
                <input 
                    type='text'
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                />
                <lable>Enter Topic:</lable>
                <input 
                    type='text'
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    required
                />
                <lable>Enter Genre:</lable>
                <input 
                    type='text'
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    required
                />
                <button type='submit'>Generate Story</button>
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