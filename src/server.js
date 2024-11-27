import dotenv from 'dotenv';
import express from 'express';
import supabase from '@supabase/supabase-js';
import bodyParser from 'body-parser';

import generateStory from './routes/generateStory.js';
import booksRoute from './routes/bookRoute.js';

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

app.get('/', async(req, res) => {
  res.status(200).send("Application is running!");
})

app.use('/', booksRoute(supabaseClient));
app.use('/', generateStory(supabaseClient));

app.listen(3000, () => {
    console.log('Server started on port 3000');
});