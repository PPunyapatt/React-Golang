import ResponsiveAppBar from "../components/header"
import RecipeReviewCard from "../components/card"
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useAuth } from "../context/AuthProvider"

import {
    mypost,
    allpost
} from "../api/bind_api"

export default function AllBlog() {
    const auth = useAuth();

    const [data, setData] = useState([]);

    // const myPost = async () => {
    //     let rsp = await mypost(auth.id)
    //     const res = await rsp.json();
    //     setData(res)
    // }

    const allPost = async () => {
        let rsp = await allpost()
        const res = await rsp.json();
        setData(res)
        console.log('res: ', res);
        
    }

    useEffect(() => {
        allPost()
      }, []);
    return (
        <>
            <ResponsiveAppBar />
            <Container maxWidth="lg" sx={{ marginTop: 6 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {data.map((item, idx) => (
                        <Grid item xs={2} sm={1} md={4} key={idx}>
                            <RecipeReviewCard data={item}/>
                        </Grid>
                    ))}

                    {/* <Grid item xs={2} sm={1} md={4}>
                        <RecipeReviewCard />
                    </Grid>

                     <Grid item xs={2} sm={4} md={4}>
                        <RecipeReviewCard />
                    </Grid>

                    <Grid item xs={2} sm={4} md={4}>
                        <RecipeReviewCard />
                    </Grid>

                    <Grid item xs={2} sm={4} md={4}>
                        <RecipeReviewCard />
                    </Grid>

                    <Grid item xs={2} sm={4} md={4}>
                        <RecipeReviewCard />
                    </Grid>

                    <Grid item xs={2} sm={4} md={4}>
                        <RecipeReviewCard />
                    </Grid> */}
                </Grid>
            </Container>
        </>
    )
}