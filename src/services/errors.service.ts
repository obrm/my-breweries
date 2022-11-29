import { AxiosError } from 'axios';

const handleError = (error: AxiosError) => {
  console.error('Error: ', error);
  throw new Error(error.message);
};

const errorsService = {
  handleError,
};

export default errorsService;
