import express from 'express';
import { getGroqChatCompletion } from '../services/generate.js';

const generateStory = (supabaseClient) => {
   const router = express.Router();

   router.post('/', async (req, res) => {
      const { name, age, topic, genre } = req.body;

      if (!name || !age || !topic) {  
       return res.status(400).json({ error: 'Name, age, topic, and genre are required.'});
      }

      const prompt = `Write a short children's story that includes ${name} as the protagonist, along with their age: ${age}, and based on the given topic: ${topic} and genre: ${genre}.`;
      try {
       const chatCompletion = await getGroqChatCompletion(prompt);
       

       const story = JSON.parse(chatCompletion.choices[0].message.content);
       const storyText = story.story.text;

       const { data, error } = await supabaseClient.from('books').insert({
          title: story.title,
          child_name: name,
          child_age: age,
          topic: topic,
          genre: genre,
          story: storyText
       });

       if (error) {
         console.error('Error inserting data:', error);
         res.status(500).json({ error: 'Failed to insert data' });
       } else {
         res.status(200).json(story);
       }
      } catch (e) {
       console.log(e);
      }
   });
   return router;
}

export default generateStory;