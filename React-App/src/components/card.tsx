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
  const auth = useAuth();
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={() => {
          console.log("card click");

        }}>
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
          <CardContent>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {/* This impressive paella is a perfect party dish and a fun meal to cook
              together with your guests. Add 1 cup of frozen peas along with the mussels,
              if you like. */}
              { data.Body }
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
