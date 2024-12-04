import express from 'express';

const booksRoute = (supabaseClient) => {
    const router = express.Router();

    router.get('/books', async (req, res) => {
        try {
            const records = await supabaseClient.from('books').select('*');

            res.status(200).send(records.data);
        } catch(e) {
            console.error('Error fetching records:', e);
            res.status(500).send({ error: 'An error occurred while fetching records.' });
        }
    });

    router.get('/books/search', async(req, res) => {
        const childName = req.query.child_name;
        const childAge = req.query.child_age;
        const title = req.query.title;
        const genre = req.query.genre;

        try {
            let query = supabaseClient.from('books').select('*');

            if(childName) {
                query = query.ilike('child_name', `%${childName}`);
            }
            
            if(childAge) {
                query = query.eq('child_age', childAge);
            }

            if(title) {
                query = query.eq('title', title);
            }

            if(genre) {
                query = query.eq('genre', genre);
            }

            const records = await query;

            if(records.error) throw records.error;

            res.status(200).send(records.data); 
        } catch(e) {
            console.error('Error fetching records:', e);
            res.status(500).send({ error: 'An error occurred while fetching records.' });
        }
    });

    router.get('/books/:id', async(req, res) => {
        const id = req.params.id;

        try {
            const records = await supabaseClient.from('books').select('*').eq('id', id);
            
            res.status(200).send(records.data);
        } catch(e) {
            console.error('Error fetching records:', e);
            res.status(500).send({ error: 'An error occurred while fetching records.' });
        }
    });
    
    return router;
}

export default booksRoute;