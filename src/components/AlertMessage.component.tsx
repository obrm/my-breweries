import Alert from '@mui/material/Alert';
import { AlertColor } from '@mui/material/Alert/Alert';

interface Props {
  message: string;
  severity: AlertColor;
}

const AlertMessage: React.FC<Props> = ({ message, severity }) => {
  return (
    <Alert severity={severity}>{message}</Alert>
  );
};

export default AlertMessage;