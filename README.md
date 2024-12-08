# StoryBook Customizer

## Overview
**StoryBook Customizer** is a web application designed to allow parents to create personalized storybooks for their children. Users can customize predefined stories with their child’s name, age, and preferred topics. Additionally, parents can view the booklist database, explore other storybooks, and search for specific books.

## Technologies
- Front-end (ReactJS)
- Back-end (Node.js)
- Database (Supabase)
- Tailwind (CSS)

## Installation
To run the application locally:
1. Clone the repository:  

   `git clone https://github.com/COMP3504-final-project`
   
3. Install client dependencies:

   `cd client`  
   `npm install`
4. Install server dependencies:

   `cd server`  
   `npm install`
    
6. Set up environment:  
   Copy the file called `.env-example` inside of the server directory.
   
   Paste the file inside the server directory, and rename it to `.env`

   Inside you will see:
   
   `#SUPA_KEY=<insert-key-here>`  
   `#GROQ_API_KEY=g<insert-key-here>`

   Make sure to uncomment the values. Then insert the appropriate keys after the `=` symbol.
   
8. Start the app:

   You will need to split the terminal one will be for the server, and the other will be for client.

   To start the server:
   `node server.js`

   To start the client:
   `npm start`  

## Example Endpoints:  
   http://localhost:3000/  
   http://localhost:3000/books/1  
   http://localhost:3000/books/search?child_name=Grayson  
   http://localhost:3000/books/search?title=The%20Magical%20Drummer  
   http://localhost:3000/books/search?genre=cooking  
