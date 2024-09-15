import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ResponsiveAppBar from "../components/header"
import moment from 'moment';
import {
    getpost
} from "../api/bind_api"

interface PostContent {
    Title: string;
    Body: string;
    Username: string;
    Create_at: string;
}

function Content() {
    const [content, setContent] = useState<PostContent | null>(null);
    const location = useLocation();
    const getPost = async () => {
        let data = location.state
        let rsp = await getpost(data.id)
        const res = await rsp.json();
        setContent(res)
    }
    useEffect(() => {
        getPost()
        console.log("content: ", content);  
      }, []);
    return (
        <>
            <ResponsiveAppBar />
            <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', flexGrow: 0}}>
                {/* <p style={{fontSize: '2.8em', }}>{content?.Title}</p> */}
                <h1 style={{fontSize: '2.8em', marginBottom: '10px'}}>{content?.Title}</h1>
                <div>
                    <span>{content?.Username}</span>    
                </div>
                <div>
                    <span>Published in {moment(content?.Create_at).format('YYYY-MM-DD')}</span>
                </div>
                <hr />
                <p>{content?.Body}</p>
            </div>
        </>
    )
}

export default Content;