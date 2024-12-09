import express from 'express';
import request from 'supertest';
import generateStory from '../routes/generateStory';
import { getGroqChatCompletion } from '../services/generate.js';

// Mock the supabase client
const mockSupabaseClient = {
   from: jest.fn().mockReturnThis(),
   insert: jest.fn().mockResolvedValue({ data: null, error: null }),
};

// Mock the getGroqChatCompletion function
jest.mock('../services/generate.js', () => ({
   getGroqChatCompletion: jest.fn().mockResolvedValue({
      choices: [{ message: { content: JSON.stringify({
         properties: { title: 'A New Adventure', child_name: 'Alex', child_age: 7, topic: 'Space', genre: 'Sci-Fi' },
         story: { text: 'Once upon a time, Alex went to space...' }
      }) } }],
   }),
}));

describe('POST /books', () => {
   let app;

   beforeAll(() => {
      app = express();
      app.use(express.json());
      app.use('/api', generateStory(mockSupabaseClient));
   });

   it('should return 400 if any required fields are missing', async () => {
      const response = await request(app)
         .post('/api/books')
         .send({ name: 'Alex', age: 7, topic: 'Space' }); // Missing 'genre'

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Name, age, topic, and genre are required.');
   });

   it('should return 200 and the generated story if request is valid', async () => {
      const response = await request(app)
         .post('/api/books')
         .send({ name: 'Alex', age: 7, topic: 'Space', genre: 'Sci-Fi' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('properties');
      expect(response.body.properties.title).toBe('A New Adventure');
   });

   it('should handle errors when inserting data into the database', async () => {
      mockSupabaseClient.insert.mockResolvedValueOnce({ data: null, error: new Error('Insertion failed') });

      const response = await request(app)
         .post('/api/books')
         .send({ name: 'Alex', age: 7, topic: 'Space', genre: 'Sci-Fi' });

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to insert data');
   });
});