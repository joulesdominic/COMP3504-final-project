const express = require('express');
const supabase = require('@supabase/supabase-js');

const app = express();

const supaUrl ='https://itfamvdbuksankotplyv.supabase.co';
const supaKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0ZmFtdmRidWtzYW5rb3RwbHl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0MzAyMzQsImV4cCI6MjA0ODAwNjIzNH0.rJSF00tMfRqIBdO687fH3DRDq_4bI0h6muArnUFOx5w';

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