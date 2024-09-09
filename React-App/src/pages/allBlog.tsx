import ResponsiveAppBar from "../components/header"
import RecipeReviewCard from "../components/card"
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

export default function AllBlog() {
    return (
        <>  
            <ResponsiveAppBar />
            <Container maxWidth="lg" sx={{marginTop: 6}}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={2} sm={1} md={4}>
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
                </Grid>
                
            </Grid>
            </Container>

            
        </>
    )
}