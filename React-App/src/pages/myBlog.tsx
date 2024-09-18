import ResponsiveAppBar from "../components/header"
import RecipeReviewCard from "../components/card"
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid2 from '@mui/material/Grid2';
import Alert from '@mui/material/Alert';
import Fade from "@mui/material/Fade";
import {
    mypost
} from "../api/bind_api"
import ResponsiveDialog from "../components/dialog"
// import { useAuth } from "../context/AuthProvider";

interface Auth {
    username: string;
    id: number;
}

export default function MyBlog() {
    const [data, setData] = useState([]);
    const [dialog, setDialog] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const storedAuth = localStorage.getItem('auth');
    const auth: Auth | null = storedAuth ? JSON.parse(storedAuth) : null;

    const myPost = async () => {
        if (auth) {
            let rsp = await mypost(auth.id);
            const res = await rsp.json();
            if (res != null) setData(res);
            
        } else {
            console.error('No valid authentication data found.');
        }    
    }

    const handleDelete = (del: boolean) => {
        setShowAlert(del)
        setDialog(dialog ? false : true)
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
                <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {data.map((item, idx) => (
                        <Grid2 columns={{ xs: 2, sm: 1, md: 4 }} key={idx} component="div">
                            <RecipeReviewCard data={item} auth={auth} onDelChange={handleDelete}/>
                            {/* <RecipeReviewCard data={item} auth={auth} /> */}
                        </Grid2>
                    ))}
                </Grid2>
            </Container>
            {
                dialog &&
                <ResponsiveDialog onDelChange={handleDelete}/>
            }
            <Fade 
                in={true}
                timeout = {{enter: 1000, exit: 1000}}>
                <Alert severity="error" sx={{ display: 'flex' }}>Delete failed</Alert>
            </Fade>
            
        </>
    )
}