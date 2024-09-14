import ResponsiveAppBar from "../components/header"
import RecipeReviewCard from "../components/card"
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {
    mypost
} from "../api/bind_api"
// import { useAuth } from "../context/AuthProvider";

interface Auth {
    username: string;
    id: number;
}

export default function MyBlog() {
    const [data, setData] = useState([]);
    // const auth = useAuth()
    const storedAuth = localStorage.getItem('auth');
    const auth: Auth | null = storedAuth ? JSON.parse(storedAuth) : null;

    const myPost = async () => {
        if (auth) {
            let rsp = await mypost(auth.id);
            const res = await rsp.json();
            setData(res);
        } else {
            console.error('No valid authentication data found.');
        }    
    }

    useEffect(() => {
        myPost()
      }, []);
    return (
        <>
            <ResponsiveAppBar />
            
            <Container maxWidth="lg" sx={{ marginTop: 6, marginBottom: 4 }}>
                <h1 style={{marginBottom: '20px', marginTop: '10px'}}>{auth?.username}</h1>
                <hr style={{marginBottom: '30px'}} />
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {data.map((item, idx) => (
                        <Grid item xs={2} sm={1} md={4} key={idx}>
                            <RecipeReviewCard data={item}/>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    )
}