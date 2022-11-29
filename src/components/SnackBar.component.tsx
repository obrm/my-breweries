import { useState, useEffect } from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

import { useAppSelector } from '../hooks/redux';

import { Alert } from './';

interface State extends SnackbarOrigin {
  open: boolean;
}

interface Props {
  message: string;
  severity: "success" | "error" | "warning" | "info";
}

const SnackBar: React.FC<Props> = ({ message, severity }) => {
  const { isError } = useAppSelector((state) => state.brewery);

  const [state, setState] = useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  useEffect(() => {
    if (isError) {
      setState({ ...state, open: true });
    }
  }, [isError, state]);


  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} anchorOrigin={{ vertical, horizontal }} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        This is a success message!
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;