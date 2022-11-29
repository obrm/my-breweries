import Alert from '@mui/material/Alert';


interface Props {
  message: string;
  severity: "success" | "error" | "warning" | "info";
}

const AlertMessage: React.FC<Props> = ({ message, severity }) => {
  return (
    <Alert severity={severity}>{message}</Alert>
  );
};

export default AlertMessage;