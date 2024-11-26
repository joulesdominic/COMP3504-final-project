import dotenv from 'dotenv';
import express from 'express';
import supabase from '@supabase/supabase-js';
import bodyParser from 'body-parser';

import generateStory from './routes/generateStory.js';

dotenv.config();

const app = express();

const supaUrl ='https://itfamvdbuksankotplyv.supabase.co';
const supaKey = process.env.SUPA_KEY;

const supabaseClient = supabase.createClient(supaUrl, supaKey);

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.get('/', async (req, res) => {
    const { data, error } = await supabaseClient.from('books').select('*');
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    } else {
      res.json(data);
    }
  });

app.use('/generate-story', generateStory(supabaseClient));

// find by id
app.get('/id/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10); // Extract the ID from the URL and convert to integer
  try {
      const { data, error } = await supabaseClient
          .from('books')
          .select('*')
          .eq('id', id); // Perform an exact match on the `id` column

      if (error) throw error;
      if (data.length === 0) {
          res.status(404).json({ error: 'No story found for this ID' });
      } else {
          res.json(data[0]); // Return the matching story
      }
  } catch (error) {
      console.error('Error fetching story by ID:', error.message);
      res.status(500).json({ error: 'Failed to fetch story' });
  }
});

// route for child name
// ex. http://localhost:3000/child_name/Grayson
app.get('/child_name/:name', async (req, res) => {
  const childName = req.params.name; // Extract the child_name from the URL
  try {
      const { data, error } = await supabaseClient
          .from('books')
          .select('*')
          .ilike('child_name', `%${childName}%`); // Perform a case-insensitive search

      if (error) throw error;
      if (data.length === 0) {
          res.status(404).json({ error: 'No stories found for this child name' });
      } else {
          res.json(data); // Return the matching stories
      }
  } catch (error) {
      console.error('Error fetching stories by child_name:', error.message);
      res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

// route for title
// /title/:title
app.get('/title/:title', async (req, res) => {
  const title = req.params.title; // Extract the title from the URL
  try {
      const { data, error } = await supabaseClient
          .from('books')
          .select('*')
          .ilike('title', `%${title}%`); // Perform a case-insensitive search

      if (error) throw error;
      if (data.length === 0) {
          res.status(404).json({ error: 'No stories found for this title' });
      } else {
          res.json(data); // Return the matching stories
      }
  } catch (error) {
      console.error('Error fetching stories by title:', error.message);
      res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

// route for genre
// /genre/:genre
app.get('/genre/:genre', async (req, res) => {
  const genre = req.params.genre; // Extract the genre from the URL
  try {
      const { data, error } = await supabaseClient
          .from('books')
          .select('*')
          .ilike('genre', `%${genre}%`); // Perform a case-insensitive search

      if (error) throw error;
      if (data.length === 0) {
          res.status(404).json({ error: 'No stories found for this genre' });
      } else {
          res.json(data); // Return the matching stories
      }
  } catch (error) {
      console.error('Error fetching stories by genre:', error.message);
      res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

// route for topic
// /topic/:topic
app.get('/topic/:topic', async (req, res) => {
  const topic = req.params.topic; // Extract the topic from the URL
  try {
      const { data, error } = await supabaseClient
          .from('books')
          .select('*')
          .ilike('topic', `%${topic}%`); // Perform a case-insensitive search

      if (error) throw error;
      if (data.length === 0) {
          res.status(404).json({ error: 'No stories found for this topic' });
      } else {
          res.json(data); // Return the matching stories
      }
  } catch (error) {
      console.error('Error fetching stories by topic:', error.message);
      res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});