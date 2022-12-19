import CloseIcon from '@mui/icons-material/Close';
import { Alert, IconButton, Snackbar } from '@mui/material';
import { useState } from 'react';

const SuccessAlert = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => setOpen(false);

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        severity='success'
        action={
          <IconButton
            aria-label='close'
            color='inherit'
            size='small'
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize='inherit' />
          </IconButton>
        }
      >
        {'Success!'}
      </Alert>
    </Snackbar>
  );
};

export default SuccessAlert;
