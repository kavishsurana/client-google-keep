import React from 'react';
import SwipeDrawer from './SwipeDrawer';
import Notes from './notes/Notes';
import { Box } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';

import {Note} from './notes/Note'





const Home = () => {

    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        
        const fetchNotes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/notes/');
                setNotes(response.data.map((note: Note) => ({
                    ...note,
                    background_color: note.background_color || '' ,
                    image: note.image || ''
                })));
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };

        fetchNotes(); 
    }, []); 


    const addNote = (newNote: Note) => {
        setNotes([...notes, newNote]);
    };

    const deleteNote = (id: string | number) => {
        const noteId = typeof id === 'string' ? parseInt(id, 10) : id;
        setNotes(notes.filter(note => note.id !== noteId));
    };
    

    return (
        <Box style={{ display: 'flex', width: '100%' }}>
            <SwipeDrawer />
            <Notes notes={notes}  addNote={addNote} deleteNote={deleteNote} />
        </Box>
    );
}

export default Home;
