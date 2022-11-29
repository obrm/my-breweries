import SeverityType from './types/Severity.type';

import Alert from '@mui/material/Alert';

interface Props {
  message: string;
  severity: SeverityType;
}

const AlertMessage: React.FC<Props> = ({ message, severity }) => {
  return (
    <Alert severity={severity}>{message}</Alert>
  );
};

export default AlertMessage;