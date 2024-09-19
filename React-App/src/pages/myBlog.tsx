import ResponsiveAppBar from "../components/header"
import RecipeReviewCard from "../components/card"
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid2 from '@mui/material/Grid2';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Fade from "@mui/material/Fade";
import {
    mypost,
    deletePost
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
    const [alertType, setAlertType] = useState(false);
    const [articleId, setArticleId] = useState(0);

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

    const handleDeletePost = async (id: number) => {
        let rsp = await deletePost(id)
        if (rsp.status == 200) {
            setAlertType(true)
            myPost() 
        } 
        else {
            setAlertType(false)
        }
        setShowAlert(true)
    }

    const handleDelete = (id: number) => {
        console.log("id: ", id);
        setArticleId(id)
        setDialog(dialog ? false : true)
    }

    const handleDialog = async (data: boolean) => {
        if (data) await handleDeletePost(articleId)
        setDialog(false)
    }

    useEffect(() => {
        myPost()
        if (showAlert) {
            console.log("useEffect alert");
            
            const timer = setTimeout(() => {
                setShowAlert(false); // Hide the alert after 3 seconds
            }, 2000); // Duration of the alert

            return () => clearTimeout(timer); // Cleanup the timer when the component unmounts or showAlert changes
        }
    }, [showAlert]);
    return (
        <>
            <ResponsiveAppBar />
            <Container maxWidth="lg" sx={{ marginTop: 6, marginBottom: 4 }}>
                <h1 style={{ marginBottom: '20px', marginTop: '10px' }}>{auth?.username}</h1>
                <hr style={{ marginBottom: '30px' }} />
                <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {data.map((item, idx) => (
                        <Grid2 columns={{ xs: 2, sm: 1, md: 4 }} key={idx} component="div">
                            <RecipeReviewCard data={item} auth={auth} onDelChange={handleDelete} />
                        </Grid2>
                    ))}
                </Grid2>
                
            </Container>
            <Fade
                in={showAlert}
                timeout={{ enter: 1000, exit: 1000 }}>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={true}>
                    <Alert 
                        severity = {alertType ? "success" : "error"} 
                        color = {alertType ? "success" : "error"} 
                        sx={{width: '350px'}}>
                        {alertType ? "Delete successfull" : "Delete failed"}
                    </Alert>
                </Snackbar>
            </Fade>
            <ResponsiveDialog open={dialog} confirmChange={handleDialog} />
        </>
    )
}