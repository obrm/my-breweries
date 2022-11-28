import axios from 'axios';
import { IBrewery } from './../models';

const getBreweries = async () => {
  return await axios.get<IBrewery[]>(
    `${process.env.REACT_APP_BASE_URL}/breweries`
  );
};

const breweryService = {
  getBreweries,
};

export default breweryService;
