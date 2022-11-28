import axios from 'axios';
import { IBrewery } from './../models';

const getBreweries = async () => {
  return await axios.get<IBrewery[]>(
    `${process.env.REACT_APP_BASE_URL}/breweries`
  );
};

const getFavoredBreweriesFromAPI = async (
  favoredBreweries: IBrewery[]
): Promise<IBrewery[]> => {
  const breweries = await getBreweries();
  const favoredBreweriesFromAPI: IBrewery[] = [];

  favoredBreweries.forEach((brewery: IBrewery) => {
    const breweryFromAPI = breweries.data.find(
      (b: IBrewery) => b.id === brewery.id
    );
    !!breweryFromAPI && favoredBreweriesFromAPI.push(breweryFromAPI);
  });

  return favoredBreweriesFromAPI;
};

const breweryService = {
  getBreweries,
  getFavoredBreweriesFromAPI,
};

export default breweryService;
