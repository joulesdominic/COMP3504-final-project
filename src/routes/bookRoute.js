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

    router.put('/books/copy', async(req, res) => {
        const { id, child_name, child_age, title, genre, topic, story} = req.body;

        try {
            const { data: originalRecord, error: fetchError } = await supabaseClient.from('books').select('*').eq('id', id).single();

            if (fetchError || !originalRecord) {
                return res.status(404).json({ error: 'Original record not found'});
            }

            const newRecord = {
                ...originalRecord,
                child_name: child_name || originalRecord.child_name,
                child_age: child_age || originalRecord.child_age,
                title: title || originalRecord.title,
                genre: genre || originalRecord.genre,
                topic: topic || originalRecord.topic,
                story: story || originalRecord.story,
                id: undefined,
            };

            const { data: insertedRecord, error: insertError } = await supabaseClient.from('books').insert([newRecord]);

            if(insertError) {
                throw insertError;
            }

            res.status(201).json({ message: 'Record duplicated and updated successfully', record: insertedRecord});
        } catch(e) {
            console.log('Error duplicating record: ', e);
            res.status(500).json({ error: 'An error occured while duplicating record'});
        }
    });

    router.put('/books/:id', async (req, res) => {
        const { id } = req.params;
        const { child_name, child_age, genre, topic, story } = req.body;
    
        try {
            const { data: existingRecord, error: fetchError } = await supabaseClient
                .from('books')
                .select('*')
                .eq('id', id)
                .single();
    
            if (fetchError || !existingRecord) {
                return res.status(404).json({ error: 'Book with the specified title not found.' });
            }
    
            // Prepare the updated record
            const updatedRecord = {
                ...existingRecord,
                child_name: child_name || existingRecord.child_name,
                child_age: child_age || existingRecord.child_age,
                genre: genre || existingRecord.genre,
                topic: topic || existingRecord.topic,
                story: story || existingRecord.story,
            };
    
            // Update the record in the database
            const { data: updatedData, error: updateError } = await supabaseClient
                .from('books')
                .update(updatedRecord)
                .eq('id', id);
    
            if (updateError) {
                throw updateError;
            }
    
            res.status(200).json({ message: 'Book updated successfully.', record: updatedRecord });
        } catch (e) {
            console.error('Error updating book:', e);
            res.status(500).json({ error: 'An error occurred while updating the book.' });
        }
    });
    
    return router;
}

export default booksRoute;