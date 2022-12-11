import SeverityType from './types/Severity.type';

import Alert, { AlertColor } from '@mui/material/Alert';

interface Props {
  message: string;
  severity: AlertColor;
}

// this comp has no logic nor styling, just use mui Alert.
const AlertMessage: React.FC<Props> = ({ message, severity }) => {
  return (
    <Alert severity={severity}>{message}</Alert>
  );
};

export default AlertMessage;