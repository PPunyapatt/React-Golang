import ResponsiveAppBar from "../components/header"
import React, { useState } from 'react';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

import {
    createPost
} from "../api/bind_api"
import { useAuth } from "../context/AuthProvider";


const TitleInput = styled(TextField)({
    '& .MuiInputBase-input': {
        fontSize: '3rem',
        fontWeight: 'bold',
        border: 'none',
        outline: 'none',
        padding: '10px 0', 
        lineHeight: '1.2' 
    }
});

const StoryInput = styled(TextField)({
    '& .MuiInputBase-input': {
        fontSize: '1.5rem',
        border: 'none',
        outline: 'none',
        padding: '10px 0',
    },
});



function WriteBlog() {
    const auth = useAuth()
    const navigate = useNavigate();
    const [content, setContent] = useState({
        title: '',
        body: '',
    });

    const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent({
          ...content,
          [field]: e.target.value, // Update the respective field (title or body)
        });       
    };

    const handleSave = async () => {
        let rsp = await createPost(auth.id, content.title, content.body)
        console.log("rsp create post: ", rsp);
        
        // if (rsp.status == 200) {
        //     navigate('/myblog')
        // }
    }
    return (
        <>
            <ResponsiveAppBar/>
            <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', flexGrow: 0}}>
                <TitleInput
                    variant="standard"
                    placeholder="Title"
                    value={content.title}
                    onChange={handleInputChange('title')}
                    fullWidth
                    multiline
                    InputProps={{
                        disableUnderline: true,
                    }}
                />

                <StoryInput
                    variant="standard"
                    placeholder="Tell your story..."
                    value={content.body}
                    onChange={handleInputChange('body')}
                    fullWidth
                    multiline
                    InputProps={{
                    disableUnderline: true,
                    }}
                    // rows={10}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button 
                        variant="contained" 
                        color="success" 
                        sx={{ borderRadius: 4 } }
                        onClick={handleSave}>
                        Save
                    </Button>
                </Box>
            </div>
            
        </>
    )
}

export default WriteBlog;