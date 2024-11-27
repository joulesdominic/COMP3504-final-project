# StoryBook Customizer

## Overview
StoryBook Customizer is a web application designed to allow parents to create personalized storybooks for their children. Users can customize predefined stories with their child’s name, age, and preferred topics.

## Technologies
- JavaScript (React)

## Installation
To run the application locally:
1. Clone the repository:  
   `git clone https://github.com/COMP3504-final-project`
2. Install dependencies:  
   `npm install`  
   `npm install @supabase/supabase-js`
4. Set up environment:  
   Create a .env file in the root directory with the following:  
   `SUPA_KEY=<insert-key-here>`  
   `GROQ_API_KEY=g<insert-key-here>`  
5. Start the app:  
   `node src/server.js`  

   endpoints:  
   http://localhost:3000/  
   http://localhost:3000/id/1  
   http://localhost:3000/child_name/Grayson  
   http://localhost:3000/title/The%20Magical%20Drummer  
   http://localhost:3000/genre/cooking  
   http://localhost:3000/topic/superheroes
