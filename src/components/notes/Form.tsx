import React, { useState, useRef , ChangeEvent} from 'react';
import { styled } from '@mui/material/styles';
import { Box, TextField, Button } from "@mui/material";
// import { v4 as uuid } from 'uuid';
import { Note } from './Note';
import axios from 'axios';

interface FormProps {
    addNote: (newNote: Note) => void;
}

interface NewNote {
    title: string;
    content: string;
    background_color?: string; 
    image?: string; 
}


const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    margin: auto;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
    border-color: #e0e0e0;
    width: 600px;
    border-radius: 8px;
    min-height: 30px;
    padding: 10px 15px;
`;



const Form: React.FC<FormProps> = ({ addNote }) => {
    const [showTextField, setShowTextField] = useState(false);
    const [newNote, setNewNote] = useState<NewNote>({ title: '', content: '' });

    

    const containerRef = useRef<HTMLDivElement>(null); 

    const onTextAreaClick = () => {
        setShowTextField(true);
        if (containerRef.current) {
            containerRef.current.style.minHeight = '70px'; 
        }
    };

    const onTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewNote({
            ...newNote,
            [e.target.name]: e.target.value
        });
    }

    const handlePost = async () => {
        setShowTextField(false);
        console.log(addNote);

        if (newNote.title.trim() && newNote.content.trim()) {
            try {
                const response = await axios.post('http://localhost:8000/api/notes/', newNote);
                
                const createdNote = response.data;
                
                addNote(createdNote);
                
                setNewNote({ title: '', content: '',background_color: ''  });
                console.log("newNote",newNote)
            } catch (error) {
                console.error('Error creating note:', error);
            }
        } else {
            
            console.error('Title and content are required to create a note');
        }
    };

   

    return (
        <div>
            <Container ref={containerRef}>
                {showTextField &&
                <TextField 
                    placeholder="Title"
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    style={{ marginBottom: 10 }}
                    name='title'
                    value={newNote.title}
                    onChange={(e) => onTextChange(e)}
                />
                }
                <TextField
                    placeholder="Take a note..."
                    multiline
                    maxRows={Infinity}
                    variant="standard"
                    onClick={onTextAreaClick}
                    InputProps={{ disableUnderline: true }}
                    name='content'
                    value={newNote.content}
                    onChange={(e) => onTextChange(e)}
                />
                <Button variant="contained" onClick={handlePost}>Post</Button>
            </Container>
        </div>
    );
};

export default Form;
