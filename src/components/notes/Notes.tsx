import React  from 'react';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Note } from './Note';
import { useState, useEffect } from 'react';
import axios from 'axios';



import Form from './Form';
import Notee from './Notee';
import EmptyNotes from './EmptyNotes';



interface Props {
    notes: Note[];
    addNote: (newNote: Note) => void;
    deleteNote: (id: number) => void;
    pinned?: boolean;
    handleTogglePin?: (noteId: number) => Promise<void>;
}



const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));



const Notes: React.FC<Props> = ({ notes, addNote, deleteNote, pinned}) => {

    const [notes1, setNotes1] = useState<Note[]>([]);

    useEffect(() => {
        
        setNotes1(notes.sort((a, b) => (a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1)));
    }, [notes]);

    const handleTogglePin = async (noteId: number) => {
        try {
            const updatedNotes = notes1.map(note => {
                if (note.id === noteId) {
                    
                    const newPinnedState = !note.pinned;
                    return { ...note, pinned: newPinnedState };
                }
                return note;
            });
            
            const response = await axios.patch(`http://localhost:8000/api/notes/${noteId}/`, {
                pinned: updatedNotes.find(note => note.id === noteId)?.pinned
            });
            if (response.status === 200) {
                
                setNotes1(updatedNotes.sort((a, b) => (a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1)));
                console.log('Note pinned state updated successfully');
            }
        } catch (error) {
            console.error('Error updating note pinned state:', error);
        }
    };

    

    

    console.log("notesinNotes")
    console.log(notes)

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ p: 3, width: '100%' }}>
                <DrawerHeader />
                <Form addNote={addNote} />
                
                {
                notes1.length > 0 ? (
                <Grid container spacing={2} style={{marginTop: 16}}>
                {
                    notes1.map(note => (
                        <Grid key={note.id} item xs={12} sm={6} md={4} lg={3}>
                            <Notee key={note.id} {...note} deleteNote={deleteNote} handleTogglePin={handleTogglePin}/>
                        </Grid>
                    ))
                }
                </Grid>
               ) : ( <EmptyNotes  />
            )}

            </Box>
        </Box>
    );
};

export default Notes;
