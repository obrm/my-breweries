import axios, { AxiosError } from 'axios';
import { IBrewery } from '../features/breweries/interfaces/Brewery.interfaces';
import { errorsService } from './';

const getBreweries = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/breweries`
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    errorsService.handleError(error);
  }
};

const getFavoredBreweriesFromAPI = async (favoredBreweries: string[]) => {
  try {
    const promises: Promise<{ data: IBrewery }>[] = [];

    favoredBreweries.forEach((id: string) => {
      promises.push(
        axios.get(`${process.env.REACT_APP_BASE_URL}/breweries/${id}`)
      );
    });

    const responses = await Promise.all(promises);

    const favoredBreweriesFromAPI = responses.map((res) => res.data);

    return favoredBreweriesFromAPI;
  } catch (err) {
    const error = err as AxiosError;
    errorsService.handleError(error);
  }
};

const breweryService = {
  getBreweries,
  getFavoredBreweriesFromAPI,
};

export default breweryService;
