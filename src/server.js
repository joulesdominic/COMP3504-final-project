// const dotenv = require('dotenv');
// const express = require('express');
import dotenv from 'dotenv';
import express from 'express';
import supabase from '@supabase/supabase-js';
import bodyParser from 'body-parser';
// const supabase = require('@supabase/supabase-js');
// const bodyParser = require('body-parser');

// const generateStoryRoute = require('./routes/generateStory');
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

app.use('/generate-story', generateStory);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});