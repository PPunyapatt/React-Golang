import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { useAuth } from "../context/AuthProvider"

interface RecipeData {
  Title: string;
  Body: string;
  Create_at: string; // Change to Date if needed
}

interface RecipeReviewCardProps {
  data: RecipeData;
}

export default function RecipeReviewCard({ data }: RecipeReviewCardProps) {
  const navigate = useNavigate();
  const auth = useAuth();
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={() => {}}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {auth.username[0]}
              </Avatar>
            }
            title={data.Title}
            subheader={moment(data.Create_at).format("YYYY-MM-DD")}
          />
          <CardMedia
            component="img"
            height="194"
            image="https://random-image-pepebigotes.vercel.app/api/random-image"
            alt="Paella dish"
          />
          <CardContent
            sx={{
              maxWidth: '400px', // Set max width
              // maxHeight: '100px', // Set max height
              // minHeight: '100px', // Set max height
              overflow: 'auto',   // Add scrollbars if content exceeds max height
              height: '100px'
            }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              { data.Body.length > 158 ? data.Body.slice(0, 190) + ' ...' : data.Body }
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
