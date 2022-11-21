import { FC, useState } from 'react';
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AxiosError } from 'axios';

type ErrorAlertProps = {
  error: AxiosError;
};

const ErrorAlert: FC<ErrorAlertProps> = ({ error }) => {
  const [open, setOpen] = useState(true);

  return (
    <Collapse in={open}>
      <Alert
        severity='error'
        sx={{ width: '20%', position: 'absolute', right: 10 }}
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
        {`Error ${error?.code ? 'Something went wrong' : ''}`}
      </Alert>
    </Collapse>
  );
};

export default ErrorAlert;
