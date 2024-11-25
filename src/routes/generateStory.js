import express from 'express';
import { getGroqChatCompletion } from '../services/generate.js';

const router = express.Router();

router.post('/', async (req, res) => {
   const { name, age, topic, genre } = req.body;

   if (!name || !age || !topic) {
    return res.status(400).json({ error: 'Name, age, topic, and genre are required.'});
   }

   const prompt = `Write a short children's story that includes ${name} as the protagonist, along with their age: ${age}, and based on the given topic: ${topic} and genre: ${genre}.`;
   try {
    const chatCompletion = await getGroqChatCompletion(prompt);
    // const generated = ;

    // if (!generated) {
    //     return res.status(500).json({ error: 'Failed to generate story'});
    // }

    res.status(200).json(JSON.parse(chatCompletion.choices[0].message.content));
   } catch (e) {
    console.log(e);
   }
});

export default router;