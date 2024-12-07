export const fetchBooks = async() => {
    try {
        const res = await fetch('/books');
        if (!res.ok) throw new Error('Failed to fetch books');
        return await res.json(); 
    } catch(error) {
        console.error('Error fetching books: ', error);
        throw error;
    }
};

export const searchBooks = async(searchParams) => {
    try {
        const queryString = new URLSearchParams(searchParams).toString();
        const res = await fetch(`/books/search?${queryString}`);
        if(!res.ok) throw new Error('Failed to search books');
        return await res.json();
    } catch(error) {
        console.error('Error searching book: ', error);
        throw error;
    }
};

export const searchBookById = async(id) => {
    try {
        const res = await fetch(`/books/${id}`);
        if(!res.ok) throw new Error('Failed to search books by ID');
        return await res.json();
    } catch(error) {
        console.error('Error search by ID: ', error);
        throw error;
    }
};

export const generateStory = async(name, age, topic, genre) => {
    try {
        const res = await fetch('/books', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, age, topic, genre}),
        });

        if(!res.ok) throw new Error('Failed to generate story');

        return await res.json();
    } catch(err) {
        console.error('Error generating story: ', err);
        throw err;
    }
};