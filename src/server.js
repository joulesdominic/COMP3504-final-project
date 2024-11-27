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
app.get('/id/:id', async(req, res) => {
  let id = req.params.id;
  const query = supabaseClient.from('books').select('*').eq('id',id);
  const { data } = await query;
  res.status(200).send(JSON.stringify(data)).end();
})


// route for child name
app.get('/child_name/:name', async (req, res) => {
  let name = req.params.name;
  const query = supabaseClient.from('books').select('*').ilike('child_name', `%${name}%`);
  const { data } = await query;
  res.status(200).send(JSON.stringify(data)).end();
});

// route for title
app.get('/title/:title', async (req, res) => {
  let title = req.params.title;
  const query = supabaseClient.from('books').select('*').ilike('title', `%${title}%`);
  const { data } = await query;
  res.status(200).send(JSON.stringify(data)).end();
});

// route for genre
app.get('/genre/:genre', async (req, res) => {
  let genre = req.params.genre;
  const query = supabaseClient.from('books').select('*').ilike('genre', `%${genre}%`);
  const { data } = await query;
  res.status(200).send(JSON.stringify(data)).end();
});

// route for topic
app.get('/topic/:topic', async (req, res) => {
  let topic = req.params.topic;
  const query = supabaseClient.from('books').select('*').ilike('topic', `%${topic}%`);
  const { data } = await query;
  res.status(200).send(JSON.stringify(data)).end();
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});