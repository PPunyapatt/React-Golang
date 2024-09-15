import * as React from 'react';
// import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';

interface RecipeData {
  Title: string;
  Body: string;
  Create_at: string;
  Username: string;
  Id: number;
}

interface AuthData {
  username: string;
  id: number;
}

interface RecipeReviewCardProps {
  data: RecipeData;
  auth: AuthData | null;
  onDelChange: (diag: boolean) => void;
}

const settings = ['Delete'];

export default function RecipeReviewCard({ data, auth, onDelChange }: RecipeReviewCardProps) {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = (setting: string | null) => () => {
    console.log("close: ", setting);
    if (setting === "Delete") {
      onDelChange(true)
    }
    setAnchorElUser(null);
  }

  const handleClick = () => {
    let content_data = { id: data.Id }
    navigate('/content', { state: content_data })
  }
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {data.Username[0]}
            </Avatar>
          }
          sx={{
            maxHeight: '40px',
          }}
          action={
            (auth?.username === data.Username) &&
            <Box>
              <IconButton
                aria-label="settings"
                sx={{
                  '&:focus': {
                    outline: 'none', // Remove default focus outline
                  },
                }}
                onClick={handleOpenUserMenu}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu(null)}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu(setting)}>
                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          }
          title={data.Title.length > 80 ? data.Title.slice(0, 50) + ". . ." : data.Title}
          subheader={moment(data.Create_at).format('YYYY-MM-DD')}
        />
        <CardActionArea onClick={handleClick}
          sx={{
            '&:focus': {
              outline: 'none', // Remove default focus outline
            },
          }}>

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
              {data.Body.length > 158 ? data.Body.slice(0, 190) + ' ...' : data.Body}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
