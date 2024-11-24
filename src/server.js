const dotenv = require('dotenv');

const express = require('express');
const supabase = require('@supabase/supabase-js');

dotenv.config();

const app = express();

const supaUrl ='https://itfamvdbuksankotplyv.supabase.co';
const supaKey = process.env.SUPA_KEY;

const supabaseClient = supabase.createClient(supaUrl, supaKey);

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

app.listen(3000, () => {
    console.log('Server started on port 3000');
});