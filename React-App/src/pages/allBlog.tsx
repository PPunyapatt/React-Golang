import ResponsiveAppBar from "../components/header"
import RecipeReviewCard from "../components/card"
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {
    allpost
} from "../api/bind_api"

interface Auth {
    username: string;
    id: number;
}

export default function AllBlog() {
    const [data, setData] = useState([]);
    const [dialog, setDialog] = useState(false);
    const storedAuth = localStorage.getItem('auth');
    const auth: Auth | null = storedAuth ? JSON.parse(storedAuth) : null;

    const allPost = async () => {
        try {
            let rsp = await allpost()
            const res = await rsp.json();
            setData(res)
        }
        catch (err) {
            console.log(err);  
        }    
    }

    const handleDelete = () => {
        setDialog(dialog ? false : true)
    }

    useEffect(() => {
        allPost()
      }, []);
    return (
        <>
            <ResponsiveAppBar />
            <Container maxWidth="lg" sx={{ marginTop: 6, padding: 4 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {data.map((item, idx) => (
                        <Grid item xs={2} sm={1} md={4} key={idx}>
                            <RecipeReviewCard data={item} auth={auth} onDelChange={handleDelete} page={'allBlog'}/>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    )
}