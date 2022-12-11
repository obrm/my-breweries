import { AxiosError } from 'axios';

// this should have beed used in axios.interceptors...
const handleError = (error: AxiosError) => {
  console.error('Error: ', error);
  // why throw new?
  throw new Error(error.message);
};

const errorsService = {
  handleError,
};

export default errorsService;
