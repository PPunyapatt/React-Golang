import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface RecipeReviewCardProps {
  open: boolean;
  confirmChange: (diag: boolean) => void;
}

export default function ResponsiveDialog({open, confirmChange} : RecipeReviewCardProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = (data: boolean) => () => {
    confirmChange(data)
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure you want to delete?"}
        </DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={handleClose(false)}>
            Cancel
          </Button>
          <Button onClick={handleClose(true)} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
